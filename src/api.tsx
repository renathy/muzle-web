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
    if (error.response && error.response.status === 403) {
      window.location.href = '/login';
    }
    return false;
  });

export default api;