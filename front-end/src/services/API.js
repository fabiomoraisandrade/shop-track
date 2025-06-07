import axios from 'axios';
import getUserInfo from '../utils/getUserInfo';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
    const token = getUserInfo("token");
    const axiosConfig = config;
    if (token) {
        axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
});

export default api;