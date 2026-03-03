// import React, { useState } from 'react'
// import { FaEye, FaEyeSlash } from 'react-icons/fa'

// const ResetPasswords = () => {
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   const [form, setForm] = useState({
//     password: '',
//     confirmPassword: '',
//   })

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//     setError('')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const { password, confirmPassword } = form

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters')
//       return
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }

//     try {
//       setLoading(true)
//       setError('')

//       console.log('New password:', password)
//       // 👉 CALL RESET PASSWORD API (token + password)

//       setSuccess('Password reset successfully 🎉')
//     } catch (err) {
//       setError('Something went wrong. Try again.')
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
//         <h2 className="text-2xl font-bold text-center mb-2">
//           Reset Password
//         </h2>
//         <p className="text-sm text-gray-500 text-center mb-6">
//           Enter your new password below
//         </p>

//         {/* New Password */}
//         <label className="block text-sm font-medium mb-1">
//           New Password
//         </label>
//         <div className="relative mb-4">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Enter new password"
//             className="w-full px-3 py-2 border rounded-md
//                        focus:ring-2 focus:ring-indigo-500 outline-none"
//           />
//           <span
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute top-1/2 right-3 -translate-y-1/2
//                        cursor-pointer text-gray-500"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {/* Confirm Password */}
//         <label className="block text-sm font-medium mb-1">
//           Confirm Password
//         </label>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           name="confirmPassword"
//           value={form.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirm password"
//           className="w-full px-3 py-2 border rounded-md
//                      focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
//         />

//         {/* Error */}
//         {error && (
//           <p className="text-sm text-red-500 text-center mb-3">
//             {error}
//           </p>
//         )}

//         {/* Success */}
//         {success && (
//           <p className="text-sm text-green-600 text-center mb-3">
//             {success}
//           </p>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 rounded-md font-semibold text-white
//             transition ${
//               loading
//                 ? 'bg-indigo-400 cursor-not-allowed'
//                 : 'bg-indigo-600 hover:bg-indigo-700'
//             }`}
//         >
//           {loading ? 'Updating...' : 'Reset Password'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default ResetPasswords
