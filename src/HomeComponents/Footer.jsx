import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  ArrowRight,
  Shield,
  Users,
  Building,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      
      {/* CTA BAR */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl font-bold text-white">
            Ready to find your next opportunity?
          </h3>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Browse Jobs
          </button>
        </div>
      </div>

      {/* TRUST STATS */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <Users className="mx-auto text-indigo-500" />
            <p className="text-xl font-bold mt-2">500K+</p>
            <p className="text-sm text-gray-400">Candidates</p>
          </div>
          <div>
            <Building className="mx-auto text-indigo-500" />
            <p className="text-xl font-bold mt-2">10K+</p>
            <p className="text-sm text-gray-400">Companies</p>
          </div>
          <div>
            <Shield className="mx-auto text-indigo-500" />
            <p className="text-xl font-bold mt-2">Secure</p>
            <p className="text-sm text-gray-400">Verified Jobs</p>
          </div>
          <div>
            <Briefcase className="mx-auto text-indigo-500" />
            <p className="text-xl font-bold mt-2">25K+</p>
            <p className="text-sm text-gray-400">Live Jobs</p>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* BRAND */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="text-indigo-500" />
            <h2 className="text-xl font-bold text-white">CareerPro</h2>
          </div>
          <p className="text-gray-400 text-sm">
            Connecting talent with opportunity. Build your future with confidence.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-2">
            {["Find Jobs", "Companies", "Remote Jobs", "Internships"].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            {["About", "Careers", "Blog", "Contact"].map(item => (
              <li key={item}>
                <a href="#" className="hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-white mb-4">Contact</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@careerpro.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +1 (555) 123-4567
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> San Francisco, CA
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CareerPro. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Facebook />
            <Twitter />
            <Linkedin />
            <Github />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
