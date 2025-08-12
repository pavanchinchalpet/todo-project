import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todo";
import { AuthContext } from "./context/AuthContext";

function RequireAuth({ children }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { token, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
          {!token && (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          )}
          {token && (
            <>
              <Button color="inherit" component={RouterLink} to="/todos">My Todos</Button>
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={ token ? <Navigate to="/todos" /> : <Navigate to="/login" /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={
            <RequireAuth>
              <Todos />
            </RequireAuth>
          } />
          <Route path="*" element={<Typography>404 Not Found</Typography>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
