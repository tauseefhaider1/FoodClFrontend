import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true, // ✅ THIS IS REQUIRED
});

export default api;
