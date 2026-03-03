import React, { useState } from "react";
import { 
  Search, Sparkles, Building, Users, Briefcase,
  Zap, ArrowRight, MapPin, TrendingUp, Shield
} from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}"`);
    }
  };

  const handleViewJobs = () => {
    alert("Navigating to jobs page");
  };

  const handlePostJob = () => {
    alert("Opening job posting form");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-black to-purple-900 pt-20 pb-32">
      
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          
          {/* Premium Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm 
                         border border-white/20 rounded-full text-sm font-medium">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-white">AI-Powered Career Platform</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Exceptional Talent</span><br />
            Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Innovative Companies</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
            The premier platform for elite professionals and forward-thinking companies. 
            AI-driven matching, transparent compensation, and career growth tools.
          </p>

          {/* Premium Search Box */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-2xl max-w-xl">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-3 p-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Job title, skills, or company"
                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
              <button 
                onClick={handleSearch}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                         font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Smart Search
              </button>
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 px-4 py-3 border-t border-white/10">
              <span className="text-sm text-gray-400">Trending:</span>
              {["Remote", "Equity", "$150K+", "Startups", "Web3", "AI/ML"].map((tag) => (
                <button 
                  key={tag}
                  className="text-sm bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1.5 rounded-lg transition"
                  onClick={() => setSearchQuery(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl">
            <LiveStat 
              icon={<Building className="w-6 h-6" />}
              value="5,000+"
              label="Tech Companies"
              color="blue"
            />
            <LiveStat 
              icon={<Users className="w-6 h-6" />}
              value="500K+"
              label="Active Talent"
              color="purple"
            />
            <LiveStat 
              icon={<Briefcase className="w-6 h-6" />}
              value="25K+"
              label="Open Roles"
              color="emerald"
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleViewJobs}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                       font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-3 shadow-lg"
            >
              Explore Opportunities
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={handlePostJob}
              className="px-8 py-4 bg-transparent border-2 border-white text-white 
                       font-semibold rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-3"
            >
              <TrendingUp className="w-5 h-5" />
              Post Jobs
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>Global Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative">
          {/* Floating Stats Cards */}
          <div className="absolute -top-6 -left-6 z-10">
            <FloatingCard 
              icon="🚀"
              value="92%"
              label="Match Rate"
              color="blue"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 z-10">
            <FloatingCard 
              icon="💼"
              value="$160K"
              label="Avg. Salary"
              color="purple"
            />
          </div>

          {/* Main Image Container */}
          <div className="relative group">
            {/* Outer Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 
                          rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Image with Gradient Border */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-transparent 
                          bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-transparent p-1">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=800&fit=crop&crop=face"
                  alt="Professional Networking"
                  className="w-full h-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Image Caption */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-sm 
                          border border-white/20 rounded-xl p-4">
              <p className="text-white font-medium">"Joined as a junior, promoted to lead in 18 months"</p>
              <p className="text-gray-300 text-sm mt-1">- Sarah Chen, Engineering Lead at Stripe</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* Live Stat Component */
function LiveStat({ icon, value, label, color }) {
  const colorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    emerald: 'text-emerald-400'
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition">
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-white/10 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

/* Floating Card Component */
function FloatingCard({ icon, value, label, color }) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl border 
                   rounded-2xl p-4 shadow-2xl animate-float`}>
      <div className="flex items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div>
          <div className="text-xl font-bold text-white">{value}</div>
          <div className="text-gray-300 text-xs">{label}</div>
        </div>
      </div>
    </div>
  );
}

// Add to your global CSS
const styles = `
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

// Export with styles
const HeroWithStyles = () => (
  <>
    <style>{styles}</style>
    <Hero />
  </>
);

export default HeroWithStyles;