import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Alert, Stack } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { requestOtp, verifyOtp } from "../api";

export default function Login() {
  const { error, refreshMe, setToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [localErr, setLocalErr] = useState(null);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLocalErr(null); 
    setInfo(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setLocalErr("Enter a valid email");
      return;
    }
    setLoading(true);
    try {
      await requestOtp(email);
      setOtpMode(true);
      setInfo("OTP sent to your email. Expires in 5 minutes.");
    } catch (err) {
      setLocalErr(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLocalErr(null); 
    setInfo(null);
    if (!otp || otp.length !== 6) {
      setLocalErr("Enter 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const response = await verifyOtp(email, otp);
      // OTP verification successful, now try to get user info
      await refreshMe();
      navigate("/todos");
    } catch (err) {
      setLocalErr(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack component="div" spacing={2}>
      <Typography variant="h5">Login with OTP</Typography>
      {localErr && <Alert severity="error">{localErr}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {info && <Alert severity="info">{info}</Alert>}

      {!otpMode && (
        <Box component="form" onSubmit={handleSendOtp} sx={{ display: "grid", gap: 2 }}>
          <TextField 
            label="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Button 
            variant="contained" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
        </Box>
      )}

      {otpMode && (
        <Box component="form" onSubmit={handleVerifyOtp} sx={{ display: "grid", gap: 2 }}>
          <Typography>OTP sent to {email}</Typography>
          <TextField 
            label="Enter 6-digit OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)}
            disabled={loading}
          />
          <Button 
            variant="contained" 
            type="submit"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
          <Button 
            variant="text" 
            onClick={() => setOtpMode(false)}
            disabled={loading}
          >
            Back
          </Button>
        </Box>
      )}

      <Typography>
        Don't have an account? <Button component={RouterLink} to="/register">Register</Button>
      </Typography>
    </Stack>
  );
}
