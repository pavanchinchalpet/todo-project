import React, { useEffect, useState, useContext } from "react";
import { Typography, Paper, CircularProgress, Alert } from "@mui/material";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { fetchTodos, createTodo, toggleTodo, deleteTodo } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const { logout } = useContext(AuthContext);

  const load = async () => {
    setLoading(true); setErr(null);
    try {
      const res = await fetchTodos();
      setTodos(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // if token invalid or expired -> logout
      if (error.response?.status === 401) {
        logout();
      } else {
        setErr(error.response?.data?.message || "Failed to load todos");
      }
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, []);

  const handleAdd = async (text) => {
    try {
      await createTodo(text);
      await load();
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to add");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleTodo(id);
      setTodos((prev) => prev.map(t => (t._id === id ? { ...t, completed: !t.completed } : t)));
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to toggle");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos((prev) => prev.filter(t => t._id !== id));
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>My Todos</Typography>
      {loading ? <CircularProgress /> : (
        <>
          {err && <Alert severity="error">{err}</Alert>}
          <TodoForm onAdd={handleAdd} />
          <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        </>
      )}
    </Paper>
  );
}
