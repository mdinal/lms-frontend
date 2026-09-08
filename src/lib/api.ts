import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the JWT token
api.interceptors.request.use(
  (config) => {
    // Only access localStorage if in the browser
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401s (Token Expired)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // We can't easily use next/router here without tying it to a component,
        // so we'll just reload or let the components handle the redirect based on auth state.
      }
    }
    return Promise.reject(error);
  }
);

export default api;
