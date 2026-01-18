import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { registerSchema } from "../../validations/registerSchema.js"; 
import { register as signup } from "../../api/auth.api.js";

import AuthLayout from "../../components/auth/AuthLayout.jsx";
import AuthInput from "../../components/auth/AuthInput.jsx";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput.jsx";
import OAuthButton from "../../components/auth/OAuthButtons.jsx";
import Divider from "../../components/auth/AuthDivider.jsx";

export default function Register() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const role = params.get("role"); // student | educator

  // 🚨 Guard: role must exist
  useEffect(() => {
    if (!role) navigate("/");
  }, [role, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role, // ✅ inject role into form
    },
  });

  const onSubmit = async (data) => {
    try {
      // ✅ role is now part of data
      await signup({
        ...data,
        role,
      });

      navigate(`/verify-email?email=${encodeURIComponent(data.email)}`);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start managing expenses intelligently"
    >
      <h2 className="text-2xl font-bold mb-2">
        {role === "educator" ? "Educator Signup" : "Student Signup"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        {/* NAME */}
        <AuthInput
          id="name"
          label="Name"
          autoComplete="name"
          register={register("name")}
          error={errors.name}
        />

        {/* EMAIL */}
        <AuthInput
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          register={register("email")}
          error={errors.email}
        />

        {/* PASSWORD */}
        <AuthPasswordInput
          label="Password"
          placeholder="Password"
          {...register("password")}
          error={errors.password}
        />

        {/* HIDDEN ROLE FIELD (IMPORTANT) */}
        <input type="hidden" {...register("role")} value={role} />

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-glow text-bg py-3 rounded-lg font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <Divider />
      <OAuthButton role={role} />
    </AuthLayout>
  );
}
