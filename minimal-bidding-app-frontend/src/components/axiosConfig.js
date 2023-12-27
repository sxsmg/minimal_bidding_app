import axios from 'axios';
import { useHistory } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:3000/' // Your API base URL
});

api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Attempt to refresh the token
                const refreshToken = localStorage.getItem('refreshToken'); // Adjust based on your storage method
                const response = await axios.post('http://localhost:3000/api/token/refresh', { token: refreshToken });
                
                // Store the new token and retry the original request
                localStorage.setItem('token', response.data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Redirect to login or handle refresh token failure
                // Use useHistory from React Router or a similar method to redirect
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;

