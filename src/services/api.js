import axios from 'axios';

const api = axios.create(
  {
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json"
    }
  }
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('morgage-portal-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})