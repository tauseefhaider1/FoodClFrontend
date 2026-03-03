// import React, { useState } from "react";
// import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import api from "../Api/Azios"; // adjust path

// const Signups = () => {
//   const [eye, setEye] = useState(false);
//   const [eyes, setEyes] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await api.post("/register", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password,
//       });

//       alert(res.data.message || "Verification email sent");
//     } catch (err) {
//       alert(err.response?.data?.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Register your company
//         </h1>

//         <form className="space-y-5" onSubmit={handleSubmit}>
//           {/* Company Name */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3"
//               placeholder="Enter company name"
//               required
//             />
//           </div>

//           {/* Company Email */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Company Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border rounded-lg px-4 py-3"
//               placeholder="Enter company email"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={eye ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-4 py-3"
//                 placeholder="Enter password"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-3 cursor-pointer"
//                 onClick={() => setEye((p) => !p)}
//               >
//                 {eye ? <FaRegEyeSlash /> : <FaRegEye />}
//               </span>
//             </div>
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={eyes ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full border rounded-lg px-4 py-3"
//                 placeholder="Confirm password"
//                 required
//               />
//               <span
//                 className="absolute right-3 top-3 cursor-pointer"
//                 onClick={() => setEyes((p) => !p)}
//               >
//                 {eyes ? <FaRegEyeSlash /> : <FaRegEye />}
//               </span>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-center mt-6 text-gray-600">
//           Already registered?{" "}
//           <Link
//             to="/admin/login"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signups;
