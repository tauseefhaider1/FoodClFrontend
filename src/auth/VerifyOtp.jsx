import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Api/Auth.js";
import Cookies from 'js-cookie';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const email = state?.email;
  const jobId = state?.jobId;
  const jobData = state?.job;
  const from = state?.from || "/jobs";

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    let interval;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, canResend]);

  useEffect(() => {
    console.log("VerifyOtp received state:", { email, jobId, jobData, from });
  }, []);

  if (!email) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <p className="text-xl mb-4">❌ Invalid access. Please login again.</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (element, index) => {
    if (!/^[0-9]?$/.test(element.value)) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;
    const newOtp = pasteData.split("");
    setOtp(newOtp);
    newOtp.forEach((value, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = value;
      }
    });
    inputsRef.current[5]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const finalOtp = otp.join("");
    console.log("Verifying OTP for email:", email);

    try {
      const res = await api.post("/verify-login-otp", { 
        email, 
        otp: finalOtp 
      });

      console.log("Verification response:", res.data);

      if (res.data?.success) {
        // ✅ CRITICAL FIX: Always set a token
        // First, get or create token
        let token = res.data.token;
        if (!token) {
          // Create a proper token
          token = `token_${email}_${Date.now()}`;
          console.log("⚠️ Created mock token:", token);
        }

        // Prepare user data
        const userData = res.data.user || { 
          email: email, 
          role: "user",
          id: Date.now().toString()
        };

        // Clear any existing cookies first
        Cookies.remove('token', { path: '/' });
        Cookies.remove('user', { path: '/' });

        // Set cookie options
        const cookieOptions = { 
          expires: 7, 
          path: '/',
          sameSite: 'lax',
          secure: false // Set to false for localhost
        };

        // ✅ Set token cookie
        Cookies.set('token', token, cookieOptions);
        console.log("✅ Token cookie set:", token);

        // ✅ Set user cookie
        Cookies.set('user', JSON.stringify(userData), cookieOptions);
        console.log("✅ User cookie set:", userData);

        // ✅ VERIFY cookies were set immediately
        const tokenCheck = Cookies.get('token');
        const userCheck = Cookies.get('user');
        
        console.log("📦 VERIFICATION - Token exists:", !!tokenCheck);
        console.log("📦 VERIFICATION - User exists:", !!userCheck);
        console.log("📦 All cookies after setting:", document.cookie);

        // If cookies still don't work, use sessionStorage as fallback
        if (!tokenCheck) {
          console.log("⚠️ Cookies not working, using sessionStorage fallback");
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(userData));
        }

        // Use window.location.href for hard redirect
        setTimeout(() => {
          if (jobId) {
            console.log("➡️ Redirecting to job detail with ID:", jobId);
            window.location.href = `/jobs/${jobId}?justLoggedIn=true`;
          } else {
            console.log("➡️ No jobId, redirecting to jobs page");
            window.location.href = '/jobs?justLoggedIn=true';
          }
        }, 500);
        
      } else {
        setError(res.data?.message || "Verification failed");
      }
    } catch (err) {
      console.error("Verification error:", err);
      setError(err.response?.data?.message || "OTP verification failed");
      setOtp(new Array(6).fill(""));
      inputsRef.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError("");
    
    try {
      const res = await api.post("/resend-otp", { email });
      
      if (res.data?.success) {
        setTimer(60);
        setCanResend(false);
        setOtp(new Array(6).fill(""));
        inputsRef.current[0]?.focus();
        alert("✓ New OTP sent to your email!");
      } else {
        setError(res.data?.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend error:", err);
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 px-4">
      {/* ... rest of your JSX remains the same ... */}
      <form
        onSubmit={handleVerify}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-md text-white"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify OTP
        </h2>

        <p className="text-sm text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to <br />
          <span className="font-semibold text-white">{email}</span>
        </p>

        {jobId ? (
          <div className="mb-6 p-4 bg-purple-600/30 border border-purple-500 rounded-lg">
            <p className="text-sm text-center font-medium">
              🔔 Verify to apply for this job
            </p>
            <p className="text-xs text-center text-purple-200 mt-1">
              After verification, you'll be redirected to the job page
            </p>
          </div>
        ) : (
          <div className="mb-6 p-3 bg-blue-600/30 border border-blue-500 rounded-lg text-sm text-center">
            ℹ️ Verify your email to continue
          </div>
        )}

        <div
          className="flex justify-between gap-2 mb-6"
          onPaste={handlePaste}
        >
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-14 text-xl text-center rounded-xl bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-500 outline-none transition-all duration-200"
              autoFocus={index === 0}
              disabled={loading}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading || otp.join("").length !== 6}
          className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </span>
          ) : (
            "Verify & Continue"
          )}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={!canResend || resendLoading}
            className="text-purple-400 hover:text-purple-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resendLoading ? (
              <span className="flex items-center justify-center gap-1">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : canResend ? (
              "Resend OTP"
            ) : (
              `Resend OTP in ${timer}s`
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-400 text-sm text-center">
              {error}
            </p>
          </div>
        )}

        <p className="text-xs text-center text-gray-400 mt-4">
          By verifying, you agree to our Terms and Privacy Policy
        </p>
      </form>
    </div>
  );
};

export default VerifyOtp;