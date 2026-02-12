// services/api.ts
import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });

const api = axios.create({
  baseURL: "https://amanex-backend.onrender.com/api",
});

export default api;
