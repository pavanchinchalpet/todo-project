import React, { createContext, useEffect, useState } from "react";
import { register as apiRegister, login as apiLogin } from "../api";
import axios from "axios";
import { logoutApi } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [me, setMe] = useState(null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const refreshMe = async () => {
    try {
      const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";
      const res = await axios.get(baseURL + "/auth/me", { 
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {},
        withCredentials: true 
      });
      setMe(res.data);
      return true;
    } catch {
      setMe(null);
      return false;
    }
  };

  useEffect(() => { 
    // Try to get user info on mount
    refreshMe(); 
  }, [token]);

  const register = async (name, email, password) => {
    setLoading(true); 
    setError(null);
    try {
      const res = await apiRegister({ name, email, password });
      if (res.data && res.data.token) {
        setToken(res.data.token);
      }
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
      setLoading(false);
      return false;
    }
  };

  const login = async (email, password) => {
    setLoading(true); 
    setError(null);
    try {
      const res = await apiLogin({ email, password });
      if (res.data && res.data.token) {
        setToken(res.data.token);
      }
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try { 
      await logoutApi(); 
    } catch {}
    setToken(null);
    setMe(null);
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      me, 
      loading, 
      error, 
      register, 
      login,
      logout, 
      refreshMe 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
