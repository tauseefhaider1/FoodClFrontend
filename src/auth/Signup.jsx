import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User, Camera, Briefcase, Code, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api/Auth.js";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profession: "",
    skills: [],
    bio: "",
    avatar: null,
  });

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        setError("Please upload an image file");
        return;
      }

      setFormData({ ...formData, avatar: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle adding skills
  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const validateForm = () => {
    if (formData.name.length < 2) {
      setError("Name must be at least 2 characters long");
      return false;
    }
    if (formData.name.length > 50) {
      setError("Name must be less than 50 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and one number");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("skills", JSON.stringify(formData.skills));
      
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const res = await api.post("/register", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        setSuccess("Verification email sent! Please check your inbox.");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          profession: "",
          skills: [],
          bio: "",
          avatar: null,
        });
        setAvatarPreview("");
        setSkillInput("");
        
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-indigo-900 via-black to-purple-900
                    px-4 py-8">
      <div className="w-full max-w-md p-8 rounded-2xl
                      bg-white/10 backdrop-blur-xl
                      border border-white/20
                      shadow-2xl text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm text-gray-300 mt-1">
            Join our platform securely
          </p>
        </div>

        {success && (
          <div className="mb-4 text-sm text-green-400
                          bg-green-500/10 border border-green-500/20
                          px-4 py-2 rounded-lg">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 text-sm text-red-400
                          bg-red-500/10 border border-red-500/20
                          px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 mb-2">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full rounded-full object-cover border-2 border-purple-500"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-purple-600/30 border-2 border-purple-500 flex items-center justify-center">
                  <User size={40} className="text-gray-300" />
                </div>
              )}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-700 transition"
              >
                <Camera size={16} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-400">
              Optional: Upload profile picture (max 5MB)
            </p>
          </div>

          {/* Name */}
          <div className="relative">
            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Full name *"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Profession - NEW */}
          <div className="relative">
            <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              type="text"
              placeholder="Profession (e.g., Web Developer)"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Skills - NEW */}
          <div className="space-y-2">
            <div className="relative">
              <Code size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add skills (e.g., React, Node.js)"
                className="w-full pl-10 pr-20 py-2.5 rounded-lg
                           bg-white/20 text-white placeholder-gray-300
                           outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="absolute right-2 top-1/2 -translate-y-1/2
                           bg-purple-600 text-white px-3 py-1 rounded-md
                           text-sm hover:bg-purple-700 transition"
              >
                Add
              </button>
            </div>

            {/* Skills Tags */}
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-purple-600/30 text-purple-200 px-3 py-1 rounded-full
                               text-sm flex items-center gap-1 border border-purple-500/50"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Bio - NEW */}
          <div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself (max 500 characters)"
              rows="3"
              maxLength="500"
              className="w-full px-4 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500
                         resize-none"
            />
            <p className="text-xs text-gray-400 text-right mt-1">
              {formData.bio.length}/500
            </p>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email address *"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password *"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-300 hover:text-white"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="text-xs text-gray-400 px-2">
            Password must contain at least 6 characters, one uppercase, one lowercase, and one number
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password *"
              className="w-full pl-10 pr-10 py-2.5 rounded-lg
                         bg-white/20 text-white placeholder-gray-300
                         outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-300 hover:text-white"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <input type="checkbox" required className="mt-1" />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="text-purple-400 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-purple-400 hover:underline">
                Privacy Policy
              </Link>
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold
                       bg-gradient-to-r from-indigo-500 to-purple-600
                       hover:opacity-90 transition
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/20" />
          <span className="px-3 text-xs text-gray-300">SECURE SIGNUP</span>
          <div className="flex-1 h-px bg-white/20" />
        </div>

        <p className="text-center text-sm text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline font-medium text-purple-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}