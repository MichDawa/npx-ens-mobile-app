import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ipconfig in cmd to get the 192.168.254.107 instead of localhost
const API_BASE_URL = 'http:/172.20.10.3/ens-mobile-app-backend/public';
// const API_BASE_URL = 'https://ens-mobile-app-backend-419947829015.us-central1.run.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      AsyncStorage.removeItem('auth-token');
    }
    return Promise.reject(
      error.response?.data?.message || 'Network request failed'
    );
  }
);

export default api;