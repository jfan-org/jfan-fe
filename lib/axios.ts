import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:4000/api/v1",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For CORS with credentials
});

// Request interceptor to log requests
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[Axios Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    console.log('[Axios Request] Data:', config.data);
    return config;
  },
  (error) => {
    console.error('[Axios Request Error]:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to log responses
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[Axios Response] ${response.status} ${response.statusText}`);
    console.log('[Axios Response] Data:', response.data);
    console.log('[Axios Response] Headers:', response.headers);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`[Axios Response Error] ${error.response.status} ${error.response.statusText}`);
      console.error('[Axios Response Error] Data:', error.response.data);
      console.error('[Axios Response Error] Headers:', error.response.headers);
    } else if (error.request) {
      console.error('[Axios Request Error] No response received:', error.request);
    } else {
      console.error('[Axios Error]:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;