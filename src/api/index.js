import axios from 'axios';

const getToken = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  return token || null;
};

const api = axios.create({
  baseURL:'http://localhost:5000/api/v1',
});

api.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Ensure errors are properly rejected
  },
);

export default api;

