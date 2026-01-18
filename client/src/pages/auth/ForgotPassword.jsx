import { useState } from "react";
import { forgotPassword } from "../../api/auth.api";
import { useForm } from "react-hook-form";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";

export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = async ({ email }) => {
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reset link");
    }
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="If the email exists, a reset link has been sent"
      />
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We’ll send you a secure reset link"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthInput
          label="Email"
          autocomplete="email"
          register={register("email", { required: true })}
        />

        <button className="w-full bg-glow text-bg py-3 rounded-lg font-semibold">
          Send Reset Link
        </button>
      </form>
    </AuthLayout>
  );
}
