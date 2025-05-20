import axios from 'axios';

// Create an Axios instance with base URL
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service related API calls
export const serviceAPI = {
  // Get all services
  getAllServices: async (params = {}) => {
    try {
      const response = await api.get('/services', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  // Get service by ID
  getServiceById: async (id) => {
    try {
      const response = await api.get(`/services/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      throw error;
    }
  },

  // Create new service
  createService: async (serviceData) => {
    try {
      const response = await api.post('/services', serviceData);
      return response.data;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  }
};

export default api;
