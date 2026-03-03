import { ArrowRight, Bookmark, Building2, MapPin, DollarSign, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

const Productdesign = ({ job }) => {
  // If job is not provided, don't render
  if (!job) return null;

  // Safely get company name (could be string or populated object)
  const getCompanyName = () => {
    if (!job.company) return "Unknown Company";
    
    // If company is an object with companyName property (populated)
    if (typeof job.company === 'object' && job.company !== null) {
      return job.company.companyName || job.companyName || "Unknown Company";
    }
    
    // If company is a string
    return job.company || job.companyName || "Unknown Company";
  };

  // Safely get company logo if needed (for future use)
  const getCompanyLogo = () => {
    if (job.company && typeof job.company === 'object' && job.company.logo) {
      return job.company.logo;
    }
    return null;
  };

  // Format salary nicely
  const formatSalary = (salary) => {
    if (!salary) return "Not specified";
    return salary;
  };

  // Get job type color
  const getJobTypeColor = (type) => {
    const colors = {
      'Full Time': 'bg-green-100 text-green-700',
      'Part Time': 'bg-blue-100 text-blue-700',
      'Remote': 'bg-purple-100 text-purple-700',
      'Internship': 'bg-amber-100 text-amber-700',
      'Contract': 'bg-indigo-100 text-indigo-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      
      // Show relative time for recent posts
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch (error) {
      return "Recently";
    }
  };

  // Debug log to see job structure (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log("Job data:", {
      id: job._id,
      title: job.jobTitle,
      company: job.company,
      companyType: typeof job.company
    });
  }

  return (
    <Link to={`/jobs/${job._id}`} className="block">
      <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200 cursor-pointer group">
        
        <div className="flex">
          {/* Colored accent bar */}
          <div className="w-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-l-xl"></div>

          <div className="flex-1 p-5">

            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {job.jobTitle || "Untitled Position"}
                </h2>

                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <Building2 size={16} className="text-gray-400" />
                  {/* ✅ FIXED: Use getCompanyName() which handles both string and object */}
                  <span>{getCompanyName()}</span>
                  <span className="text-gray-300">·</span>
                  <MapPin size={16} className="text-gray-400" />
                  <span>{job.location || "Location not specified"}</span>
                </div>
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Bookmark clicked for job:", job._id);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <Bookmark className="text-gray-400 hover:text-blue-600 transition-colors" size={20} />
              </button>
            </div>

            {/* Job Details */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              {job.salary && (
                <div className="flex items-center gap-1 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  <DollarSign size={16} className="text-green-600" />
                  {formatSalary(job.salary)}
                </div>
              )}

              {job.jobType && (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getJobTypeColor(job.jobType)}`}>
                  {job.jobType}
                </span>
              )}

              {job.experienceLevel && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                  {job.experienceLevel}
                </span>
              )}

              {job.urgent && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 animate-pulse">
                  🔥 Urgently Hiring
                </span>
              )}
            </div>

            {/* Description Preview */}
            {job.description && (
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                {job.description}
              </p>
            )}

            {/* Bottom Section */}
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>Posted {formatDate(job.createdAt || job.postedAt)}</span>
                </div>
                
                {job.applications?.length > 0 && (
                  <span>{job.applications.length} applicants</span>
                )}
              </div>

              <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                View Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default Productdesign;