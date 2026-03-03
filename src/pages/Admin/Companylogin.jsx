import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../Api/cAzios";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    setLoading(true);

    console.log("📤 Sending login request:", email);

    const res = await api.post("/company/login", { email, password });

    console.log("✅ FULL RESPONSE:", res.data);

    const token = res?.data?.token;
    const company = res?.data?.company;

    console.log("TOKEN:", token);
    console.log("COMPANY:", company);

    if (!token || !company) {
      throw new Error("Invalid login response");
    }

    Cookies.set("token", token, { expires: 7 });
    Cookies.set("company", JSON.stringify(company), { expires: 7 });

    console.log("🍪 Cookies set successfully");

    navigate("/company/dashboard", { replace: true });

  } catch (err) {
    console.error("❌ Login error:", err);
    setError(err.response?.data?.message || err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white">Company Login</h2>
          <p className="text-sm text-gray-300 mt-1">
            Secure access for verified companies
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300 text-center">
            {error}
          </div>
        )}

        <label className="text-sm text-gray-300">Company Email</label>
        <input
          type="email"
          placeholder="company@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mt-1 mb-4 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        />

        <label className="text-sm text-gray-300">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mt-1 mb-6 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-3 text-sm text-gray-300">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <Link
          to="/company/apply"
          className="block text-center w-full py-2.5 rounded-lg border border-white/30 text-white hover:bg-white/10 transition"
        >
          Register Your Company
        </Link>
      </form>
    </div>
  );
};

export default CompanyLogin;