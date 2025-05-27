import axios from 'axios';
import toast from 'react-hot-toast';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5100/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    // Example of adding a token to the request
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    toast.error(
      `Error: ${error.response?.status} - ${error.response?.data?.errorMessage || error.message}`
    );
    console.log('error', error);

    // Global error handling
    return Promise.reject(error);
  }
);

export default apiClient;
