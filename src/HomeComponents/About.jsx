import { 
  Users, Target, Award, Globe, Heart, Zap,
  TrendingUp, Shield, Clock, Star, Building,
  Linkedin, Twitter, Mail, MapPin, ChevronRight,
  Briefcase, GraduationCap, CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-black to-purple-900">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-indigo-800/90 to-purple-800/90 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">About CareerConnect</h1>
          </div>
          <p className="text-xl text-gray-200 max-w-3xl">
            CareerConnect is the world's fastest-growing career platform, helping millions of job seekers 
            find meaningful employment and connecting employers with top talent worldwide.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission Statement */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300 mb-4">
                At CareerConnect, we believe that finding the right job or the right candidate should be 
                simple, transparent, and efficient. We're dedicated to creating opportunities and 
                transforming lives through meaningful career connections.
              </p>
              <p className="text-gray-300">
                Founded in 2018, we've grown from a small startup to a global platform serving 
                millions of users across 50+ countries. Our AI-powered matching technology and 
                comprehensive tools help bridge the gap between talent and opportunity.
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8">By The Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard 
                  number="50M+"
                  label="Monthly Active Users"
                  gradient="from-blue-400 to-cyan-400"
                />
                <StatCard 
                  number="2.5M+"
                  label="Career Success Stories"
                  gradient="from-emerald-400 to-green-400"
                />
                <StatCard 
                  number="150K+"
                  label="Company Partners"
                  gradient="from-purple-400 to-pink-400"
                />
                <StatCard 
                  number="95%"
                  label="Satisfaction Rate"
                  gradient="from-amber-400 to-orange-400"
                />
              </div>
            </div>

            {/* Job Opening */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-l-4 border-indigo-500 p-6 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-500/20 backdrop-blur-sm rounded-lg">
                  <Target className="w-6 h-6 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Senior Product Manager
                  </h3>
                  <p className="text-gray-300 mb-4">
                    We are looking for a Senior Product Manager to join our team as we continue to 
                    expand our product offerings and services. The ideal candidate will have a 
                    strong background in product management, with experience in developing and 
                    launching new products or features. You should be passionate about creating 
                    innovative solutions that make a real impact on people's lives.
                  </p>
                  <p className="text-gray-300 mb-6">
                    If you're interested in joining us, please send your resume and a brief overview 
                    of your skills and experience to careers@careerconnect.com.
                  </p>
                  <button className="inline-flex items-center gap-2 px-6 py-3 
                                     bg-gradient-to-r from-indigo-500 to-purple-600 
                                     text-white rounded-lg hover:opacity-90 transition">
                    Apply Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Our Team</h2>
              <p className="text-gray-300 mb-6">
                At CareerConnect, we are committed to building a diverse and inclusive workplace. 
                We value diversity of thought, experience, and perspective. We are committed to 
                fostering an environment where everyone can thrive and reach their full potential.
              </p>
              <p className="text-gray-300 mb-8">
                Our team members come from a variety of backgrounds, experiences, and perspectives. 
                We believe that this diversity is what makes us stronger and better able to solve 
                complex problems. We are proud to have a team that is dedicated to making a positive 
                impact on the world.
              </p>

              <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Meet Our Leadership</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <TeamMember 
                    name="Michael Smith"
                    role="Chief Executive Officer"
                    experience="Former VP at LinkedIn, 15+ years in tech"
                  />
                  <TeamMember 
                    name="Sarah Johnson"
                    role="Chief People Officer"
                    experience="HR Director at Google, Stanford MBA"
                  />
                  <TeamMember 
                    name="David Lee"
                    role="Chief Technology Officer"
                    experience="AI Research Lead at Microsoft, MIT PhD"
                  />
                  <TeamMember 
                    name="Emily Chen"
                    role="Chief Marketing Officer"
                    experience="Marketing Director at Airbnb, Harvard MBA"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Commitments */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Our Commitments</h3>
              
              <div className="space-y-6">
                <CommitmentItem 
                  icon={<Shield className="w-5 h-5" />}
                  title="Safe & Inclusive Workplace"
                  description="We provide a safe, healthy, and inclusive work environment for all employees."
                />
                <CommitmentItem 
                  icon={<Award className="w-5 h-5" />}
                  title="Competitive Compensation"
                  description="Competitive salaries, comprehensive benefits, and equity packages."
                />
                <CommitmentItem 
                  icon={<GraduationCap className="w-5 h-5" />}
                  title="Professional Development"
                  description="$5,000 annual learning budget and regular promotion opportunities."
                />
                <CommitmentItem 
                  icon={<Heart className="w-5 h-5" />}
                  title="Social Responsibility"
                  description="We donate 1% of profits to educational and career development programs."
                />
                <CommitmentItem 
                  icon={<Globe className="w-5 h-5" />}
                  title="Global Impact"
                  description="Free access to our platform for non-profits and educational institutions."
                />
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Learn More</h3>
              <div className="space-y-4">
                <QuickLink 
                  title="Our Technology"
                  description="Learn about our AI-powered matching algorithm"
                />
                <QuickLink 
                  title="Diversity & Inclusion"
                  description="Our commitment to building diverse teams"
                />
                <QuickLink 
                  title="Investor Relations"
                  description="Financial reports and company news"
                />
                <QuickLink 
                  title="Press Center"
                  description="Latest news and media resources"
                />
                <QuickLink 
                  title="Contact Us"
                  description="Get in touch with our team"
                />
              </div>
            </div>

            {/* Login CTA */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 
                             rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Secure Access</h4>
              <p className="text-gray-300 text-sm mb-4">
                Access your dashboard with enterprise-grade security
              </p>
              <Link to="/login">
                <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 
                                   text-white rounded-lg hover:opacity-90 transition font-medium">
                  Login to Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16 pt-12 border-t border-white/20">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            What Drives Us
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <ValueCard 
              icon={<Target className="w-8 h-8" />}
              title="User-First"
              description="Everything we build starts with our users' needs"
            />
            <ValueCard 
              icon={<Zap className="w-8 h-8" />}
              title="Innovation"
              description="Constantly pushing the boundaries of what's possible"
            />
            <ValueCard 
              icon={<Users className="w-8 h-8" />}
              title="Collaboration"
              description="Great things happen when we work together"
            />
            <ValueCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Impact"
              description="Measuring success by the lives we transform"
            />
          </div>
        </div>

        {/* Join CTA */}
        <div className="mt-16 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 
                       border border-white/20 rounded-2xl p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Join the Career Revolution
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're seeking your next career leap or building an exceptional team, 
            CareerConnect provides the platform, intelligence, and community for success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-gray-900 font-semibold 
                             rounded-lg hover:bg-gray-100 transition">
              Create Free Account
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white 
                             text-white font-semibold rounded-lg hover:bg-white/10 
                             transition">
              Enterprise Demo
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/50 border-t border-white/10 mt-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CareerConnect</span>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting talent with opportunity since 2018.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link to="/press" className="hover:text-white transition">Press</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@careerconnect.com</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <button className="p-2 bg-white/10 rounded-lg text-gray-400 
                                 hover:bg-white/20 hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg text-gray-400 
                                 hover:bg-white/20 hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/10 rounded-lg text-gray-400 
                                 hover:bg-white/20 hover:text-white transition">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
            <p>© 2024 CareerConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* Components */

function StatCard({ number, label, gradient }) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold bg-gradient-to-r ${gradient} 
                      bg-clip-text text-transparent mb-2`}>
        {number}
      </div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}

function TeamMember({ name, role, experience }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <Users className="w-6 h-6 text-indigo-300" />
        </div>
        <div>
          <h4 className="font-bold text-white">{name}</h4>
          <p className="text-indigo-300 text-sm mb-2">{role}</p>
          <p className="text-gray-400 text-sm">{experience}</p>
        </div>
      </div>
    </div>
  );
}

function CommitmentItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg text-indigo-300">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-white mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function QuickLink({ title, description }) {
  return (
    <button className="w-full text-left p-4 bg-white/5 backdrop-blur-sm 
                      rounded-lg hover:bg-white/10 transition group border border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium text-white mb-1">{title}</div>
          <div className="text-gray-400 text-sm">{description}</div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
      </div>
    </button>
  );
}

function ValueCard({ icon, title, description }) {
  return (
    <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
      <div className="w-16 h-16 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 
                     rounded-full flex items-center justify-center mx-auto mb-4">
        <div className="text-indigo-300">
          {icon}
        </div>
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}