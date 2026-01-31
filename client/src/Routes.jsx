import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/SignUp";
import Login from "./pages/auth/Login.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyEmail from "./pages/auth/VerifyEmail";
import EmailCallback from "./pages/auth/EmailCallback";
import Dashboard from "./pages/dashboard";
import StreamPage from "./pages/StreamPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ROUTES ===== */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/verify-email/callback" element={<EmailCallback />} />
      
      {/* ===== PROTECTED ROUTES ===== */}
      <Route path="/student/dashboard" element={<Dashboard />} />
      <Route path="/educator/dashboard" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/stream/:id" element={<StreamPage />} />
      </Routes>
)
}