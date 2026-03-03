// CompanyProtected.jsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../Api/cAzios";

const CompanyProtected = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // This will automatically send cookies
        const res = await api.get("/api/company/profile");
        setIsAuthenticated(res.data.success);
      } catch (err) {
        console.log("Not authenticated");
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/company/login" />;
};

export default CompanyProtected;