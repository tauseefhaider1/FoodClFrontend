import { useState } from "react";

const UserProfileCard = ({ profile }) => {
  const [imageError, setImageError] = useState(false);

  // Construct full avatar URL
  const getAvatarUrl = () => {
    if (!profile.avatar || imageError) return null;
    
    // If it's already a full URL, return as is
    if (profile.avatar.startsWith('http')) {
      return profile.avatar;
    }
    
    // If it's a relative path, prepend the backend URL
    return `http://localhost:3000${profile.avatar}`;
  };

  const avatarUrl = getAvatarUrl();
  
  // Get initials from name
  const getInitials = () => {
    if (!profile.name) return 'U';
    return profile.name.charAt(0).toUpperCase();
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

  // Get role badge color
  const getRoleColor = () => {
    switch(profile.role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
      
      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="flex justify-center -mt-16 mb-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
              {avatarUrl && !imageError ? (
                <img
                  src={avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {getInitials()}
                  </span>
                </div>
              )}
            </div>
            
            {/* Online Status */}
            <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${
              profile.isActive ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.name || 'No name provided'}
          </h2>
          <p className="text-gray-600">{profile.email}</p>
          
          {/* Profession */}
          {profile.profession && (
            <p className="text-purple-600 font-medium mt-1">
              {profile.profession}
            </p>
          )}
          
          {/* Role Badge */}
          <div className="mt-2">
            <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getRoleColor()}`}>
              {profile.role || 'user'}
            </span>
          </div>
        </div>

        {/* Bio Section */}
        {profile.bio && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">About</h3>
            <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
              {profile.bio}
            </p>
          </div>
        )}

        {/* Skills Section */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <span className="block text-sm text-gray-500 mb-1">Verified</span>
            <span className="text-lg font-semibold">
              {profile.isVerified ? (
                <span className="text-green-600">✅ Yes</span>
              ) : (
                <span className="text-red-600">❌ No</span>
              )}
            </span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <span className="block text-sm text-gray-500 mb-1">Status</span>
            <span className="text-lg font-semibold">
              {profile.isActive ? (
                <span className="text-green-600">🟢 Active</span>
              ) : (
                <span className="text-red-600">🔴 Blocked</span>
              )}
            </span>
          </div>
        </div>

        {/* Account Details */}
        <div className="border-t border-gray-200 pt-4 mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Account Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-600">Member since:</span>
              <span className="font-medium text-gray-800">{formatDate(profile.createdAt)}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-gray-600">Last updated:</span>
              <span className="font-medium text-gray-800">{formatDate(profile.updatedAt)}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-600">User ID:</span>
              <span className="font-medium text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {profile._id?.slice(-8) || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg transition duration-200 font-medium shadow-md hover:shadow-lg">
            Edit Profile
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition duration-200 font-medium">
            Settings
          </button>
        </div>

        {/* Debug Info - Development Only */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs font-bold text-gray-600 mb-2">Debug Info:</p>
            <pre className="text-xs overflow-auto max-h-40">
              {JSON.stringify({
                name: profile.name,
                email: profile.email,
                role: profile.role,
                profession: profile.profession,
                skills: profile.skills,
                bio: profile.bio,
                avatar: profile.avatar,
                avatarUrl: avatarUrl,
                isVerified: profile.isVerified,
                isActive: profile.isActive,
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

export default UserProfileCard;