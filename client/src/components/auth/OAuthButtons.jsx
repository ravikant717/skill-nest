export default function OAuthButton({ role }) {
  const handleGoogleLogin = () => {
    window.location.href =
      `${import.meta.env.VITE_API_URL}/auth/google?role=${role}`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full mt-4 border border-border py-3 rounded-lg"
    >
      Continue with Google
    </button>
  );
}
