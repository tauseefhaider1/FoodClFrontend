import { useEffect, useState } from "react";
import Productdesign from "./Productdesign";
import JobSearchBar from "./Searchnav";
import api from "../AZZios.js";
import { useAuth } from "../context/AuthContext.jsx";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const isCompany = user?.role === 'company';

  const fetchJobs = async (filters = {}) => {
    try {
      setLoading(true);
      setError("");

      let endpoint;
      let params = {};

      if (isCompany) {
        // Companies see ONLY their own jobs
        endpoint = '/api/company/jobs';
        console.log("🏢 Company user - fetching company jobs");
      } else {
        // Regular users see ALL jobs
        const hasSearchFilters = filters.title || filters.location;
        
        // ✅ FIXED: Correct endpoint URLs
        if (hasSearchFilters) {
          endpoint = '/api/jobs/search';  // Fixed: Added 'api/' prefix
          params = {
            title: filters.title || undefined,
            location: filters.location || undefined,
            page: filters.page || 1,
            limit: filters.limit || 10
          };
        } else {
          endpoint = '/api/users/jobs';  // Fixed: Use '/api/jobs' instead of '/jobs'
        }
        
        console.log("👤 Regular user - fetching all jobs from:", endpoint);
      }

      console.log("🔍 Fetching from:", endpoint, "with params:", params);

      // Add auth token only for company routes
      const config = {};
      if (isCompany) {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("Please login as a company to view your jobs");
          setLoading(false);
          return;
        }
        config.headers = {
          Authorization: `Bearer ${token}`
        };
      }

      const res = await api.get(endpoint, { params, ...config });

      // Handle different response structures
      let jobsData = [];
      if (isCompany) {
        jobsData = res.data.jobs || res.data || [];
        console.log(`📊 Found ${jobsData.length} jobs for your company`);
      } else {
        jobsData = res.data.data || res.data.jobs || res.data || [];
        console.log(`📊 Found ${jobsData.length} jobs from all companies`);
      }
      
      setJobs(jobsData);
      
    } catch (error) {
      console.error("❌ Error fetching jobs:", error);
      
      if (error.code === 'ERR_NETWORK') {
        setError("Network error - please check if the server is running");
      } else if (error.response?.status === 401) {
        setError("Please login to view jobs");
      } else if (error.response?.status === 403) {
        setError("You don't have permission to view these jobs");
      } else if (error.response?.status === 404) {
        setError("Jobs endpoint not found. Please check your API configuration.");
      } else {
        setError(error.response?.data?.message || "Failed to load jobs");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [isCompany]);

  const handleCreateJob = () => {
    window.location.href = '/company/jobs/create';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isCompany ? "My Company's Jobs" : "Latest Jobs"}
          </h1>
          
          {isCompany && (
            <button
              onClick={handleCreateJob}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Post New Job
            </button>
          )}
        </div>

        {!isCompany && (
          <JobSearchBar onSearch={fetchJobs} />
        )}

        {isCompany && jobs.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-700">
              Showing {jobs.length} job{jobs.length !== 1 ? 's' : ''} posted by your company
            </p>
          </div>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchJobs()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow">
                <p className="text-gray-500 text-lg">
                  {isCompany 
                    ? "You haven't posted any jobs yet" 
                    : "No jobs found"}
                </p>
                <p className="text-gray-400 mt-2">
                  {isCompany 
                    ? "Click the 'Post New Job' button to create your first job posting"
                    : "Try adjusting your search filters"}
                </p>
                
                {isCompany && (
                  <button
                    onClick={handleCreateJob}
                    className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Post Your First Job
                  </button>
                )}
              </div>
            ) : (
              jobs.map((job) => (
                <Productdesign 
                  key={job._id} 
                  job={job}
                  isCompanyView={isCompany}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;