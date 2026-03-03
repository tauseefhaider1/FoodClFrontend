// Api/cAzios.js
import axios from "axios";

// Base API for all requests
const api = axios.create({
  baseURL: "http://localhost:3000/api", // Remove '/company' from base
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token interceptor if needed
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;