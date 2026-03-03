// pages/MyApplications.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import api from "../Api/Azios";
import {
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  Building2,
  MapPin,
  Calendar,
  FileText,
  Bell,
  X
} from "lucide-react";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newStatusUpdate, setNewStatusUpdate] = useState(null);

  const { socket, isConnected } = useSocket();

  // ================= REAL-TIME SOCKET LISTENER =================
  useEffect(() => {
    if (!socket) return;

    console.log("🟢 Setting up socket listeners in MyApplications");

    socket.on("status-updated", (data) => {
      console.log("📩 Status update received:", data);

      // Show toast
      toast.success(`Your application is now ${data.newStatus}`, {
        icon: "🔔",
        duration: 5000,
        position: "top-right"
      });

      // Add notification
      const notification = {
        id: Date.now(),
        message: `Your application for "${data.jobTitle}" is now ${data.newStatus}`,
        applicationId: data.applicationId,
        newStatus: data.newStatus,
        companyName: data.companyName,
        timestamp: new Date(),
        read: false
      };
      setNotifications(prev => [notification, ...prev].slice(0, 10));

      // Update application in list
      setApplications(prev =>
        prev.map(app =>
          app._id === data.applicationId
            ? { ...app, status: data.newStatus, updatedAt: new Date() }
            : app
        )
      );

      // Highlight status change
      setNewStatusUpdate({ appId: data.applicationId, status: data.newStatus });
      setTimeout(() => setNewStatusUpdate(null), 3000);
    });

    socket.on("connect", () => console.log("✅ Socket connected"));
    socket.on("disconnect", () => console.log("❌ Socket disconnected"));

    return () => {
      socket.off("status-updated");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [socket]);

  // ================= FETCH APPLICATIONS =================
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token") || sessionStorage.getItem("token");
      if (!token) return navigate("/login");

      const res = await api.get("/user/applications", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load your applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApplications(); }, []);

  // ================= RESUME HANDLERS =================
  const downloadResume = async (applicationId) => {
    try {
      const token = Cookies.get("token") || sessionStorage.getItem("token");

      const response = await api.get(`/applications/${applicationId}/resume`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob"
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${applicationId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to download resume");
    }
  };

  // ================= NOTIFICATIONS =================
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const clearNotifications = () => setNotifications([]);

  // ================= STATUS BADGE =================
  const getStatusBadge = (status, isNew = false) => {
    const statusMap = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock, label: "Pending" },
      reviewed: { color: "bg-blue-100 text-blue-800", icon: Eye, label: "Reviewed" },
      shortlisted: { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Shortlisted" },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle, label: "Rejected" },
      hired: { color: "bg-purple-100 text-purple-800", icon: CheckCircle, label: "Hired" }
    };
    const cfg = statusMap[status] || statusMap.pending;
    const Icon = cfg.icon;
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${cfg.color} ${isNew ? 'ring-2 ring-purple-500 animate-pulse' : ''}`}>
        <Icon className="w-4 h-4 mr-1" />
        {cfg.label}
      </span>
    );
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-US", { year:"numeric", month:"short", day:"numeric" }) : "N/A";

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span>{isConnected ? "Live" : "Connecting..."}</span>
          </div>

          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce">{unreadCount}</span>}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-semibold">Updates</h3>
                  {notifications.length > 0 && <button onClick={clearNotifications} className="text-xs text-gray-500 hover:text-gray-700">Clear all</button>}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? <p className="text-center text-gray-500 py-4">No notifications</p> : notifications.map((notif) => (
                    <div key={notif.id} className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition ${notif.read ? 'opacity-75' : 'bg-purple-50'}`}
                      onClick={() => {
                        markNotificationAsRead(notif.id);
                        const app = applications.find(a => a._id === notif.applicationId);
                        if (app) setSelectedApp(app); // open modal
                        setShowNotifications(false);
                      }}
                    >
                      <p className="text-sm text-gray-800">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(notif.timestamp).toLocaleTimeString()}</p>
                      {!notif.read && <span className="text-xs text-purple-600 mt-1 block">New</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">You haven't applied to any jobs yet</p>
          <button onClick={() => navigate("/jobs")} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">Browse Jobs</button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => (
            <div key={app._id} className={`bg-white rounded-lg shadow hover:shadow-md transition p-6 ${newStatusUpdate?.appId === app._id ? 'border-2 border-purple-400 bg-purple-50' : ''}`}>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{app.job?.jobTitle || "Unknown Position"}</h2>
                      <p className="text-gray-600 flex items-center gap-2 text-sm"><Building2 className="w-4 h-4" />{app.job?.companyName || "Company"}</p>
                      {app.job?.location && <p className="text-gray-600 flex items-center gap-2 text-sm"><MapPin className="w-4 h-4" />{app.job.location}</p>}
                      <p className="text-gray-500 flex items-center gap-2 text-sm"><Calendar className="w-4 h-4" /> Applied: {formatDate(app.appliedAt || app.createdAt)}</p>
                    </div>
                  </div>
                  {app.coverLetter && <div className="mt-4 p-3 bg-gray-50 rounded-lg"><p className="text-sm font-medium text-gray-700 mb-1">Cover Letter:</p><p className="text-sm text-gray-600 line-clamp-2">{app.coverLetter}</p></div>}
                </div>

                <div className="flex flex-col items-end gap-3">
                  {getStatusBadge(app.status, newStatusUpdate?.appId === app._id)}
                  <div className="flex gap-2">
                    <button onClick={() => setSelectedApp(app)} className="px-3 py-1.5 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition text-sm">Details</button>
                    {app.resume && <button onClick={() => downloadResume(app._id)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"><Download size={18} /></button>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">Application Details</h2>
              <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-6">
              {/* Job info */}
              <p><strong>Position:</strong> {selectedApp.job?.jobTitle}</p>
              <p><strong>Company:</strong> {selectedApp.job?.companyName}</p>
              <p><strong>Applied On:</strong> {formatDate(selectedApp.appliedAt || selectedApp.createdAt)}</p>
              {selectedApp.coverLetter && <p><strong>Cover Letter:</strong> {selectedApp.coverLetter}</p>}
              {selectedApp.resume && (
                <button onClick={() => downloadResume(selectedApp._id)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">Download Resume</button>
              )}
              {getStatusBadge(selectedApp.status)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;