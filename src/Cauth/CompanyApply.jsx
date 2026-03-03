import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../Api/cAzios";

const CompanyApply = () => {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    email: "",
    password: "", // ✅ ADDED - Missing password field
    phone: "",
    website: "",
    industry: "",
    companySize: "",
    address: "",
    logo: null, // ✅ CHANGED from 'avatar' to 'logo' to match backend
  });

  const [logoPreview, setLogoPreview] = useState(null); // ✅ Renamed from avatarPreview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({}); // ✅ Added for validation errors

  const handleLogoChange = (e) => { // ✅ Renamed from handleAvatarChange
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image should be less than 5 MB");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file");
        return;
      }
      
      // Clear any previous errors
      setError("");
      setFieldErrors({});
      
      // Update form state with the file - using 'logo' not 'avatar'
      setForm({ ...form, logo: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear field error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    // Validate required fields
    const requiredFields = ['companyName', 'email', 'password', 'phone', 'industry', 'companySize', 'address', 'description'];
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    
    // Log what we're sending (for debugging)
    console.log("📤 Submitting form data:");
    
    Object.keys(form).forEach(key => {
      if (form[key] !== null && form[key] !== "") {
        // Use the same key names as backend expects
        formData.append(key, form[key]);
        console.log(`   ${key}:`, key === 'password' ? '[HIDDEN]' : 
                    key === 'logo' ? form[key].name : form[key]);
      }
    });

    try {
      // Using api instance which should have baseURL configured
      const res = await api.post("/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert(res.data.message);
      
      // Reset form on success
      setForm({
        companyName: "",
        description: "",
        email: "",
        password: "",
        phone: "",
        website: "",
        industry: "",
        companySize: "",
        address: "",
        logo: null,
      });
      setLogoPreview(null);
      
      // Reset file input
      const fileInput = document.getElementById('logo-input');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      console.error("❌ Submission error:", err.response?.data);
      
      // Handle validation errors from backend
      if (err.response?.data?.errors) {
        const errors = {};
        err.response.data.errors.forEach(error => {
          errors[error.field] = error.message;
        });
        setFieldErrors(errors);
      } else {
        alert(err.response?.data?.message || "Failed to apply");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-indigo-900 via-black to-purple-900
                    px-4 py-8">

      {/* Glass Card */}
      <div className="w-full max-w-2xl p-8 rounded-2xl
                      bg-white/10 backdrop-blur-xl
                      border border-white/20
                      shadow-2xl text-white">

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">
            Company Application
          </h2>
          <p className="text-sm text-gray-300 mt-1">
            Get approved to post jobs & hire talent
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Company Logo Upload - Fixed field name to 'logo' */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Company Logo
            </label>
            <div className="flex items-center space-x-4">
              {logoPreview && (
                <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/30">
                  <img src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <input
                id="logo-input" // ✅ Changed from avatar-input
                name="logo" // ✅ Added name="logo" - CRITICAL!
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="w-full px-4 py-2.5 rounded-lg
                         bg-white/20 text-white 
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-500 file:text-white
                         hover:file:bg-indigo-600
                         outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            {fieldErrors.logo && <p className="text-sm text-red-400">{fieldErrors.logo}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                name="companyName"
                placeholder="Company Name *"
                value={form.companyName}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500
                           ${fieldErrors.companyName ? 'ring-2 ring-red-500' : ''}`}
              />
              {fieldErrors.companyName && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.companyName}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Company Email *"
                value={form.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500
                           ${fieldErrors.email ? 'ring-2 ring-red-500' : ''}`}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                name="password" // ✅ Added password field
                type="password"
                placeholder="Password *"
                value={form.password}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500
                           ${fieldErrors.password ? 'ring-2 ring-red-500' : ''}`}
              />
              {fieldErrors.password && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.password}</p>
              )}
            </div>

            <div>
              <input
                name="phone"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500
                           ${fieldErrors.phone ? 'ring-2 ring-red-500' : ''}`}
              />
              {fieldErrors.phone && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                name="website"
                placeholder="Website URL"
                value={form.website}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <select
                name="industry"
                value={form.industry}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white
                           outline-none focus:ring-2 focus:ring-indigo-500
                           [&>option]:bg-gray-800
                           ${fieldErrors.industry ? 'ring-2 ring-red-500' : ''}`}
              >
                <option value="" className="bg-gray-800">Select Industry *</option>
                <option value="technology" className="bg-gray-800">Technology</option>
                <option value="healthcare" className="bg-gray-800">Healthcare</option>
                <option value="finance" className="bg-gray-800">Finance</option>
                <option value="education" className="bg-gray-800">Education</option>
                <option value="retail" className="bg-gray-800">Retail</option>
                <option value="other" className="bg-gray-800">Other</option>
              </select>
              {fieldErrors.industry && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.industry}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select
                name="companySize"
                value={form.companySize}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white
                           outline-none focus:ring-2 focus:ring-indigo-500
                           [&>option]:bg-gray-800
                           ${fieldErrors.companySize ? 'ring-2 ring-red-500' : ''}`}
              >
                <option value="" className="bg-gray-800">Company Size *</option>
                <option value="1-10" className="bg-gray-800">1-10 employees</option>
                <option value="11-50" className="bg-gray-800">11-50 employees</option>
                <option value="51-200" className="bg-gray-800">51-200 employees</option>
                <option value="201-500" className="bg-gray-800">201-500 employees</option>
                <option value="501+" className="bg-gray-800">500+ employees</option>
              </select>
              {fieldErrors.companySize && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.companySize}</p>
              )}
            </div>

            <div>
              <input
                name="address"
                placeholder="Company Address *"
                value={form.address}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500
                           ${fieldErrors.address ? 'ring-2 ring-red-500' : ''}`}
              />
              {fieldErrors.address && (
                <p className="text-sm text-red-400 mt-1">{fieldErrors.address}</p>
              )}
            </div>
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Company Description * (minimum 50 characters)"
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              className={`w-full px-4 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500
                         resize-none
                         ${fieldErrors.description ? 'ring-2 ring-red-500' : ''}`}
            />
            {fieldErrors.description && (
              <p className="text-sm text-red-400 mt-1">{fieldErrors.description}</p>
            )}
          </div>

          {/* Apply Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       hover:opacity-90 transition
                       disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Apply for Approval"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-3 text-sm text-gray-300">OR</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        {/* Login */}
        <Link
          to="/company/login"
          className="block text-center w-full py-2.5 rounded-lg
                     border border-white/30
                     hover:bg-white/10 transition"
        >
          Already Approved? Login
        </Link>
      </div>
    </div>
  );
};

export default CompanyApply;