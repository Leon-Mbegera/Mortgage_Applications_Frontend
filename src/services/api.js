import axios from 'axios';

const apiClient = axios.create(
  {
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json"
    }
  }
);

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('morgage-portal-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
})

export const register = (username, email, password) => {
  apiClient.post("/api/auth/register", { username, email, password })
}

export const login = (username, password) => {
  apiClient.post("/api/auth/login", { username, password})
}

export const submitApplication = (applicationData) => {
  apiClient.post("/api/applications", applicationData)
}

export const getUserApplications = () => {
  apiClient.get("/api/applications")
}

export const getAllApplications = () => {
  apiClient.get("/api/admin/applications")
}

export const updateApplicationStatus = (id, status) => {
  apiClient.put(`/api/admin/applications/${id}`, { status })
}

export default apiClient;