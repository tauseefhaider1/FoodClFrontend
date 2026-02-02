import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

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

    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/verify-email?token=${token}`,
          { method: "GET" } // ✅ GET
        );

        const data = await res.json();

        if (res.ok) {
          setStatus("success");
          setTimeout(() => navigate("/login"), 3000); // redirect after 3s
        } else {
          setStatus("error");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  if (status === "verifying") return <p>Verifying your email...</p>;
  if (status === "success") return <h2>✅ Email verified successfully! Redirecting to login...</h2>;
  if (status === "invalid") return <h2>❌ Invalid verification link</h2>;
  if (status === "error") return <h2>❌ Verification failed</h2>;

  return null;
};

export default VerifyEmail;
