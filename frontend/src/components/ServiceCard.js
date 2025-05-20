import React from 'react';

const ServiceCard = ({ service }) => {
  const { name, description, category, price, duration, imageUrl, rating } = service;

  // Render stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path fill="url(#half-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    // Empty stars
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <svg key={`empty-star-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mt-1">
              {category}
            </span>
          </div>
          <div className="text-lg font-bold text-indigo-600">
            ${price.toFixed(2)}
          </div>
        </div>
        
        <p className="text-gray-600 mt-2 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-1">
              {rating.toFixed(1)}
            </span>
            <div className="flex">
              {renderStars(rating)}
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {duration} mins
          </div>
        </div>
        
        <button className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
