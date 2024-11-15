// services/api.js
import axios from 'axios';

// Create an Axios instance with a base URL for the backend API
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL if different
});

// Add a request interceptor to include the JWT token in headers for protected routes
api.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem('token');
    
    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Return the updated config to proceed with the request
    return config;
  },
  (error) => {
    // Return the error if the request configuration fails
    return Promise.reject(error);
  }
);

export default api;
