import { useEffect, useState } from "react";
import api from "../../Api/AZioss.js";

const PendingCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    api.get("/companies/pending").then((res) => {
      setCompanies(res.data.data);
    });
  }, []);

  const handleApprove = async (id) => {
    await api.put(`/companies/approve/${id}`);
    setCompanies(companies.filter((c) => c._id !== id));
  };

  const handleReject = async (id) => {
    await api.put(`/companies/reject/${id}`);
    setCompanies(companies.filter((c) => c._id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Companies</h2>

      {companies.map((company) => (
        <div
          key={company._id}
          className="bg-white p-4 rounded shadow mb-3 flex justify-between"
        >
          <div>
            <p className="font-semibold">{company.companyName}</p>
            <p className="text-sm text-gray-500">{company.email}</p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => handleApprove(company._id)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Approve
            </button>

            <button
              onClick={() => handleReject(company._id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingCompanies;
