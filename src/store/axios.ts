// axios-instance.js
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "http://3.12.206.176/api/v1",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const userData: any = localStorage.getItem("userData");
    const accessToken = JSON.parse(userData)?.token || "";
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
