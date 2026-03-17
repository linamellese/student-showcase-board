import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

console.log("🚀 API Base URL:", API_URL);

const api = axios.create({
   baseURL: API_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
   timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
   (config) => {
      const token = localStorage.getItem("token");
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }

      const fullUrl = `${config.baseURL}${config.url}`;
      console.log(`📤 ${config.method?.toUpperCase()} ${fullUrl}`);

      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

// Response interceptor
api.interceptors.response.use(
   (response) => {
      console.log(`✅ ${response.status} ${response.config.url}`);
      return response;
   },
   (error) => {
      if (error.response) {
         console.error("❌ API Error:", {
            url: error.config?.url,
            status: error.response.status,
            data: error.response.data,
         });

         if (error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
         }
      } else if (error.code === "ERR_NETWORK") {
         console.error("❌ Network error - Backend not running on port 5000");
      }

      return Promise.reject(error);
   },
);

// Auth APIs
export const authAPI = {
   signup: (userData) => api.post("/auth/signup", userData),
   login: (credentials) => api.post("/auth/login", credentials),
   //    contact: (contactData) => api.post("/contact", contactData)
};

// Project APIs
export const projectAPI = {
   getAllProjects: (params) => api.get("/projects", { params }),
   getProjectById: (id) => api.get(`/projects/${id}`),
   createProject: (projectData) => api.post("/projects", projectData),
   updateProject: (id, projectData) => api.put(`/projects/${id}`, projectData),
   deleteProject: (id) => api.delete(`/projects/${id}`),
   getUserProjects: () => api.get("/projects/user/me"),
};

export default api;
