// In ../Api/Azios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/users", // Make sure this matches your backend
  withCredentials: true, // ✅ CRITICAL for sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log("withCredentials:", config.withCredentials);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status}`, response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;