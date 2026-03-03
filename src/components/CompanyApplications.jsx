import React, { useEffect, useState } from "react";
import api from "../Api/Azios";
import { useSocket } from "../context/SocketContext";
import { Users, Download, Eye, FileText } from "lucide-react";
import Cookies from "js-cookie";

const CompanyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const { socket, isConnected } = useSocket();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token') || sessionStorage.getItem('token');
      if (!token) {
        setError("No authentication token found");
        return;
      }

      const res = await api.get("/company/applications", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // ✅ Correct: use grouped array from backend
      const grouped = res.data.grouped || [];

      // Flatten all applications into a single array
      const allApplications = grouped.flatMap(g => 
        (g.applications || []).map(app => ({ ...app, job: g.job }))
      );

      setApplications(allApplications);

    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, newStatus) => {
    setUpdatingId(applicationId);
    try {
      const token = Cookies.get('token') || sessionStorage.getItem('token');
      const company = JSON.parse(localStorage.getItem('company') || '{}');

      const application = applications.find(app => app._id === applicationId);
      if (!application) throw new Error("Application not found");

      await api.put(`/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (socket && isConnected) {
        socket.emit('status-updated', {
          applicationId,
          userId: application.user?._id,
          newStatus,
          jobTitle: application.job?.jobTitle,
          companyName: company?.companyName || 'Company',
          timestamp: new Date()
        });
      }

      await fetchApplications();

    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const downloadResume = async (applicationId) => {
    try {
      const token = Cookies.get('token') || sessionStorage.getItem('token');
      const res = await api.get(`/applications/${applicationId}/resume`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume_${applicationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download resume");
    }
  };const viewResume = async (applicationId) => {
  try {
    const res = await api.get(
      `/applications/${applicationId}/resume`,
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    window.open(url, "_blank");

    setTimeout(() => URL.revokeObjectURL(url), 500);
  } catch (err) {
    console.error("View error:", err);
    alert("Unauthorized or resume not found");
  }
};
  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      shortlisted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      hired: 'bg-purple-100 text-purple-800'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const ConnectionStatus = () => (
    <div className="flex items-center gap-2 text-sm">
      <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
      <span className="text-gray-600">{isConnected ? 'Live' : 'Connecting...'}</span>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applications Received</h1>
        <ConnectionStatus />
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-4">{error}</div>}

      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No applications yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Group by job */}
          {Object.entries(
            applications.reduce((acc, app) => {
              const jobId = app.job?._id || 'unknown';
              if (!acc[jobId]) acc[jobId] = { job: app.job, applications: [] };
              acc[jobId].applications.push(app);
              return acc;
            }, {})
          ).map(([jobId, group]) => (
            <div key={jobId} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold">{group.job?.jobTitle || 'Unknown Job'}</h2>
                <p className="text-gray-600">{group.applications.length} applicant(s)</p>
              </div>
              <div className="divide-y">
                {group.applications.map(app => (
                  <div key={app._id} className="p-6 hover:bg-gray-50 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-lg">{app.user?.name || app.user?.email || 'Anonymous'}</h3>
                        {getStatusBadge(app.status)}
                      </div>
                      <p className="text-gray-600">{app.user?.email}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        <span>Applied: {new Date(app.appliedAt || app.createdAt).toLocaleDateString()}</span>
                        {app.user?.phone && <span>• Phone: {app.user.phone}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <select
                        value={app.status || 'pending'}
                        onChange={e => updateStatus(app._id, e.target.value)}
                        disabled={updatingId === app._id}
                        className="px-3 py-2 border rounded-lg text-sm bg-white disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>

                      {updatingId === app._id && <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>}

                      {app.resume ? (
                        <>
                          <button onClick={() => viewResume(app._id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Resume"><Eye size={18} /></button>
                          <button onClick={() => downloadResume(app._id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Download Resume"><Download size={18} /></button>
                        </>
                      ) : (
                        <div className="p-2 text-gray-400" title="No resume uploaded"><FileText size={18} /></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyApplications;