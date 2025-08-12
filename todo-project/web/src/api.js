import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"
,
});

// attach token automatically from localStorage (AuthContext also updates headers)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export // auth
const register = (payload) => API.post("/auth/register", payload);
export const login = (payload) => API.post("/auth/login", payload);

// todos
export const fetchTodos = () => API.get("/todos");
export const createTodo = (text) => API.post("/todos", { text });
export const toggleTodo = (id) => API.put(`/todos/${id}`);
export const deleteTodo = (id) => API.delete(`/todos/${id}`);
