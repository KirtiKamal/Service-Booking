import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { serviceAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, userData, authError } = useAuth();
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser && currentUser.email) {
      setUserEmail(currentUser.email);
      console.log('User authenticated:', currentUser);
      
      // if (authError) {
      //   console.error('Auth error in Dashboard:', authError);
      //   setError('Failed to load complete profile data. Some features may be limited.');
      // }
      
      if (userData) {
        console.log('User data loaded:', userData);
      } else {
        console.log('No user data from Firestore');
      }
    }
  }, [currentUser, userData, authError]);

  const handleBrowseServices = async () => {
    try {
      // Navigate to the services page
      navigate('/services');
    } catch (error) {
      console.error('Error browsing services:', error);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Service Booking Platform
        </h1>        {userEmail && (
          <p className="text-white text-lg mb-3">
            Welcome, <span className="font-medium">{userEmail}</span>!
          </p>
        )}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-md mb-4">
            <span>{error}</span>
          </div>
        )}
        <p className="text-indigo-100 text-lg mb-6">
          Manage and book services easily with our intuitive platform.
        </p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleBrowseServices}
            className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-md"
          >
            Browse Services
          </button>
          <Link
            to="/services/new"
            className="bg-indigo-800 text-white hover:bg-indigo-900 px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-md"
          >
            Create New Service
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Quick Stats */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-indigo-500 text-4xl font-bold mb-2">Services</div>
          <p className="text-gray-600">Browse and search through available services</p>
          <Link
            to="/services"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            View All Services →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-indigo-500 text-4xl font-bold mb-2">Create</div>
          <p className="text-gray-600">Add your own service to the platform</p>
          <Link
            to="/services/new"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Create New Service →
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-indigo-500 text-4xl font-bold mb-2">Manage</div>
          <p className="text-gray-600">Track and manage your service bookings</p>
          <Link
            to="/services"
            className="inline-block mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Manage Bookings →
          </Link>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {['Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening', 'Other'].map(category => (
            <Link
              key={category}
              to={`/services?category=${category}`}
              className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition duration-200"
            >
              <div className="font-medium text-gray-800">{category}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
