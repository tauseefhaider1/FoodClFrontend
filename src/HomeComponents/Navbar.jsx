import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-6 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        {/* Left */}
        <h3 className="text-2xl font-bold text-blue-600">
          Job<span className="text-gray-800">Portal</span>
        </h3>

        {/* Middle (Desktop only) */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-600">
          <Link to='/'>          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          </Link>

          <Link to='/works'><li className="hover:text-blue-600 cursor-pointer">How it works</li>

          </Link>
          <Link to='/about'>   <li className="hover:text-blue-600 cursor-pointer">About</li>
          </Link>
          <Link to='/contact'>          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
          </Link>            <Link to='/user-profile'><li>Profile</li></Link>

        </ul>

        {/* Right (Desktop only) */}
        <div className="hidden md:flex gap-3">
          <Link to='/login'>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
              Find Job
            </button></Link>

            <Link to='/company/apply'>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Post Job
          </button></Link>
             <Link to='/admins/login'>
          <button className="px-4 py-2 text-gray-600 hover:text-blue-600">
            Admin
          </button></Link>
        </div>

        {/* Hamburger (Mobile only) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-gray-700"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-6 space-y-6">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium">
            <Link to='/'> <li>Home</li></Link>
            <Link to='/works'> <li>How it works</li></Link>
            <Link to='/about'><li>About</li></Link>
            <Link to='/contact'><li>Contact</li></Link>
            <Link to='/user-profile'><li>Profile</li></Link>
            <li></li>
          </ul>

          <div className="flex flex-col gap-3">
            <Link to="/login">
              <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg">
                Find Job
              </button>
            </Link>
            <Link to='/adimn/signup'>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Post Job
            </button></Link>
                        <Link to='/admins/login'>

            <button className="w-full text-gray-600 py-2">
              Admin
            </button></Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
