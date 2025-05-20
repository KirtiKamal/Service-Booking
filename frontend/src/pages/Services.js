import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { serviceAPI } from '../services/api';

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '',
    search: searchParams.get('search') || ''
  });

  const categories = ['All', 'Cleaning', 'Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening', 'Other'];
  const sortOptions = [
    { value: '', label: 'Default (Newest)' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];
  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.category, filter.sort]);

  // Add another effect to load services on initial component mount
  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      // Build query parameters
      const params = {};
      if (filter.category && filter.category !== 'All') params.category = filter.category;
      if (filter.sort) params.sort = filter.sort;
      if (filter.search) params.search = filter.search;

      // Update URL search params
      setSearchParams(params);

      const response = await serviceAPI.getAllServices(params);
      setServices(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch services:', err);
      setError('Failed to load services. Please try again later.');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    setFilter({ ...filter, category: e.target.value });
  };

  const handleSortChange = (e) => {
    setFilter({ ...filter, sort: e.target.value });
  };

  const handleSearchChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchServices();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Services</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={filter.category}
                onChange={handleCategoryChange}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort option */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select
                id="sort"
                value={filter.sort}
                onChange={handleSortChange}
                className="w-full sm:w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search */}
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              value={filter.search}
              onChange={handleSearchChange}
              placeholder="Search services..."
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:ring focus:ring-indigo-200 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md mb-8">
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="mb-4 text-gray-600">
            {services.length} {services.length === 1 ? 'service' : 'services'} found
          </div>

          {/* Services grid */}
          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-2">No services found</h3>
              <p className="text-gray-600">
                Try changing your filters or search term.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Services;
