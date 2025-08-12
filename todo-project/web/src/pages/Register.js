import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Register() {
  const { register, error } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localErr, setLocalErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalErr(null);

    // Empty fields check
    if (!name || !email || !password) {
      setLocalErr("Please fill all fields");
      return;
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalErr("Please enter a valid email address");
      return;
    }

    const ok = await register(name, email, password);
    if (ok) navigate("/todos");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h5">Register</Typography>
      {localErr && <Alert severity="error">{localErr}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" type="submit">Register</Button>
      <Typography>
        Already have an account?{" "}
        <Button component={RouterLink} to="/login">Login</Button>
      </Typography>
    </Box>
  );
}
