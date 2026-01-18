// services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://amanex-backend.onrender.com/api",
});

export default api;
