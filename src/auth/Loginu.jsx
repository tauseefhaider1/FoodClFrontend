import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../Api/Auth.js";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get job data from navigation state
  const from = location.state?.from || "/dashboard";
  const jobId = location.state?.jobId;
  const jobData = location.state?.job;
  const returnTo = location.state?.returnTo || "dashboard";

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // In LoginPage.jsx - make sure handleSubmit is passing all data
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Please fill in all fields");
    return;
  }

  try {
    setLoading(true);
    const res = await api.post("/login", formData);

    if (res.data?.success) {
      // Pass ALL job data to OTP verification page
      navigate("/verify-login-otp", {
        state: { 
          email: formData.email,
          from: from,
          jobId: jobId,     // Make sure this is being passed
          job: jobData,      // Make sure this is being passed
          returnTo: returnTo
        },
      });
    }
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-indigo-900 via-black to-purple-900
                    px-4">

      {/* Glass Card */}
      <div className="w-full max-w-md p-8 rounded-2xl
                      bg-white/10 backdrop-blur-xl
                      border border-white/20
                      shadow-2xl text-white">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">User Login</h1>
          <p className="text-sm text-gray-300 mt-1">
            {jobId ? "Login to apply for this job" : "Secure access to your account"}
          </p>
          {jobId && jobData && (
            <p className="text-xs text-purple-300 mt-2 bg-purple-500/20 p-2 rounded-lg">
              Applying for: {jobData.jobTitle || "Position"}
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 text-sm text-red-400
                          bg-red-500/10 border border-red-500/20
                          px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
            />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-gray-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <Link to="/forgot-password" className="hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       hover:opacity-90 transition
                       disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-3 text-xs text-gray-300">SECURE LOGIN</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}