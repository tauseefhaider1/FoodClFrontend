import { useState } from "react";
import {
  Mail, Phone, MapPin, Clock, Send, CheckCircle,
  MessageCircle, User, Building, Globe, FileText,
  AlertCircle, ChevronRight, Video,
  Instagram, Linkedin, Twitter
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("form");

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrors({
        name: !formData.name && "Required",
        email: !formData.email && "Required",
        message: !formData.message && "Required",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white px-4">

      {/* Hero */}
      <div className="max-w-7xl mx-auto pt-20 pb-12 text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Reach out to our team for support, sales, or partnership inquiries.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 pb-20">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* Contact Info */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>

            <InfoRow icon={<Mail />} label="Email" value="hello@careerconnect.com" />
            <InfoRow icon={<Phone />} label="Phone" value="+1 (555) 123-4567" />
            <InfoRow icon={<MapPin />} label="Office" value="San Francisco, CA" />
          </div>

          {/* Business Hours */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold">Business Hours</h3>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <div className="flex justify-between">
                <span>Mon – Fri</span>
                <span>9am – 6pm</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>10am – 4pm</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <Social icon={<Twitter />} />
              <Social icon={<Linkedin />} />
              <Social icon={<Instagram />} />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2">

          {isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Message Sent</h2>
              <p className="text-gray-300 mb-6">
                We’ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">

              {/* Header */}
              <div className="p-6 border-b border-white/20">
                <h2 className="text-2xl font-bold">Send a Message</h2>
                <p className="text-gray-300 text-sm">
                  Fill the form and our team will contact you
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">

              

                {/* Inputs */}
                <Input icon={<User />} placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <Input icon={<Mail />} placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} />
                <Input icon={<Building />} placeholder="Company (optional)" name="company" value={formData.company} onChange={handleChange} />
                <Input icon={<Phone />} placeholder="Phone (optional)" name="phone" value={formData.phone} onChange={handleChange} />
                <Input icon={<FileText />} placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} />

                {/* Message */}
                <textarea
                  name="message"
                  rows="5"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/20
                             outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* Submit */}
                <div className="flex justify-end">
                  <button
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-8 py-3 rounded-lg
                               bg-gradient-to-r from-indigo-500 to-purple-600
                               hover:opacity-90 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Sending..." : <>
                      <Send className="w-5 h-5" /> Send
                    </>}
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20
                   border border-white/20 outline-none
                   focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 mb-3 text-gray-300">
      <div className="text-indigo-400">{icon}</div>
      <div>
        <p className="text-sm">{label}</p>
        <p className="font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function Social({ icon }) {
  return (
    <button className="p-3 bg-white/20 rounded-lg hover:bg-white/30 transition">
      {icon}
    </button>
  );
}
