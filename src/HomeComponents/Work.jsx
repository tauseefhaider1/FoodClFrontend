import { useState, useEffect } from 'react';
import { 
  Briefcase, UserCheck, Search, FileText, Send, CheckCircle, 
  Users, Target, Clock, Shield, BarChart, MessageSquare,
  Award, Zap, Globe, Heart, Star, TrendingUp, ShieldCheck,
  Mail, Calendar, Bell, Download, Video, ThumbsUp, X,
  ChevronRight, ArrowRight, MapPin, DollarSign, Building,
  PlayCircle, Filter, Bookmark, Share2, Eye, MessageCircle,
  Linkedin, Twitter, Mail as MailIcon, ExternalLink,
  Headphones, Sparkles, Cpu, Globe as GlobeIcon,
  Smartphone, Shield as ShieldIcon, Zap as ZapIcon
} from "lucide-react";

export default function Works() {
  const [activeTab, setActiveTab] = useState('job-seekers');
  const [testimonials] = useState([
    {
      id: 1,
      name: "Alexandra Chen",
      role: "Senior Software Engineer",
      company: "Stripe",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      quote: "The AI matching found opportunities I didn't even know existed. Landed a 40% salary increase.",
      rating: 5,
      hired: "Hired at Stripe"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Product Director",
      company: "Notion",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      quote: "Hired 8 senior engineers in 3 months. The platform saved us $120K in recruitment fees.",
      rating: 5,
      hired: "Hired 8 team members"
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "UX Design Lead",
      company: "Figma",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      quote: "CareerConnect's design community helped me level up my skills while finding remote work.",
      rating: 4,
      hired: "Promoted to Lead"
    }
  ]);

  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "Vercel",
      location: "Remote (Global)",
      salary: "$180,000 - $240,000",
      type: "Full-time",
      posted: "2 hours ago",
      logo: "▲",
      featured: true,
      equity: "0.1% - 0.3%",
      tech: ["React", "Next.js", "TypeScript", "Tailwind"]
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      company: "OpenAI",
      location: "San Francisco, CA",
      salary: "$250,000 - $350,000",
      type: "Full-time",
      posted: "1 day ago",
      logo: "🤖",
      featured: true,
      equity: "Stock options",
      tech: ["Python", "TensorFlow", "PyTorch", "ML Ops"]
    },
    {
      id: 3,
      title: "Senior Product Designer",
      company: "Linear",
      location: "Remote (US)",
      salary: "$160,000 - $200,000",
      type: "Full-time",
      posted: "6 hours ago",
      logo: "📐",
      featured: false,
      equity: "0.05% - 0.15%",
      tech: ["Figma", "Design Systems", "Web3", "Mobile"]
    }
  ]);

  const [companies] = useState([
    { id: 1, name: "Stripe", logo: "💳", jobs: 45, rating: 4.8 },
    { id: 2, name: "Notion", logo: "📝", jobs: 32, rating: 4.7 },
    { id: 3, name: "Figma", logo: "🎨", jobs: 28, rating: 4.9 },
    { id: 4, name: "Vercel", logo: "▲", jobs: 15, rating: 4.8 },
    { id: 5, name: "Linear", logo: "➡️", jobs: 12, rating: 4.9 },
    { id: 6, name: "OpenAI", logo: "🤖", jobs: 23, rating: 4.7 }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleGetStarted = () => {
    // Navigate to signup
    window.location.href = "/signup";
  };

  const handleSearchJobs = () => {
    alert(`Searching for "${searchQuery}" in ${location || "any location"}`);
  };

  const handleApply = (jobId) => {
    alert(`Opening application for job ${jobId}`);
  };

  const handleCompanyClick = (companyName) => {
    alert(`Viewing jobs at ${companyName}`);
  };

  const handleVideoDemo = () => {
    alert("Playing platform demo video");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          {/* Animated Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 backdrop-blur-sm 
                           border border-white/20 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-white">Trusted by 500+ tech companies</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Elite Talent</span><br />
              Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Exceptional Companies</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              AI-powered career platform designed for the world's most ambitious professionals 
              and innovative companies. Get matched, not just matched.
            </p>

            {/* Premium Search Bar */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-1.5 shadow-2xl">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 p-4">
                      <Search className="w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Job title, skills, or tech stack"
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                      />
                    </div>
                  </div>
                  <div className="flex-1 border-l border-white/20">
                    <div className="flex items-center gap-3 p-4">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Remote, Hybrid, or Location"
                        className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-lg"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleSearchJobs}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                             font-semibold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-3"
                  >
                    <Sparkles className="w-5 h-5" />
                    Smart Search
                  </button>
                </div>
                
                {/* Quick Filters */}
                <div className="flex flex-wrap gap-3 px-4 py-3 border-t border-white/10">
                  <span className="text-sm text-gray-400">Popular:</span>
                  {["Remote Only", "$150K+", "Equity", "Startups", "AI/ML", "Web3"].map((tag) => (
                    <button 
                      key={tag}
                      className="text-sm bg-white/10 hover:bg-white/20 text-gray-300 px-3 py-1.5 rounded-lg transition"
                      onClick={() => alert(`Filtering by ${tag}`)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="flex flex-wrap justify-center gap-8">
              <LiveStat icon={<Users />} value="500K+" label="Active Candidates" />
              <LiveStat icon={<Building />} value="5,000+" label="Tech Companies" />
              <LiveStat icon={<Target />} value="92%" label="Match Success Rate" />
              <LiveStat icon={<ZapIcon />} value="<24h" label="Avg. Response Time" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-1.5 inline-flex border border-white/10">
          <button
            onClick={() => setActiveTab('job-seekers')}
            className={`px-8 py-3.5 rounded-xl font-medium transition-all flex items-center gap-3 ${
              activeTab === 'job-seekers' 
                ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-white border border-blue-500/30' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            For Talent
          </button>
          <button
            onClick={() => setActiveTab('employers')}
            className={`px-8 py-3.5 rounded-xl font-medium transition-all flex items-center gap-3 ${
              activeTab === 'employers' 
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            For Companies
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {activeTab === 'job-seekers' ? (
          <TalentSection 
            jobs={jobs}
            companies={companies}
            onApply={handleApply}
            onCompanyClick={handleCompanyClick}
          />
        ) : (
          <EmployerSection 
            onPostJob={() => alert("Opening job post form")}
          />
        )}

        {/* Premium Testimonials */}
        <div className="mt-24 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Join thousands who transformed their careers through our platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <PremiumTestimonial 
                key={testimonial.id}
                testimonial={testimonial}
                onWatch={() => alert(`Playing ${testimonial.name}'s story`)}
              />
            ))}
          </div>
        </div>

        {/* Video Demo */}
        <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-12 mb-20 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-video-pattern opacity-5"></div>
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PlayCircle className="w-4 h-4" />
              Platform Tour
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">
              See Why Top Companies Choose Us
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              3-minute walkthrough of our enterprise features
            </p>
            <button 
              onClick={handleVideoDemo}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              <PlayCircle className="w-6 h-6" />
              Watch Platform Demo
            </button>
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="relative z-10 p-12 text-center">
            <h3 className="text-4xl font-bold text-white mb-4">
              Ready to Level Up?
            </h3>
            <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
              Join professionals earning 2-3x more than industry average
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button 
                onClick={handleGetStarted}
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-3 shadow-lg"
              >
                <UserCheck className="w-5 h-5" />
                Start Free Trial
              </button>
              <button 
                onClick={() => alert("Schedule demo")}
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition flex items-center justify-center gap-3"
              >
                <Headphones className="w-5 h-5" />
                Book Enterprise Demo
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5" />
                <span>AI-Powered Matching</span>
              </div>
              <div className="flex items-center gap-2">
                <GlobeIcon className="w-5 h-5" />
                <span>Global Opportunities</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CareerConnect Pro</span>
            </div>
            
            <div className="flex gap-4">
              <button className="p-2.5 bg-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/20 transition">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/20 transition">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="p-2.5 bg-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/20 transition">
                <MailIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Talent Section */
function TalentSection({ jobs, companies, onApply, onCompanyClick }) {
  return (
    <>
      {/* How It Works */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">
          Your Path to Elite Opportunities
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <PremiumStepCard
            step={1}
            icon={<Smartphone className="w-8 h-8" />}
            title="Smart Profile"
            description="AI-powered profile optimization with instant feedback"
            features={["Resume Scanner", "Skill Gap Analysis", "Salary Calculator"]}
            color="blue"
          />
          <PremiumStepCard
            step={2}
            icon={<Cpu className="w-8 h-8" />}
            title="Intelligent Matching"
            description="Deep learning matches you with perfect opportunities"
            features={["Culture Fit", "Growth Potential", "Compensation Match"]}
            color="purple"
          />
          <PremiumStepCard
            step={3}
            icon={<ShieldIcon className="w-8 h-8" />}
            title="Secure Process"
            description="End-to-end encrypted communication and applications"
            features={["Private Mode", "Salary Transparency", "Direct Contact"]}
            color="emerald"
          />
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-white">Featured Opportunities</h3>
          <button className="text-blue-400 font-medium flex items-center gap-2 hover:text-blue-300 transition">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <PremiumJobCard 
              key={job.id}
              job={job}
              onApply={() => onApply(job.id)}
            />
          ))}
        </div>
      </div>

      {/* Top Companies */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-white mb-8">Hiring Now</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {companies.map((company) => (
            <PremiumCompanyCard 
              key={company.id}
              company={company}
              onClick={() => onCompanyClick(company.name)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/* Employer Section */
function EmployerSection({ onPostJob }) {
  return (
    <>
      {/* Employer Tools */}
      <div className="mb-20">
        <h3 className="text-3xl font-bold text-white mb-12 text-center">
          Enterprise Hiring Suite
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <PremiumToolCard
            icon={<Cpu className="w-8 h-8 text-blue-400" />}
            title="AI Sourcing"
            description="Find candidates 10x faster with predictive matching"
            onClick={onPostJob}
          />
          <PremiumToolCard
            icon={<Video className="w-8 h-8 text-purple-400" />}
            title="Interview Suite"
            description="Integrated video interviews with AI analysis"
            onClick={() => alert("Open interview suite")}
          />
          <PremiumToolCard
            icon={<BarChart className="w-8 h-8 text-emerald-400" />}
            title="Analytics Dashboard"
            description="Real-time hiring metrics and insights"
            onClick={() => alert("Open analytics")}
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="bg-gradient-to-r from-gray-900/50 to-black/50 rounded-3xl p-10 mb-20 border border-white/10">
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          Plans for Every Team
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <PricingPlan
            name="Starter"
            price="$499"
            period="month"
            features={["5 active jobs", "Basic AI matching", "Email support", "100 candidate views"]}
            buttonText="Start Free Trial"
            onClick={onPostJob}
          />
          <PricingPlan
            name="Growth"
            price="$999"
            period="month"
            featured={true}
            features={["Unlimited jobs", "Advanced AI matching", "Priority support", "Video interviews", "Analytics"]}
            buttonText="Get Started"
            onClick={onPostJob}
          />
          <PricingPlan
            name="Enterprise"
            price="Custom"
            period=""
            features={["Everything in Growth", "Custom AI models", "Dedicated support", "API access", "Onboarding"]}
            buttonText="Contact Sales"
            onClick={() => alert("Contact sales")}
          />
        </div>
      </div>
    </>
  );
}

/* Components */

function LiveStat({ icon, value, label }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
        <div className="text-blue-400">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}

function PremiumStepCard({ step, icon, title, description, features, color }) {
  const colorClasses = {
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    emerald: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30'
  };

  return (
    <div className={`bg-white/5 backdrop-blur-sm border ${colorClasses[color]} rounded-2xl p-8 hover:bg-white/10 transition`}>
      <div className="flex items-start justify-between mb-6">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent text-white">
          {icon}
        </div>
        <span className="text-4xl font-bold text-white/20">{step}</span>
      </div>
      <h4 className="text-2xl font-bold text-white mb-4">{title}</h4>
      <p className="text-gray-400 mb-6 leading-relaxed">{description}</p>
      
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PremiumJobCard({ job, onApply }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-2xl">
            {job.logo}
          </div>
          <div>
            <h4 className="font-bold text-white">{job.title}</h4>
            <p className="text-blue-400">{job.company}</p>
          </div>
        </div>
        {job.featured && (
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium rounded-full">
            Featured
          </span>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="w-4 h-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300">
          <DollarSign className="w-4 h-4" />
          <span className="font-medium text-white">{job.salary}</span>
          <span className="text-sm text-gray-500">+ {job.equity} equity</span>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {job.tech.map((tech) => (
          <span key={tech} className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-lg">
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{job.posted}</span>
        <button 
          onClick={onApply}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:opacity-90 transition flex items-center gap-2"
        >
          Apply Now
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function PremiumCompanyCard({ company, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition border border-white/10 group"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-3xl mb-4 group-hover:scale-110 transition">
          {company.logo}
        </div>
        <h4 className="font-bold text-white mb-1">{company.name}</h4>
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-300">{company.rating}</span>
        </div>
        <p className="text-sm text-gray-400">{company.jobs} openings</p>
      </div>
    </button>
  );
}

function PremiumToolCard({ icon, title, description, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/10 transition border border-white/10 text-left group"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-white/10 to-transparent mb-6 group-hover:scale-105 transition">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-white mb-3">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </button>
  );
}

function PremiumTestimonial({ testimonial, onWatch }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition">
      <div className="flex items-center gap-4 mb-6">
        <img 
          src={testimonial.image} 
          alt={testimonial.name}
          className="w-16 h-16 rounded-full border-2 border-blue-500/30"
        />
        <div>
          <h4 className="font-bold text-white">{testimonial.name}</h4>
          <p className="text-gray-400 text-sm">{testimonial.role} • {testimonial.company}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i}
            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}`}
          />
        ))}
      </div>
      
      <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-blue-400 px-3 py-1 bg-blue-500/20 rounded-full">
          {testimonial.hired}
        </span>
        <button 
          onClick={onWatch}
          className="flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition"
        >
          <PlayCircle className="w-5 h-5" />
          Watch Story
        </button>
      </div>
    </div>
  );
}

function PricingPlan({ name, price, period, features, featured, buttonText, onClick }) {
  return (
    <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border ${featured ? 'border-blue-500/50' : 'border-white/10'} hover:bg-white/10 transition`}>
      {featured && (
        <div className="mb-6">
          <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <h4 className="text-2xl font-bold text-white mb-2">{name}</h4>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-gray-400 ml-2">/{period}</span>
      </div>
      
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3 text-gray-300">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
      
      <button 
        onClick={onClick}
        className={`w-full py-3 rounded-lg font-semibold transition ${
          featured 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90' 
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

// Add these styles to your global CSS
const styles = `
.bg-grid-pattern {
  background-image: 
    linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

.bg-video-pattern {
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 2px, transparent 2px),
    radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 2px, transparent 2px);
  background-size: 80px 80px;
}
`;

