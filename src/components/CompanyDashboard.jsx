// pages/Company/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Api/Azios";
import {
  BriefcaseIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";
import Cookies from 'js-cookie'; // Add this import

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
    shortlisted: 0,
    rejected: 0,
    reviewed: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);
const fetchDashboardData = async () => {
  try {
    setLoading(true);
    setError("");

    const token = Cookies.get("token");

    if (!token) {
      setError("Please login to access dashboard");
      setTimeout(() => navigate("/company/login"), 1500);
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    // Company Profile
    try {
      const companyRes = await api.get("/me", config);
      setCompany(companyRes.data.user || companyRes.data);
    } catch (err) {
      console.log("Company profile not available");
    }

    // Jobs
    const jobsRes = await api.get("/jobs", config);

    const jobs = Array.isArray(jobsRes.data?.jobs)
      ? jobsRes.data.jobs
      : Array.isArray(jobsRes.data)
      ? jobsRes.data
      : [];

    // Applications
    const appsRes = await api.get("/company/applications", config);

    const applications = Array.isArray(appsRes.data?.applications)
      ? appsRes.data.applications
      : Array.isArray(appsRes.data)
      ? appsRes.data
      : [];

    console.log("📊 Dashboard Safe Data:", {
      jobsCount: jobs.length,
      appsCount: applications.length
    });

    const activeJobs = jobs.filter(j => j.status === "active" || !j.status).length;

    const newApps = applications.filter(app => {
      const appDate = new Date(app.appliedAt || app.createdAt);
      return (Date.now() - appDate) / (1000 * 60 * 60 * 24) <= 7;
    }).length;

    setStats({
      totalJobs: jobs.length,
      activeJobs,
      totalApplications: applications.length,
      newApplications: newApps,
      shortlisted: applications.filter(a => a.status === "shortlisted").length,
      rejected: applications.filter(a => a.status === "rejected").length,
      reviewed: applications.filter(a => a.status === "reviewed").length
    });

    setRecentApplications(applications.slice(0, 5));
    setRecentJobs(jobs.slice(0, 5));

  } catch (err) {
    console.error("Dashboard Error:", err);
    setError(err.response?.data?.message || "Failed to load dashboard");
  } finally {
    setLoading(false);
  }
};

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
      reviewed: { color: 'bg-blue-100 text-blue-800', icon: EyeIcon },
      shortlisted: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      rejected: { color: 'bg-red-100 text-red-800', icon: XCircleIcon },
      hired: { color: 'bg-purple-100 text-purple-800', icon: CheckCircleIcon }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-1" />
        {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">
            {error}
          </div>
          <button
            onClick={() => navigate("/company/login")}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {company?.companyName || company?.name || 'Company'}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here's what's happening with your job postings today.
              </p>
            </div>
            <button
              onClick={() => navigate("/company/job")}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <BriefcaseIcon className="w-5 h-5" />
              Post New Job
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Jobs */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalJobs}</p>
                <p className="text-xs text-green-600 mt-1">
                  {stats.activeJobs} active
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <BriefcaseIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Applications */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalApplications}</p>
                <p className="text-xs text-green-600 mt-1">
                  +{stats.newApplications} this week
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* In Review */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Review</p>
                <p className="text-2xl font-bold text-gray-900">{stats.reviewed}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {((stats.reviewed / stats.totalApplications) * 100 || 0).toFixed(1)}% of total
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Shortlisted */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Shortlisted</p>
                <p className="text-2xl font-bold text-gray-900">{stats.shortlisted}</p>
                <p className="text-xs text-green-600 mt-1">
                  {((stats.shortlisted / stats.totalApplications) * 100 || 0).toFixed(1)}% of total
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Applications */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
                <button
                  onClick={() => navigate("/company/applications")}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>
            </div>
            <div className="p-6">
              {recentApplications.length > 0 ? (
                <div className="space-y-4">
                  {recentApplications.map((app) => (
                    <div key={app._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <UserGroupIcon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{app.user?.name || app.user?.email || 'Anonymous'}</p>
                          <p className="text-sm text-gray-600">{app.job?.jobTitle || 'Unknown Job'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(app.status)}
                        <button
                          onClick={() => navigate(`/company/applications/${app.job?._id}?applicant=${app._id}`)}
                          className="text-gray-400 hover:text-gray-600"
                          title="View Application"
                        >
                          <EyeIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No applications yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Applications will appear here when candidates apply
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Jobs */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Your Recent Jobs</h2>
                <button
                  onClick={() => navigate("/company/manage-jobs")}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Manage Jobs
                </button>
              </div>
            </div>
            <div className="p-6">
              {recentJobs.length > 0 ? (
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job._id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{job.jobTitle}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status || 'Active'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <DocumentTextIcon className="w-4 h-4" />
                          {job.applicationCount || 0} applications
                        </span>
                        <span className="flex items-center gap-1">
                          <ClockIcon className="w-4 h-4" />
                          Posted {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BriefcaseIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No jobs posted yet</p>
                  <button
                    onClick={() => navigate("/company/post-job")}
                    className="mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Post Your First Job →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/company/post-job")}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-center"
            >
              <BriefcaseIcon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Post a Job</span>
            </button>
            
            <button
              onClick={() => navigate("/company/applications")}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-center"
            >
              <DocumentTextIcon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Review Applications</span>
            </button>
            
            <button
              onClick={() => navigate("/company/manage-jobs")}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-center"
            >
              <ChartBarIcon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Manage Jobs</span>
            </button>
            
            <button
              onClick={() => navigate("/company/profile")}
              className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-center"
            >
              <UserGroupIcon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">Company Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;