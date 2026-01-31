import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { resendVerification } from "../../api/auth.api";

export default function VerifyEmail() {
  const [params] = useSearchParams();
  const email = params.get("email");
  const success = params.get("success");
  const error = params.get("error");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (success) {
      setMessage("✓ Email verified successfully! You can now log in.");
    } else if (error) {
      const errorMessages = {
        missing_token: "Verification link is missing the token.",
        invalid_token: "Invalid or expired verification link. Please request a new one.",
      };
      setMessage(errorMessages[error] || "Verification failed. Please try again.");
    }
  }, [success, error]);

  const handleResend = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setMessage("");

      const res = await resendVerification(email);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to resend email"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="bg-surface border border-border rounded-xl p-6 max-w-md text-center space-y-4">
        <h2 className="text-xl font-semibold text-textPrimary">
          Verify your email
        </h2>

        <p className="text-textMuted text-sm">
          We’ve sent a verification link to
        </p>

        <p className="font-medium text-textPrimary">
          {email || "your email"}
        </p>

        <p className="text-textMuted text-sm">
          Please check your inbox and click the link.
        </p>

        {message && (
          <p className="text-sm text-glow">{message}</p>
        )}

        <button
          onClick={handleResend}
          disabled={loading || !email}
          className="text-sm text-glow hover:underline disabled:opacity-50"
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>
      </div>
    </div>
  );
}
