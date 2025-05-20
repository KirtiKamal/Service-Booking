import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
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
              <Link
                to="/"
                className={`${isActive('/')} text-white hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center`}
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
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`${isActive('/') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
          >
            Dashboard
          </Link>
          <Link
            to="/services"
            className={`${isActive('/services') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
          >
            Services
          </Link>
          <Link
            to="/services/new"
            className={`${isActive('/services/new') ? 'bg-indigo-700' : ''} text-white block px-3 py-2 rounded-md text-base font-medium`}
          >
            Create Service
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
