// services/adminApi.ts
import axios from "axios";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

const adminApi = axios.create({
  baseURL: "https://amanex-backend.onrender.com/api",
});


const refreshClient = axios.create({
  baseURL: "https://amanex-backend.onrender.com/api",
});

// REQUEST: attach access token
adminApi.interceptors.request.use(config => {
  const token = localStorage.getItem("admin_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE: handle token expiry
adminApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/admin/token/refresh/")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return adminApi(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("admin_refresh_token");
        if (!refreshToken) throw new Error("No refresh token");

        const res = await refreshClient.post("/admin/token/refresh/", {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;

        localStorage.setItem("admin_access_token", newAccessToken);
        adminApi.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);
        return adminApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/admin/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;
