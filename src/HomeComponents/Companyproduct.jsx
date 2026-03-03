import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Briefcase, Building, MapPin, DollarSign, Clock,
  Edit, Trash2, Save, Plus, X, FileText, LogOut,
  CheckCircle, AlertCircle
} from "lucide-react";

const API_BASE = "http://localhost:3000";
const PUBLIC_API = `${API_BASE}/api/users/jobs`;
const COMPANY_API = `${API_BASE}/api/company/jobs`;

// Create axios instance with credentials
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true, // This sends cookies automatically
  headers: {
    'Content-Type': 'application/json'
  }
});

const Companyproduct = () => {
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [authError, setAuthError] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    salary: "",
    jobType: "Full Time",
    description: "",
    responsibilities: "",
    requirements: "",
    companyInfo: "",
  });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      // Try to fetch company profile to check auth
      const res = await api.get("/api/company/profile");
      if (res.data.success) {
        setAuthError(false);
        setCompanyName(res.data.company.companyName);
        fetchJobs();
      } else {
        setAuthError(true);
        setError("Please login as a company to manage jobs");
      }
    } catch (err) {
      console.log("Auth check failed:", err.response?.status);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
        setError("Please login as a company to manage jobs");
      } else {
        // Still try to fetch jobs (public)
        fetchJobs();
      }
    }
  };

  // Fetch Jobs (public - no auth needed)
  const fetchJobs = async () => {
    try {
      const res = await axios.get(PUBLIC_API);
      setJobs(res.data.data || res.data || []);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setError("Failed to fetch jobs");
    }
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear success message when user starts typing
    setSuccess("");
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await api.post("/api/company/logout");
      setAuthError(true);
      setCompanyName("");
      // Redirect to login page
      window.location.href = "/company/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Submit (Create / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (!formData.jobTitle || !formData.location || !formData.salary || !formData.description) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Prepare data - convert textareas to arrays
      const submitData = {
        jobTitle: formData.jobTitle,
        location: formData.location,
        salary: formData.salary,
        jobType: formData.jobType,
        description: formData.description,
        responsibilities: formData.responsibilities ? 
          formData.responsibilities.split('\n').filter(item => item.trim()) : [],
        requirements: formData.requirements ? 
          formData.requirements.split('\n').filter(item => item.trim()) : [],
        companyInfo: formData.companyInfo
      };

      console.log("📤 Submitting job data:", submitData);

      let response;
      if (editId) {
        response = await api.put(`/api/company/jobs/${editId}`, submitData);
        setSuccess("Job updated successfully!");
      } else {
        response = await api.post("/api/company/jobs", submitData);
        setSuccess("Job created successfully!");
      }

      console.log("✅ Response:", response.data);

      setEditId(null);
      resetForm();
      fetchJobs(); // Refresh the list
      
    } catch (err) {
      console.error("❌ Submit error:", err);
      console.error("Response data:", err.response?.data);
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || err.message || "Operation failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (job) => {
    setFormData({
      jobTitle: job.jobTitle || "",
      location: job.location || "",
      salary: job.salary || "",
      jobType: job.jobType || "Full Time",
      description: job.description || "",
      responsibilities: job.responsibilities?.join("\n") || "",
      requirements: job.requirements?.join("\n") || "",
      companyInfo: job.companyInfo || "",
    });
    setEditId(job._id);
    setSuccess("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await api.delete(`/api/company/jobs/${id}`);
      setSuccess("Job deleted successfully!");
      fetchJobs(); // Refresh the list
    } catch (err) {
      console.error("Delete error:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setAuthError(true);
        setError("Session expired. Please login again.");
      } else {
        setError(err.response?.data?.message || "Failed to delete job");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      jobTitle: "",
      location: "",
      salary: "",
      jobType: "Full Time",
      description: "",
      responsibilities: "",
      requirements: "",
      companyInfo: "",
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditId(null);
    resetForm();
    setSuccess("");
    setError("");
  };

  // If authentication error, show login message
  if (authError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 p-4 md:p-6">
        <div className="max-w-md mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 text-center">
          <Briefcase className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Authentication Required</h2>
          <p className="text-gray-300 mb-6">Please login as a company to manage jobs</p>
          <a 
            href="/company/login" 
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Go to Company Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Job Management</h1>
              <p className="text-gray-300">
                {companyName ? `Logged in as: ${companyName}` : "Create, edit, and manage job listings"}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {editId ? "Edit Job Listing" : "Create New Job"}
            </h2>
            {editId && (
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel Edit
              </button>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-6 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-lg">
              <CheckCircle size={18} />
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="jobTitle"
                  placeholder="Job Title *"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="location"
                  placeholder="Location *"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  name="salary"
                  placeholder="Salary *"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 text-white outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                >
                  <option value="Full Time" className="bg-gray-800">Full Time</option>
                  <option value="Part Time" className="bg-gray-800">Part Time</option>
                  <option value="Remote" className="bg-gray-800">Remote</option>
                  <option value="Internship" className="bg-gray-800">Internship</option>
                  <option value="Contract" className="bg-gray-800">Contract</option>
                </select>
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Job Description *</label>
                <textarea
                  name="description"
                  placeholder="Detailed job description..."
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Requirements</label>
                <textarea
                  name="requirements"
                  placeholder="Required qualifications and skills (one per line)"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">Enter each requirement on a new line</p>
              </div>
            </div>

            {/* Responsibilities and Company Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Responsibilities</label>
                <textarea
                  name="responsibilities"
                  placeholder="Key responsibilities (one per line)"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <p className="text-xs text-gray-400 mt-1">Enter each responsibility on a new line</p>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Company Info</label>
                <textarea
                  name="companyInfo"
                  placeholder="About the company..."
                  value={formData.companyInfo}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : editId ? (
                <>
                  <Save className="w-5 h-5" />
                  Update Job
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Create Job
                </>
              )}
            </button>
          </form>
        </div>

        {/* Jobs List */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Job Listings</h2>
            <div className="text-gray-300">
              <span className="text-white font-semibold">{jobs.length}</span> Jobs Posted
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No jobs posted yet</p>
              <p className="text-gray-500">Create your first job listing above</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Job Title</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Company</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Location</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Salary</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job._id} className="border-b border-white/10 hover:bg-white/5 transition">
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">{job.jobTitle}</div>
                        <div className="text-gray-400 text-sm truncate max-w-xs">{job.description}</div>
                      </td>
                      <td className="py-4 px-4 text-white">{job.companyName || job.company}</td>
                      <td className="py-4 px-4 text-gray-300">{job.location}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.jobType === 'Full Time' ? 'bg-green-500/20 text-green-400' :
                          job.jobType === 'Remote' ? 'bg-blue-500/20 text-blue-400' :
                          job.jobType === 'Part Time' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {job.jobType}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-white font-medium">{job.salary}</td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(job)}
                            className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/30 transition"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{jobs.length}</div>
            <div className="text-gray-400 text-sm">Total Jobs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {jobs.filter(j => j.jobType === 'Full Time').length}
            </div>
            <div className="text-gray-400 text-sm">Full Time</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {jobs.filter(j => j.jobType === 'Remote').length}
            </div>
            <div className="text-gray-400 text-sm">Remote</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companyproduct;