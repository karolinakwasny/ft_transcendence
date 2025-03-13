import axiosInstance from './axiosInstance';
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const handleOAuthCallback = async () => {
    try {
        const params = new URLSearchParams(window.location.search);
        const access = params.get('access');
        const refresh = params.get('refresh');

        if (!access || !refresh) {
            throw new Error('Authentication failed');
        }

        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('access_token', access);
        axiosInstance.defaults.headers.common['Authorization'] = `JWT ${access}`;

        window.location.href = '/profile'
    } catch (err) {
        localStorage.clear();
        throw err;
    }
};


export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refresh_token');

        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await axios.post(`${backendUrl}/api/token/refresh/`, {
            refresh: refreshToken,
        });

        // Extract the new access token from the response
        const newAccessToken = response.data.access;

        // Optionally, update the access token in localStorage
        localStorage.setItem('access_token', newAccessToken);

        return newAccessToken;
    } catch (error) {
        console.error('(authService) Failed to refresh token:', error);
        throw error;
    }
};
