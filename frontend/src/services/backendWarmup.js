// backendWarmup.js
import axiosInstance from './axiosInstance';

const baseUrl = process.env.REACT_APP_BACKEND_URL;
const URL = `${baseUrl}/api/users/health/`;

const backendWarmup = () => {
    try {
        const response = await axiosInstance.get(URL, {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'JWT ' + localStorage.getItem('access_token'),
            },
        });
        return response.data;
    } catch (error) {
        console.error("Backend health check error:", error);
        throw error;
    }  
};

export default backendWarmup;
