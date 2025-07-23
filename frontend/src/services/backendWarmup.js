// backendWarmup.js
import axiosInstance from './axiosInstance';

const backendWarmup = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  return axiosInstance.get(`${backendUrl}/api/users/health/`)
    .then(response => {
      console.log('Backend is awake!');
    })
    .catch(error => {
      console.error('Backend health check error:', error);
    });
};

export default backendWarmup;
