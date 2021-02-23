import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER;
const token = localStorage.getItem('token') || '';

const api = axios.create({
  baseURL,
  headers: {
    'Authorization': 'Bearer ' + token
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && error.response.config.url !== 'api/auth/me') {
      window.location.href = '/login';
    }
    return error.response;
  });

export default api;