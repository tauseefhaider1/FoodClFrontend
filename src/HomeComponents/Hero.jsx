import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-24">
      
      {/* Decorative Blur Shapes */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 -right-24 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          
          

          <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Elevate Your <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Career Journey
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-xl">
            Discover thousands of opportunities from leading companies. Your
            dream job is just one search away.
          </p>

          {/* Search Box */}
          <div className="flex items-center max-w-lg bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl rounded-2xl overflow-hidden">
            <input
              type="text"
              placeholder="Search job title, company, or keyword..."
              className="flex-1 px-5 py-4 text-gray-700 outline-none bg-transparent"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-4">
            <div>
              <h3 className="text-3xl font-bold text-indigo-600">100+</h3>
              <p className="text-gray-500 text-sm">Hiring Companies</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-indigo-600">5K+</h3>
              <p className="text-gray-500 text-sm">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-indigo-600">10K+</h3>
              <p className="text-gray-500 text-sm">Candidates</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 transition">
              View Jobs
            </button>
            <button className="px-8 py-4 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">
              Post a Job
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-3xl rotate-6 scale-105 opacity-20" />
          <img
            src="https://thumbs.dreamstime.com/b/woman-laptop-remote-work-cafe-smile-drink-cappuccino-freelance-copywriting-job-person-computer-reading-tea-cup-354885739.jpg?w=992"
            alt="Job Search"
            className="relative rounded-3xl shadow-2xl w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
