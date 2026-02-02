import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="w-full max-w-md rounded-2xl shadow-2xl backdrop-blur bg-white/90 p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Create Account</h1>
        <p className="text-gray-500 mt-2 text-center">Sign up to start your job journey</p>

        <form className="space-y-5 mt-6">
          {/* Name */}
          <div>
            <label>Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300"/>
            </div>
          </div>

          {/* Email */}
          <div>
            <label>Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300"/>
            </div>
          </div>

          {/* Password */}
          <div>
            <label>Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300"/>
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label>Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
              <input type={showConfirm ? "text" : "password"} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300"/>
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">Sign Up</button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
