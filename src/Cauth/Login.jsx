// import React, { useState } from 'react'
// import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
// import { Link, useNavigate } from 'react-router-dom'
// import api from '../Api/Azios' // adjust path

// const Logins = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   })
//   const [loading, setLoading] = useState(false)

//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!formData.email || !formData.password) {
//       alert('Please fill in all fields')
//       return
//     }

//     try {
//       setLoading(true)

//       const res = await api.post('/login', {
//         email: formData.email,
//         password: formData.password,
//       })

//       alert(res.data.message || 'OTP sent to your email')

//       navigate('/verify-login-otp', {
//         state: {
//           email: formData.email,
//         },
//       })
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-[360px]"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//         {/* Email */}
//         <label className="block text-sm font-medium mb-1">
//           Company Email
//         </label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="company@email.com"
//           className="w-full px-3 py-2 mb-4 border rounded-md
//                      focus:ring-2 focus:ring-indigo-500"
//           required
//         />

//         {/* Password */}
//         <label className="block text-sm font-medium mb-1">
//           Password
//         </label>
//         <div className="relative">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter your password"
//             className="w-full px-3 py-2 border rounded-md
//                        focus:ring-2 focus:ring-indigo-500"
//             required
//           />
//           <span
//             className="absolute top-1/2 right-3 -translate-y-1/2
//                        cursor-pointer text-gray-500"
//             onClick={() => setShowPassword((p) => !p)}
//           >
//             {showPassword ? <FaRegEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {/* Forgot Password */}
//         <div className="text-right mt-2">
//           <Link
//             to="/admin/reset-password"
//             className="text-sm text-indigo-600 hover:underline"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         {/* Login Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full mt-5 bg-indigo-600 text-white py-2
//                      rounded-md font-semibold hover:bg-indigo-700
//                      disabled:opacity-50"
//         >
//           {loading ? 'Sending OTP...' : 'Login'}
//         </button>

//         {/* Register */}
//         <p className="text-center text-sm mt-4">
//           Not registered?{' '}
//           <Link
//             to="/admin/register"
//             className="text-indigo-600 font-medium hover:underline"
//           >
//             Create an account
//           </Link>
//         </p>
//       </form>
//     </div>
//   )
// }

// export default Logins
