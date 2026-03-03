// components/ApplyJobModal.jsx - Fixed version with Cookies import
import React, { useState, useEffect } from "react";
import { X, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import api from "../Api/Azios";
import PropTypes from 'prop-types';
import Cookies from 'js-cookie'; // Add this import

const ApplyJobModal = ({ job, onClose, onSuccess }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [jobData, setJobData] = useState(null);

  // Fetch job details if only jobId is provided
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (job?._id && !job.jobTitle) {
        try {
          const response = await api.get(`/api/jobs/${job._id}`);
          setJobData(response.data);
        } catch (err) {
          console.error("Error fetching job details:", err);
          setError("Failed to load job details");
        }
      }
    };

    fetchJobDetails();
  }, [job]);

  // Use either the full job object or fetched jobData
  const displayJob = jobData || job;

  // If no job data is available, show loading or error
  if (!displayJob) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6">
          <p>Loading job details...</p>
        </div>
      </div>
    );
  }

  // Helper function to get company name safely
  const getCompanyName = () => {
    if (displayJob.companyName) return displayJob.companyName;
    if (displayJob.company) {
      // If company is an object, try to get its name
      if (typeof displayJob.company === 'object') {
        return displayJob.company.name || displayJob.company.companyName || "Company";
      }
      // If company is a string, return it
      return displayJob.company;
    }
    return "Company";
  };

  // Helper function to get location safely
  const getLocation = () => {
    if (displayJob.location) return displayJob.location;
    if (displayJob.jobLocation) return displayJob.jobLocation;
    return "Location not specified";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload PDF, DOC, DOCX, JPG, or PNG file");
        return;
      }
      
      setResume(file);
      setResumeName(file.name);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!resume) {
      setError("Please upload your resume");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("coverLetter", coverLetter);

    try {
      // ✅ FIXED: Get token from cookies OR sessionStorage
      let token = Cookies.get('token');
      
      // If no token in cookies, try sessionStorage
      if (!token) {
        token = sessionStorage.getItem('token');
        console.log("📦 Using sessionStorage token:", !!token);
      } else {
        console.log("🍪 Using cookie token");
      }

      if (!token) {
        setError("Authentication required. Please login again.");
        setLoading(false);
        return;
      }

      console.log("🚀 Submitting application with token:", token ? "Token exists" : "No token");
      
      const response = await api.post(`/jobs/${displayJob._id}/apply`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      console.log("✅ Application response:", response.data);
      setSuccess("Application submitted successfully!");
      setTimeout(() => {
        onSuccess?.(response.data.application);
        onClose();
      }, 2000);

    } catch (err) {
      console.error("Application error:", err);
      
      // Better error messages
      if (err.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError("You don't have permission to apply for this job.");
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || "You may have already applied for this job.");
      } else {
        setError(err.response?.data?.message || "Failed to submit application");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold">
              Apply for {displayJob.jobTitle || displayJob.title || "Position"}
            </h2>
            {/* FIXED: Safely render company name and location */}
            <p className="text-gray-600 mt-1">
              {getCompanyName()} • {getLocation()}
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Resume Upload */}
          <div>
            <label className="block font-medium mb-2">
              Resume/CV <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="resume"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              
              {resume ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <FileText className="w-8 h-8 flex-shrink-0" />
                  <div className="text-left min-w-0">
                    <p className="font-medium truncate">{resumeName}</p>
                    <p className="text-sm text-gray-500">
                      {(resume.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setResume(null);
                      setResumeName("");
                    }}
                    className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                    aria-label="Remove file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <label htmlFor="resume" className="cursor-pointer block">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-blue-600 font-medium">Click to upload</p>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </p>
                </label>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block font-medium mb-2">
              Cover Letter <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows="5"
              placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              maxLength="2000"
            />
            <div className="flex justify-end mt-1">
              <span className={`text-sm ${coverLetter.length > 1800 ? 'text-orange-500' : 'text-gray-500'}`}>
                {coverLetter.length}/2000 characters
              </span>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span>{success}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !resume}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add prop validation
ApplyJobModal.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    jobTitle: PropTypes.string,
    title: PropTypes.string,
    companyName: PropTypes.string,
    company: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        name: PropTypes.string,
        companyName: PropTypes.string
      })
    ]),
    location: PropTypes.string,
    jobLocation: PropTypes.string
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func
};

// Default props
ApplyJobModal.defaultProps = {
  onSuccess: null
};

export default ApplyJobModal;