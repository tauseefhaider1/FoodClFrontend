import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

// Create axios instance with credentials
const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

const CompanyOtpLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState("");

  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if email was passed from login page
  useEffect(() => {
    console.log("📍 OTP Page Mounted");
    console.log("📍 Location state:", location.state);
    
    if (location.state?.email) {
      console.log("✅ Email found in state:", location.state.email);
      setEmail(location.state.email);
      
      // Auto send OTP if we have email
      sendOtp();
    } else {
      // Try to get from session storage as fallback
      const tempToken = sessionStorage.getItem("tempCompanyToken");
      if (tempToken) {
        console.log("✅ Found token in sessionStorage");
        // You might need to decode token to get email
      } else {
        console.log("❌ No email found, redirecting to login");
        navigate("/company/login");
      }
    }
  }, [location.state, navigate]);

  // Timer for OTP expiry
  useEffect(() => {
    let timer;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const sendOtp = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setError("");
      
      console.log("📤 Sending OTP to:", email);
      
      const res = await api.post("/api/company/login-otp", { email });
      
      console.log("✅ OTP sent response:", res.data);
      
      if (res.data.success) {
        setTimeLeft(300); // 5 minutes
        setOtp(new Array(6).fill(""));
        // Focus first OTP input
        setTimeout(() => inputsRef.current[0]?.focus(), 100);
      }
    } catch (err) {
      console.error("❌ Send OTP error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    // Auto-submit when all digits are entered
    const otpString = newOtp.join("");
    if (otpString.length === 6) {
      setTimeout(() => verifyOtp(otpString), 100);
    }

    if (error) setError("");
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOtp = async (otpString = null) => {
    const finalOtp = otpString || otp.join("");
    
    if (finalOtp.length !== 6) return;

    try {
      setLoading(true);
      setError("");

      console.log("📤 Verifying OTP for:", email);
      console.log("📤 OTP:", finalOtp);

      const res = await api.post("/api/company/verify-otp", { 
        email, 
        otp: finalOtp 
      });

      console.log("✅ Verify OTP response:", res.data);

      if (res.data.success) {
        // Store token if sent in response
        if (res.data.token) {
          localStorage.setItem("companyToken", res.data.token);
          console.log("✅ Token stored in localStorage");
        }
        
        // Clear session storage
        sessionStorage.removeItem("tempCompanyToken");
        
        // Navigate to jobs dashboard
        console.log("🚀 Navigating to /company/jobs");
        navigate("/company/dashboard", { replace: true });
      }
    } catch (err) {
      console.error("❌ Verify OTP error:", err.response?.data);
      setError(err.response?.data?.message || "Invalid OTP");
      
      // Clear OTP on error
      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    if (timeLeft > 0) {
      setError(`Please wait ${timeLeft} seconds before resending`);
      return;
    }
    await sendOtp();
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white transition-all duration-300">

        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-sm text-red-300 text-center">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-300 mb-1">
              Enter the 6-digit code sent to
            </p>
            <p className="font-semibold text-white bg-white/10 py-2 px-4 rounded-lg inline-block">
              {email || "your email"}
            </p>
          </div>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={data}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleOtpChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-xl text-center rounded-xl bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200"
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Timer */}
          {timeLeft > 0 && (
            <p className="text-center text-sm text-gray-400">
              Code expires in {formatTime()}
            </p>
          )}

          {/* Verify Button */}
          <button
            onClick={() => verifyOtp()}
            disabled={loading || otp.join("").length !== 6}
            className="w-full py-3 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify & Login"}
          </button>

          {/* Resend Link */}
          <div className="text-center">
            <button
              onClick={resendOtp}
              disabled={loading || timeLeft > 0}
              className="text-sm text-gray-300 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {timeLeft > 0 
                ? `Resend OTP in ${formatTime()}` 
                : "Didn't receive code? Resend"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/company/login")}
              className="text-sm text-purple-400 hover:text-purple-300 transition"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOtpLogin;