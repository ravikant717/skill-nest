import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthPasswordInput from "../../components/auth/AuthPasswordInput";
import { resetPassword } from "../../api/auth.api";

export default function ResetPassword() {
  const { register, handleSubmit } = useForm();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const onSubmit = async ({ password }) => {
    try {
      await resetPassword({ token, password });
      navigate("/login", { replace: true });
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  if (!token) {
    return (
      <AuthLayout
        title="Invalid reset link"
        subtitle="This reset link is missing or expired"
      />
    );
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Choose a strong password for your account"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthPasswordInput
          label="New password"
          register={register("password", { required: true })}
        />

        <button className="w-full bg-glow text-bg py-3 rounded-lg font-semibold">
          Update Password
        </button>
      </form>
    </AuthLayout>
  );
}
