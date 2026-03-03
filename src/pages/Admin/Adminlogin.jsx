import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid credentials");
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
          <h2 className="text-3xl font-bold">Admin Login</h2>
          <p className="text-sm text-gray-300 mt-1">
            Secure access to admin dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg
                       bg-white/20 text-white placeholder-gray-300
                       outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-lg
                       bg-white/20 text-white placeholder-gray-300
                       outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       hover:opacity-90 transition
                       disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-3 text-sm text-gray-300">ADMIN ONLY</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Back to site */}
        <Link
          to="/"
          className="block text-center text-sm text-gray-300 hover:underline"
        >
          ← Back to website
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;
