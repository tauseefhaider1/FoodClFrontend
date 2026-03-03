import { useState } from "react";
import { Link } from "react-router-dom";

const CompanyProfileCard = ({ profile }) => {
  const [logoError, setLogoError] = useState(false);

  // Construct full logo URL - Check for both logo and avatar fields
  const getLogoUrl = () => {
    // Check for logo field first (what you save), then avatar as fallback
    const logoPath = profile.logo || profile.avatar;
    
    if (!logoPath || logoError) return null;
    
    // If it's already a full URL
    if (logoPath.startsWith('http')) {
      return logoPath;
    }
    
    // Make sure path starts with /
    const cleanPath = logoPath.startsWith('/') ? logoPath : `/${logoPath}`;
    
    return `http://localhost:3000${cleanPath}`;
  };

  const logoUrl = getLogoUrl();
  
  // Debug log to see what's in the profile
  console.log("🖼️ Profile logo fields:", {
    logo: profile.logo,
    avatar: profile.avatar,
    logoUrl: logoUrl
  });
  
  // Get initials from company name
  const getInitials = () => {
    if (!profile.companyName) return 'C';
    return profile.companyName.charAt(0).toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Get verification badge color - Check both verification fields
  const getVerificationColor = () => {
    if (profile.isVerified || profile.isEmailVerified) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-yellow-100 text-yellow-800';
  };

  // Format company size
  const formatCompanySize = (size) => {
    const sizes = {
      '1-10': '1-10 employees',
      '11-50': '11-50 employees',
      '51-200': '51-200 employees',
      '201-500': '201-500 employees',
      '501+': '500+ employees'
    };
    return sizes[size] || size || 'Not specified';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cover Photo - Company themed */}
      <div className="h-40 bg-gradient-to-r from-indigo-600 to-purple-700 relative">
        {/* Company name overlay on cover */}
        <div className="absolute bottom-4 left-6 text-white">
          <h1 className="text-2xl font-bold">{profile.companyName}</h1>
          <p className="text-indigo-100 text-sm">{profile.industry || 'Industry not specified'}</p>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="px-8 pb-8">
        {/* Logo */}
        <div className="flex justify-start -mt-16 mb-6">
          <div className="relative">
            <div className="w-28 h-28 rounded-xl border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
              {logoUrl && !logoError ? (
                <img
                  src={logoUrl}
                  alt={profile.companyName}
                  className="w-full h-full object-cover"
                  onError={() => {
                    console.error("❌ Failed to load logo:", logoUrl);
                    setLogoError(true);
                  }}
                  onLoad={() => console.log("✅ Logo loaded successfully:", logoUrl)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold">
                    {getInitials()}
                  </span>
                </div>
              )}
            </div>
            
            {/* Verification Badge */}
            <div className="absolute -bottom-2 -right-2">
              {(profile.isVerified || profile.isEmailVerified) ? (
                <span className="bg-green-500 text-white p-1.5 rounded-full text-xs shadow-lg" title="Verified Company">
                  ✓
                </span>
              ) : (
                <span className="bg-yellow-500 text-white p-1.5 rounded-full text-xs shadow-lg" title="Pending Verification">
                  ⏳
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Company Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Left Column - Basic Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">About Company</h2>
              <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                {profile.description || 'No description provided'}
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <a href={`mailto:${profile.email}`} className="text-gray-900 hover:text-indigo-600">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <a href={`tel:${profile.phone}`} className="text-gray-900 hover:text-indigo-600">
                    {profile.phone || 'Not provided'}
                  </a>
                </div>
              </div>

              {profile.website && (
                <div className="flex items-center space-x-3 sm:col-span-2">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" 
                       className="text-gray-900 hover:text-indigo-600">
                      {profile.website.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Address */}
            {profile.address && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">📍 Location</h3>
                <p className="text-gray-600">{profile.address}</p>
              </div>
            )}
          </div>

          {/* Right Column - Stats & Details */}
          <div className="space-y-4">
            {/* Company Details Card */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Company Details</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Industry</p>
                  <p className="font-medium">{profile.industry || 'Not specified'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium">{formatCompanySize(profile.companySize)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Verification Status</p>
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getVerificationColor()}`}>
                    {(profile.isVerified || profile.isEmailVerified) ? 'Verified Company' : 'Pending Verification'}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-indigo-50 p-3 rounded-lg text-center">
                <span className="block text-2xl font-bold text-indigo-600">
                  {profile.totalJobs || 0}
                </span>
                <span className="text-xs text-gray-600">Jobs Posted</span>
              </div>
              
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <span className="block text-2xl font-bold text-purple-600">
                  {profile.activeJobs || 0}
                </span>
                <span className="text-xs text-gray-600">Active Jobs</span>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg text-center col-span-2">
                <span className="block text-2xl font-bold text-green-600">
                  {profile.totalHires || 0}
                </span>
                <span className="text-xs text-gray-600">Total Hires</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="border-t border-gray-200 mt-6 pt-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Account Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Member since:</span>
              <span className="ml-2 font-medium text-gray-800">{formatDate(profile.createdAt)}</span>
            </div>
            <div>
              <span className="text-gray-500">Last updated:</span>
              <span className="ml-2 font-medium text-gray-800">{formatDate(profile.updatedAt)}</span>
            </div>
            <div>
              <span className="text-gray-500">Company ID:</span>
              <span className="ml-2 font-medium text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {profile._id?.slice(-8) || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Link 
            to="/company/profile/edit"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg transition duration-200 font-medium shadow-md hover:shadow-lg text-center"
          >
            Edit Company Profile
          </Link>
          <Link 
            to="/company/jobs/post"
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-lg transition duration-200 font-medium shadow-md hover:shadow-lg text-center"
          >
            Post New Job
          </Link>
        </div>

        <div className="flex gap-3 mt-3">
          <Link 
            to="/company/jobs"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition duration-200 font-medium text-center"
          >
            View All Jobs
          </Link>
          <Link 
            to="/company/applications"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition duration-200 font-medium text-center"
          >
            View Applications
          </Link>
        </div>

        {/* Debug Info - Development Only */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs font-bold text-gray-600 mb-2">Debug Info:</p>
            <pre className="text-xs overflow-auto max-h-40">
              {JSON.stringify({
                companyName: profile.companyName,
                email: profile.email,
                phone: profile.phone,
                website: profile.website,
                industry: profile.industry,
                companySize: profile.companySize,
                address: profile.address,
                description: profile.description,
                logo: profile.logo,
                avatar: profile.avatar,
                logoUrl: logoUrl,
                isVerified: profile.isVerified,
                isEmailVerified: profile.isEmailVerified,
                isActive: profile.isActive,
                totalJobs: profile.totalJobs,
                activeJobs: profile.activeJobs,
                totalHires: profile.totalHires,
                createdAt: profile.createdAt,
                updatedAt: profile.updatedAt,
                id: profile._id
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfileCard;