import { useEffect, useState } from "react";
import api from "../Api/cAzios.js";
import CompanyProfileCard from "./CompanyProfilecrd";

const CompanyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        console.log("Making request to /profile");
        
        // Use the correct endpoint
        const { data } = await api.get("/profile");
        
        console.log("Company profile data received:", data);
        
        // Handle different response structures
        if (data.profile) {
          setProfile(data.profile);
        } else if (data.company) {
          setProfile(data.company);
        } else if (data.data) {
          setProfile(data.data);
        } else {
          setProfile(data);
        }
      } catch (err) {
        console.error("Company profile fetch error:", err);
        
        if (err.response) {
          console.error("Error status:", err.response.status);
          console.error("Error data:", err.response.data);
          
          if (err.response.status === 401) {
            setError("Session expired. Please login again.");
            // Redirect to login after 2 seconds
            setTimeout(() => {
              window.location.href = "/company/login";
            }, 2000);
          } else {
            setError(`Error: ${err.response.data?.message || "Failed to load company profile"}`);
          }
        } else if (err.request) {
          console.error("No response received");
          setError("Network error. Please check your connection.");
        } else {
          console.error("Request setup error:", err.message);
          setError("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading company profile...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center bg-red-50 p-8 rounded-lg max-w-md">
        <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button 
          onClick={() => window.location.href = "/company/login"}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Go to Company Login
        </button>
      </div>
    </div>
  );
  
  if (!profile) return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-gray-600">Company profile not found</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <CompanyProfileCard profile={profile} />
    </div>
  );
};

export default CompanyProfile;