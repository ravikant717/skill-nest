import axios from "./axios";

export const register = (data) =>
  axios.post("/auth/register", data);

export const login = (data) =>
  axios.post("/auth/login", data);

export const verifyEmail = (data) =>
  axios.post("/auth/verify-email", data);

export const forgotPassword = (data) =>
  axios.post("/auth/forgot-password", data);

export const resendVerification = (email) =>
  axios.post("/auth/resend-verification", { email });