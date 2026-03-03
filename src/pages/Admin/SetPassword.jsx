// import { useSearchParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../../Api/cAzios";

// const SetPassword = () => {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const token = params.get("token");

//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.post("/verify", { token, password });
//       alert("Company registered successfully");
//       navigate("/company/login");
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!token) {
//     return <p className="text-center mt-10">Invalid or missing token</p>;
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20">
//       <h2 className="text-2xl font-bold mb-4">Set Company Password</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="password"
//           placeholder="Enter password"
//           className="input w-full"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           disabled={loading}
//           className="btn-primary w-full mt-4"
//         >
//           {loading ? "Submitting..." : "Set Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default SetPassword;
