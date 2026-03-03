import { useEffect, useState } from "react";
import api from "../Api/Azios"; // Adjust the import path
import UserProfileCard from "./Userprofilecard";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Don't check document.cookie - it won't show HttpOnly cookies!
        // Just make the request and let the server handle auth
        
        console.log("Making request to /me");
        console.log("API baseURL:", api.defaults.baseURL);
        console.log("withCredentials:", api.defaults.withCredentials);
        
        const { data } = await api.get("/me");
        
        console.log("Profile data received:", data);
        setProfile(data.profile || data.user);
      } catch (err) {
        console.error("Profile fetch error:", err);
        
        // Log detailed error information
        if (err.response) {
          console.error("Error status:", err.response.status);
          console.error("Error data:", err.response.data);
          console.error("Error headers:", err.response.headers);
          
          if (err.response.status === 401) {
            setError("Session expired. Please login again.");
          } else {
            setError(`Error: ${err.response.data?.message || "Failed to load profile"}`);
          }
        } else if (err.request) {
          console.error("No response received:", err.request);
          setError("Network error. Please check your connection.");
        } else {
          console.error("Request setup error:", err.message);
          setError("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center bg-red-50 p-8 rounded-lg">
        <p className="text-red-600 font-semibold">{error}</p>
        <button 
          onClick={() => window.location.href = "/login"}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
  
  if (!profile) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600">Profile not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <UserProfileCard profile={profile} />
    </div>
  );
};

export default Profile;