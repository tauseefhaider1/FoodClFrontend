import { ArrowLeft, Bookmark, Building2, Globe, Mail, Phone, MapPin } from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../Api/cAzios";
import ApplyJobModal from "../components/ApplyJobmodel";
import Cookies from 'js-cookie';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Application state
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationError, setApplicationError] = useState("");
  const [applicationSuccess, setApplicationSuccess] = useState("");
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Debug: Log location state on mount
  useEffect(() => {
    console.log("📍 JobDetail - Location state:", location.state);
    console.log("📍 JobDetail - ID from params:", id);
    
    // Check URL for justLoggedIn parameter
    const urlParams = new URLSearchParams(window.location.search);
    const justLoggedIn = urlParams.get('justLoggedIn') === 'true';
    
    if (justLoggedIn) {
      console.log("🔍 Found justLoggedIn in URL params");
      
      // Clean up URL parameter
      const newUrl = window.location.pathname;
      window.history.replaceState(
        { ...location.state, justLoggedIn: true },
        document.title,
        newUrl
      );
      
      // Force a re-render with the updated state
      // The useEffect will run again with the new location state
    }
  }, [location.state, id]);

  // Check authentication from cookies and sessionStorage
  useEffect(() => {
    const checkAuth = () => {
      // Try to get token from cookies first, then sessionStorage
      let token = Cookies.get('token');
      let user = {};
      
      // Try user cookie
      const userCookie = Cookies.get('user');
      if (userCookie) {
        try {
          user = JSON.parse(userCookie);
        } catch (e) {
          console.error("Error parsing user cookie:", e);
        }
      }
      
      // If no token in cookies, try sessionStorage
      if (!token) {
        token = sessionStorage.getItem('token');
        const userSession = sessionStorage.getItem('user');
        if (userSession) {
          try {
            user = JSON.parse(userSession);
          } catch (e) {
            console.error("Error parsing user session:", e);
          }
        }
        console.log("📦 Using sessionStorage fallback");
      }
      
      console.log("🔐 Auth check - Token:", !!token, "Role:", user.role);
      console.log("📦 Raw cookie string:", document.cookie);
      console.log("🔑 Token from Cookies.get:", Cookies.get('token'));
      console.log("👤 User from Cookies.get:", userCookie);
      console.log("📦 Token source:", token ? (Cookies.get('token') ? 'cookie' : 'session') : 'none');
      
      setIsAuthenticated(!!token);
      setUserRole(user.role || "");
    };

    checkAuth();

    // Check again after a short delay
    const timeout = setTimeout(checkAuth, 500);
    
    // Also check when page gets focus
    const handleFocus = () => {
      checkAuth();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("📥 Fetching job with ID:", id);
        const res = await api.get(`/users/jobs/${id}`);
        console.log("📥 Job fetched:", res.data);
        setJob(res.data.job || res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load job details");
        console.error("Job fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // Auto-open modal after successful login
  useEffect(() => {
    // Check both location state AND if we just logged in via URL
    const justLoggedIn = location.state?.justLoggedIn || 
                        new URLSearchParams(window.location.search).get('justLoggedIn') === 'true';
    
    console.log("🔄 Checking auto-open conditions:", {
      justLoggedIn,
      isAuthenticated,
      hasJob: !!job,
      userRole
    });

    if (justLoggedIn && isAuthenticated && job) {
      console.log("✅ Conditions met, auto-opening modal");
      
      // Small delay to ensure everything is rendered
      setTimeout(() => {
        if (userRole === "company") {
          setApplicationError("Companies cannot apply for jobs");
          setTimeout(() => setApplicationError(""), 3000);
        } else {
          setShowApplyModal(true);
          setApplicationSuccess("Login successful! You can now apply for this job.");
          setTimeout(() => setApplicationSuccess(""), 5000);
        }
      }, 500);
      
      // Clear the URL parameter if it exists
      if (window.location.search.includes('justLoggedIn')) {
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, [location.state, isAuthenticated, job, userRole]);

  // Handle apply button click
  const handleApplyClick = () => {
    console.log("👆 Apply clicked - Auth:", isAuthenticated);
    
    if (!isAuthenticated) {
      // Save job data in sessionStorage as backup
      if (job) {
        sessionStorage.setItem('pendingJobId', id);
        sessionStorage.setItem('pendingJobData', JSON.stringify(job));
      }
      
      navigate("/login", { 
        state: { 
          from: `/jobs/${id}`,
          jobId: id,
          job: job,
          returnTo: 'apply'
        } 
      });
    } else if (userRole === "company") {
      setApplicationError("Companies cannot apply for jobs");
      setTimeout(() => setApplicationError(""), 3000);
    } else {
      setShowApplyModal(true);
    }
  };

  const handleApplySuccess = (application) => {
    console.log("✅ Application submitted:", application);
    setApplicationSuccess("Application submitted successfully!");
    setShowApplyModal(false);
    
    sessionStorage.removeItem('pendingJobId');
    sessionStorage.removeItem('pendingJobData');
    
    setTimeout(() => setApplicationSuccess(""), 5000);
  };

  const handleModalClose = () => {
    console.log("👋 Modal closed");
    setShowApplyModal(false);
  };

  // Loading state...
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="bg-white rounded-xl p-6">
              <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state...
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-red-600 font-medium mb-4">{error || "Job not found"}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 font-medium"
          >
            <ArrowLeft size={18} />
            Back to jobs
          </Link>
        </div>
      </div>
    );
  }

  const company = job.company || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* BACK LINK */}
      <div className="max-w-5xl mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
        >
          <ArrowLeft size={18} />
          Back to jobs
        </Link>
      </div>

      {/* Success Message */}
      {applicationSuccess && (
        <div className="max-w-5xl mx-auto mb-4">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{applicationSuccess}</span>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border overflow-hidden">
        {/* HEADER */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.jobTitle}
              </h1>

              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Building2 size={18} className="text-blue-600" />
                <span className="font-medium">{job.companyName || company.companyName || job.company}</span>
                <span className="text-gray-400">·</span>
                <MapPin size={16} className="text-blue-600" />
                <span>{job.location}</span>
              </div>

              <div className="flex flex-wrap gap-3 mt-3">
                {job.jobType && (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                    {job.jobType}
                  </span>
                )}
                {job.salary && (
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    💰 {job.salary}
                  </span>
                )}
                {job.experienceLevel && (
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                    📊 {job.experienceLevel}
                  </span>
                )}
              </div>
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Bookmark className="text-gray-400 hover:text-blue-600" size={24} />
            </button>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyClick}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {!isAuthenticated ? "Login to Apply" : "Apply Now"}
          </button>

          {applicationError && (
            <p className="mt-2 text-sm text-red-500">{applicationError}</p>
          )}
        </div>

        {/* BODY */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT CONTENT - Job Details */}
          <div className="md:col-span-2 space-y-8">
            {/* DESCRIPTION */}
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-800">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {job.description || "No description provided."}
              </p>
            </section>

            {/* RESPONSIBILITIES */}
            {job.responsibilities?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Responsibilities
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* REQUIREMENTS */}
            {job.requirements?.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  Requirements & Qualifications
                </h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {job.requirements.map((item, i) => (
                    <li key={i} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR - Company Info */}
          <div className="space-y-4">
            {/* Company Card */}
            <div className="border rounded-lg p-5 bg-gray-50 sticky top-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Building2 size={20} className="text-blue-600" />
                About {job.companyName || company.companyName || "Company"}
              </h3>

              {(job.logo || company.logo) && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={`http://localhost:3000${job.logo || company.logo}`}
                    alt={job.companyName || company.companyName}
                    className="w-24 h-24 object-cover rounded-lg border-2 border-white shadow-sm"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {job.companyInfo || company.description || "Company information not available."}
              </p>

              <div className="space-y-2 text-sm border-t pt-3">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Globe size={16} />
                    {company.website.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {company.email && (
                  <a
                    href={`mailto:${company.email}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Mail size={16} />
                    {company.email}
                  </a>
                )}
                {company.phone && (
                  <a
                    href={`tel:${company.phone}`}
                    className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                  >
                    <Phone size={16} />
                    {company.phone}
                  </a>
                )}
                {company.address && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    {company.address}
                  </div>
                )}
              </div>
            </div>

            {/* Job Meta Info */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-semibold mb-2">Job Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Posted:</span>
                  <span className="font-medium">
                    {new Date(job.createdAt || job.postedAt).toLocaleDateString()}
                  </span>
                </div>
                {job.expiresAt && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Expires:</span>
                    <span className="font-medium text-orange-600">
                      {new Date(job.expiresAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Applications:</span>
                  <span className="font-medium">{job.applications?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLY MODAL */}
      {showApplyModal && (
        <ApplyJobModal
          job={job}
          onClose={handleModalClose}
          onSuccess={handleApplySuccess}
        />
      )}
    </div>
  );
};

export default JobDetail;