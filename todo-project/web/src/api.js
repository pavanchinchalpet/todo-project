import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// attach token automatically from localStorage (AuthContext also updates headers)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// auth
export const register = (payload) => API.post("/auth/register", payload);
export const login = (payload) => API.post("/auth/login", payload);
export const requestOtp = (email) => API.post("/auth/request-otp", { email });
export const verifyOtp = (email, code) => API.post("/auth/verify-otp", { email, code });
export const me = () => API.get("/auth/me");
export const logoutApi = () => API.post("/auth/logout");

// todos
export const fetchTodos = () => API.get("/todos");
export const createTodo = (text) => API.post("/todos", { text });
export const toggleTodo = (id) => API.put(`/todos/${id}`);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
