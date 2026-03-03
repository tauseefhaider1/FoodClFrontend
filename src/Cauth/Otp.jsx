// import React, { useEffect, useRef, useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import axios from 'axios'

// const OTP_LENGTH = 6
// const RESEND_TIME = 60

// const Otps = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const email = location.state?.email // passed from signup/login

//   const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
//   const [timeLeft, setTimeLeft] = useState(RESEND_TIME)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const ref = useRef([])

//   // ---------------- AUTO FOCUS FIRST INPUT ----------------
//   useEffect(() => {
//     ref.current[0]?.focus()
//   }, [])

//   // ---------------- TIMER ----------------
//   useEffect(() => {
//     if (timeLeft === 0) return

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1)
//     }, 1000)

//     return () => clearInterval(timer)
//   }, [timeLeft])

//   // ---------------- INPUT CHANGE ----------------
//   const handleChange = (index, value) => {
//     if (!/^\d?$/.test(value)) return

//     const newOtp = [...otp]
//     newOtp[index] = value
//     setOtp(newOtp)
//     setError('')

//     if (value && index < OTP_LENGTH - 1) {
//       ref.current[index + 1].focus()
//     }
//   }

//   // ---------------- BACKSPACE ----------------
//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       ref.current[index - 1].focus()
//     }
//   }

//   // ---------------- PASTE ----------------
//   const handlePaste = (index, e) => {
//     e.preventDefault()

//     const pasted = e.clipboardData
//       .getData('text')
//       .replace(/\D/g, '')
//       .slice(0, OTP_LENGTH)

//     if (!pasted) return

//     const newOtp = [...otp]
//     pasted.split('').forEach((digit, i) => {
//       if (index + i < OTP_LENGTH) {
//         newOtp[index + i] = digit
//       }
//     })

//     setOtp(newOtp)
//     ref.current[Math.min(index + pasted.length, OTP_LENGTH - 1)].focus()
//   }

//   // ---------------- SUBMIT ----------------
//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     const finalOtp = otp.join('')
//     if (finalOtp.length !== OTP_LENGTH) {
//       setError('Please enter complete OTP')
//       return
//     }

//     try {
//       setLoading(true)
//       setError('')

//       const res = await axios.post(
//         'http://localhost:3000/api/users/verify-login-otp',
//         { email, otp: finalOtp },
//         { withCredentials: true }
//       )

//       navigate(res.data.redirectTo || '/dashboard', { replace: true })

//     } catch (err) {
//       setError(err.response?.data?.message || 'OTP verification failed')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ---------------- RESEND ----------------
//   const handleResend = async () => {
//     try {
//       setOtp(Array(OTP_LENGTH).fill(''))
//       setTimeLeft(RESEND_TIME)
//       setError('')
//       ref.current[0].focus()

//       await axios.post(
//         'http://localhost:3000/api/users/resend-otp',
//         { email }
//       )

//     } catch {
//       setError('Failed to resend OTP')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-xl shadow-lg w-[360px]"
//       >
//         <h2 className="text-2xl font-bold text-center mb-2">
//           Verify your email
//         </h2>

//         <div className="flex gap-3 justify-center mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               ref={(el) => (ref.current[index] = el)}
//               value={digit}
//               onChange={(e) => handleChange(index, e.target.value)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               onPaste={(e) => handlePaste(index, e)}
//               inputMode="numeric"
//               className="w-12 h-12 text-xl text-center border rounded-md
//                          focus:ring-2 focus:ring-indigo-500"
//             />
//           ))}
//         </div>

//         {error && (
//           <p className="text-sm text-red-500 text-center mb-3">{error}</p>
//         )}

//         <div className="text-center mb-4">
//           {timeLeft > 0 ? (
//             <p className="text-sm text-gray-500">
//               Resend in 00:{String(timeLeft).padStart(2, '0')}
//             </p>
//           ) : (
//             <button
//               type="button"
//               onClick={handleResend}
//               className="text-indigo-600 text-sm font-medium"
//             >
//               Resend OTP
//             </button>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded-md
//                      hover:bg-indigo-700 disabled:opacity-50"
//         >
//           {loading ? 'Verifying...' : 'Verify OTP'}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Otps
