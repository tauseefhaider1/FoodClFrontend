import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const CompanyVerify = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/company/verify",
        { token, password }
      );
      alert(res.data.message);
    } catch (err) {
      alert("Verification failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">Set Company Password</h2>

      <input
        type="password"
        placeholder="Password"
        className="input"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn-primary mt-4 w-full">
        Submit
      </button>
    </form>
  );
};

export default CompanyVerify;
