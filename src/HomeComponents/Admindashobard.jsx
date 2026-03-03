import { useEffect, useState } from "react";
import api from "../Api/AZioss.js";

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null); // For modal view
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies/pending", { withCredentials: true });
      console.log("Company data:", res.data.data); // Check what data we get
      setCompanies(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load companies");
    } finally {
      setLoading(false);
    }
  };

  const approveCompany = async (id) => {
    setActionLoading(id);
    try {
      await api.put(`/companies/approve/${id}`, {}, { withCredentials: true });
      setCompanies(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Approve failed");
    } finally {
      setActionLoading(null);
    }
  };

  const rejectCompany = async (id) => {
    const reason = prompt("Reason for rejection?");
    if (!reason) return;

    setActionLoading(id);
    try {
      await api.put(`/companies/reject/${id}`, { reason }, { withCredentials: true });
      setCompanies(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Reject failed");
    } finally {
      setActionLoading(null);
    }
  };

  const viewCompanyDetails = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {companies.length === 0 ? (
        <p className="text-gray-500">No pending company requests.</p>
      ) : (
        <div className="grid gap-6">
          {companies.map((company) => (
            <div key={company._id} className="bg-white shadow rounded-lg p-6 border">
              {/* Company Header with Logo */}
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                {company.logo ? (
                  <img 
                    src={`http://localhost:3000${company.logo}`} 
                    alt={company.companyName}
                    className="w-20 h-20 object-cover rounded-lg border"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/80?text=No+Logo';
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                    No Logo
                  </div>
                )}

                {/* Basic Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{company.companyName}</h2>
                      <p className="text-gray-600">{company.email}</p>
                      <p className="text-gray-600">{company.phone}</p>
                    </div>
                    
                    {/* Status Badge */}
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {company.status}
                    </span>
                  </div>

                  {/* Quick Info Row */}
                  <div className="mt-2 flex flex-wrap gap-4 text-sm">
                    <span className="text-gray-500">Industry: {company.industry}</span>
                    <span className="text-gray-500">Size: {company.companySize}</span>
                    <span className="text-gray-500">Location: {company.address}</span>
                  </div>

                  {/* Website */}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline text-sm block mt-1"
                    >
                      {company.website}
                    </a>
                  )}

                  {/* Description Preview */}
                  <p className="mt-3 text-gray-700 line-clamp-2">
                    {company.description}
                  </p>

                  {/* Meta Info */}
                  <p className="mt-2 text-sm text-gray-400">
                    Applied: {new Date(company.createdAt).toLocaleString()}
                  </p>

                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => approveCompany(company._id)}
                      disabled={actionLoading === company._id}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {actionLoading === company._id ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => rejectCompany(company._id)}
                      disabled={actionLoading === company._id}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => viewCompanyDetails(company)}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Company Details Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Company Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Company Details Grid */}
              <div className="space-y-6">
                {/* Logo and Basic Info */}
                <div className="flex items-start gap-6">
                  {selectedCompany.logo ? (
                    <img 
                      src={`http://localhost:3000${selectedCompany.logo}`} 
                      alt={selectedCompany.companyName}
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      No Logo
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedCompany.companyName}</h3>
                    <p className="text-gray-600">{selectedCompany.email}</p>
                    <p className="text-gray-600">{selectedCompany.phone}</p>
                    {selectedCompany.website && (
                      <a href={selectedCompany.website} target="_blank" rel="noreferrer" 
                         className="text-blue-600 underline block mt-1">
                        {selectedCompany.website}
                      </a>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <label className="text-sm text-gray-500">Industry</label>
                    <p className="font-medium">{selectedCompany.industry}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <label className="text-sm text-gray-500">Company Size</label>
                    <p className="font-medium">{selectedCompany.companySize}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <label className="text-sm text-gray-500">Address</label>
                    <p className="font-medium">{selectedCompany.address}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-medium capitalize">{selectedCompany.status}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <label className="text-sm text-gray-500">Applied On</label>
                    <p className="font-medium">{new Date(selectedCompany.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <label className="text-sm text-gray-500">Last Updated</label>
                    <p className="font-medium">{new Date(selectedCompany.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm text-gray-500 font-medium">Description</label>
                  <p className="mt-1 p-3 bg-gray-50 rounded">{selectedCompany.description}</p>
                </div>

                {/* Rejection Info (if rejected) */}
                {selectedCompany.status === 'rejected' && selectedCompany.rejectionReason && (
                  <div>
                    <label className="text-sm text-red-500 font-medium">Rejection Reason</label>
                    <p className="mt-1 p-3 bg-red-50 text-red-700 rounded">
                      {selectedCompany.rejectionReason}
                    </p>
                  </div>
                )}

                {/* Approval Info (if approved) */}
                {selectedCompany.status === 'approved' && selectedCompany.approvedAt && (
                  <div>
                    <label className="text-sm text-green-500 font-medium">Approved On</label>
                    <p className="mt-1 p-3 bg-green-50 text-green-700 rounded">
                      {new Date(selectedCompany.approvedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
                {selectedCompany.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        approveCompany(selectedCompany._id);
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        rejectCompany(selectedCompany._id);
                        setShowModal(false);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;