import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useEffect } from "react";

import AuthPasswordInput from "../../components/auth/AuthPasswordInput";
import OAuthButton from "../../components/auth/OAuthButtons.jsx";
import Divider from "../../components/auth/AuthDivider.jsx";

import { login } from "../../api/auth.api.js";
import { loginSchema } from "../../validations/loginSchema.js";
import { useUser } from "../../context/useUser.js";

export default function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const role = params.get("role"); // student | educator
  const { refetchUser } = useUser();

  // 🚨 Guard: role must exist
  useEffect(() => {
    if (!role) navigate("/");
  }, [role, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await login(data);

      // Refetch user to update AuthContext
      try {
        await refetchUser();
      } catch (refetchErr) {
        // Log refetch errors but do not block navigation
        console.error("Failed to refetch user after login", refetchErr);
      }

      // ✅ ROLE-BASED REDIRECT
      if (res.data.user.role === "educator") {
        navigate("/educator/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (err) {
      const code = err.response?.data?.code;

      if (code === "EMAIL_NOT_VERIFIED") {
        navigate(
          `/verify-email?email=${encodeURIComponent(data.email)}`
        );
        return;
      }

      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="w-full max-w-md bg-surface p-6 rounded-xl border border-border">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">
          {role === "educator" ? "Educator Login" : "Student Login"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* EMAIL */}
          <div>
            <input
              {...register("email")}
              placeholder="Email"
              autoComplete="email"
              className="text-black w-full"
            />
            {errors.email && (
              <p className="text-danger text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <AuthPasswordInput
            label="Password"
            placeholder="Password"
            {...register("password")}
            error={errors.password}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-glow text-bg py-3 rounded-xl"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* LINKS */}
        <div className="flex justify-between text-sm mt-3">
          <Link to="/forgot-password" className="text-glow">
            Forgot password?
          </Link>
          <Link
            to={`/signup?role=${role}`}
            className="text-glow"
          >
            Create account
          </Link>
        </div>

        <Divider />

        {/* GOOGLE OAUTH */}
        <OAuthButton role={role} />
      </div>
    </div>
  );
}
