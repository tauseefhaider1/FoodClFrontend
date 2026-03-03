import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast'; // 👈 ADD THIS
import { SocketProvider } from "./context/SocketContext"; // 👈 ADD THIS
import Navbar from "./HomeComponents/Navbar";
import HomeSlider from "./HomeComponents/HomeSlider";
import LoginPage from './auth/Loginu';
import Signup from "./auth/Signup";
// import ForgotPassword from "./auth/ForgotPass";
import Works from "./HomeComponents/Work";
import AboutPage from "./HomeComponents/About";
import ContactPage from "./HomeComponents/Contact";
import VerifyEmail from "./auth/Verifyemail";
import VerifyOtp from "./auth/VerifyOtp";
import PdfUploader from "./components/Pdfuploader";
// import Signups from './Cauth/Signup'
// import Logins from './Cauth/Login'
// import Otps from './Cauth/Otp'
// import ResetPasswords from "./Cauth/ResetPassword";
import AdminLogin from "./pages/Admin/Adminlogin";
import AdminLayout from "./pages/Admin/Adminlayout";
import PendingCompanies from "./pages/Admin/PendingCompanies";
import AdminProtectedRoute from "./components/AdminProtectedLayout";
import CompanyApply from "./Cauth/CompanyApply";
// import SetPassword from "./pages/Admin/SetPassword";
import CompanyLogin from "./pages/Admin/Companylogin";
import CompanyProtected from "./pages/Admin/CompanyProtected";
import CompanyOtpLogin from "./pages/Admin/CompanyLoginotp";
import JobDetail from './HomeComponents/JobDet';
import Jobs from "./HomeComponents/Jobsd";
import Companyproduct from "./HomeComponents/Companyproduct";
import Profile from "./components/Userprofile";
import CompanyProfile from "./components/CompanyProfile";
import CompanyApplications from "./components/CompanyApplications";
import MyApplications from "./components/MyApplications";
import CompanyDashboard from "./components/CompanyDashboard";
// import ApplyJobModal from "./components/ApplyJobmodel"; // Don't import this as a route

const App = () => {
  return (
    <SocketProvider> {/* 👈 WRAP WITH SOCKET PROVIDER */}
      <Router>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              icon: '✅',
              style: {
                background: '#10b981',
              },
            },
            error: {
              duration: 4000,
              icon: '❌',
              style: {
                background: '#ef4444',
              },
            },
          }}
        /> {/* 👈 ADD TOASTER FOR NOTIFICATIONS */}
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeSlider />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/verify-login-otp" element={<VerifyOtp />} />
          <Route path="/company/apply" element={<CompanyApply />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/works" element={<Works />} />
          
          {/* ✅ Job Detail Routes */}
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/apply/:id" element={<JobDetail />} />
          <Route path="/job/:id" element={<JobDetail />} />

          {/* Company Routes */}
          <Route path="/company/jobs" element={<Companyproduct />} />
          <Route
            path="/company/login-otp"
            element={
              <CompanyProtected>
                <CompanyOtpLogin />
              </CompanyProtected>
            }
          />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route 
            path="/company/dashboard" 
            element={
              // <ProtectedRoute userType="company">
                <CompanyDashboard />
              // </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route path="/admins/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          />
          <Route path="/admin/dashboard" element={<PendingCompanies />} />

          {/* User Profile & Applications */}
          <Route path="/user-profile" element={<Profile />} />
          <Route path="/my-applications" element={<MyApplications />} />
          
          {/* Company Applications */}
          <Route path="/company/applications" element={<CompanyApplications />} />
          <Route path="/company/applications/:jobId" element={<CompanyApplications />} />
<Route path="/upload-pdf" element={<PdfUploader />} />
          {/* 404 Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;