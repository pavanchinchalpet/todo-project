import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todo";
import { AuthContext } from "./context/AuthContext";

// Custom Logo Component
const Logo = () => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <svg width="32" height="32" viewBox="0 0 32 32" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}>
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:'#ffffff',stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:'#f8f9fa',stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="16" cy="16" r="15" fill="url(#logoGrad)" stroke="#ffffff" strokeWidth="2"/>
      
      {/* Checkbox 1 */}
      <rect x="8" y="8" width="6" height="6" rx="1" fill="none" stroke="#2c3e50" strokeWidth="2"/>
      <path d="M10 12 L12 14 L14 10" stroke="#2c3e50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Checkbox 2 */}
      <rect x="8" y="18" width="6" height="6" rx="1" fill="none" stroke="#2c3e50" strokeWidth="2"/>
      <path d="M10 22 L12 24 L14 20" stroke="#2c3e50" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Plus sign */}
      <circle cx="24" cy="24" r="4" fill="#2c3e50"/>
      <path d="M22 24 L26 24 M24 22 L24 26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"/>
    </svg>
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white' }}>
      Todo App
    </Typography>
  </Box>
);

function RequireAuth({ children }) {
  const { token, me } = useContext(AuthContext);
  return token || me ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { token, me, logout } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          {!token && !me && (
            <>
              <Button color="inherit" component={RouterLink} to="/login">Login</Button>
              <Button color="inherit" component={RouterLink} to="/register">Register</Button>
            </>
          )}
          {(token || me) && (
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
