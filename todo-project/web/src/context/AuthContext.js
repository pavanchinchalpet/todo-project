import React, { createContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = async (email, password) => {
    setLoading(true); setError(null);
    try {
      const res = await apiLogin({ email, password });
      setToken(res.data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  const register = async (name, email, password) => {
    setLoading(true); setError(null);
    try {
      const res = await apiRegister({ name, email, password });
      setToken(res.data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
