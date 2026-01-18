import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/axios.js";

export default function VerifyEmailCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get(`/auth/verify-email?token=${token}`);
        navigate("/login", {
          replace: true,
          state: { verified: true },
        });
      } catch {
        navigate("/login", {
          replace: true,
          state: { verified: false },
        });
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <p className="text-textMuted">Verifying your email…</p>
    </div>
  );
}
