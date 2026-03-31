import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

export const getAllTodos = () => api.get("/todos");
export const getTodoById = (id) => api.get(`/todos/${id}`);
export const createTodo = (todo) => api.post("/todos", todo);
export const updateTodo = (id, todo) => api.put(`/todos/${id}`, todo);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);
