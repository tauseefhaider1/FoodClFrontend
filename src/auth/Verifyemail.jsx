import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../Api/Auth.js";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    api
      .get(`/verify-email?token=${token}`)
      .then(() => {
        setStatus("success");

        // ✅ React Router navigation (THIS triggers page change)
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      })
      .catch(() => {
        setStatus(prev => (prev === "success" ? "success" : "error"));
      });
  }, [token, navigate]);

  if (status === "verifying") return <p>Verifying email...</p>;
  if (status === "success") return <p>✅ Email verified! Redirecting to login…</p>;
  if (status === "invalid") return <p>❌ Invalid verification link</p>;

  return <p>❌ Verification failed. Try registering again.</p>;
};

export default VerifyEmail;
