import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../services/firebase';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  const handleLogout = async () => {
    try {
      const { error } = await logoutUser();
      if (!error) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-white font-bold text-xl">Service Booking</Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {currentUser && (
                <>
                  <Link
                    to="/dashboard"
                    className={`${isActive('/dashboard')} text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/services"
                    className={`${isActive('/services')} text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                  >
                    Services
                  </Link>
                  <Link
                    to="/services/new"
                    className={`${isActive('/services/new')} text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
                  >
                    Create Service
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Auth buttons - desktop */}
          <div className="hidden md:flex items-center">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className={`${isActive('/login')} text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${isActive('/signup')} text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-700 focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className={`${isActive('/dashboard') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/services"
                className={`${isActive('/services') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                Services
              </Link>
              <Link
                to="/services/new"
                className={`${isActive('/services/new') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                Create Service
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="text-white bg-red-600 hover:bg-red-700 w-full text-left px-3 py-2 rounded-md text-base font-medium mt-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`${isActive('/login') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`${isActive('/signup') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
