import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
    process.env.NODE_ENV === 'production'
        ? '/api' // Production uses relative URL
        : 'http://localhost:5000/api', // Development uses local backend 
        headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
