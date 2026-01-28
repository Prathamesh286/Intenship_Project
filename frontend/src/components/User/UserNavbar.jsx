// src/components/User/UserNavbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function UserNavbar() {
  const {user,logout} = useAuth()
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Detect scroll to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 py-4 h-20 text-white flex justify-between items-center shadow-md transition duration-300 ${
        isScrolled ? 'bg-gradient-to-r from-black to-red-900' : 'bg-black'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4">
        {/* Logo */}
        <div className="text-3xl font-bold ml-8">
          <Link to="/" className="text-white hoverȯtext-red-400 transition">
            FitTrack
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center text-lg font-medium">
          <Link to="/" className="hover:text-red-400 transition">
            HOME
          </Link>
          <Link to="/course" className="hover:text-red-400 transition">
            COURSE
          </Link>
          <Link to="/gallery" className="hover:text-red-400 transition">
            GALLERY
          </Link>
          <Link to="/contact" className="hover:text-red-400 transition">
            CONTACT
          </Link>
          <Link to="/about" className="hover:text-red-400 transition">
            ABOUT
          </Link>
          <Link to="/ourteam" className="hover:text-red-400 transition">
            OUR TEAM
          </Link>
          <Link to="/reviews" className="hover:text-red-400 transition">
            REVIEWS
          </Link>

          {user ? (
          <div className="flex gap-4 mr-4">
            <Link to="/login" className="bg-red-500 border-2 border-white text-white font-semibold py-2 px-4  hover:bg-red-600 transition duration-300" >Login</Link> 
            
            <Link to="/register"className="bg-red-500 border-2 border-white text-white font-semibold py-2 px-4  hover:bg-red-600 transition duration-300">Register
            </Link>
          
          </div>
          ) : (

            <>
                <span className='mr-4'>{user.name}</span>
                <button onClick={logout} className="bg-red-500 border-2 border-white text-white font-semibold py-2 px-4  hover:bg-red-600 transition duration-300">Logout</button>
        
            </>)}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-red-900 shadow-lg">
          <Link
            to="/"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/course"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            Course
          </Link>
          <Link
            to="/gallery"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            Gallery
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/ourteam"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            Our Team
          </Link>
          <Link
            to="/reviews"
            className="block text-white hover:bg-red-800 py-3 px-6 transition"
            onClick={toggleMenu}
          >
            Reviews
          </Link>
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;