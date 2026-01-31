import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, isLoaded } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <p className="text-textMuted">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center space-y-4">
          <p className="text-textPrimary font-semibold">You need to be logged in</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-glow text-white rounded-lg hover:opacity-80"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">
          Welcome, {user.name}
        </h1>
        
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-textPrimary mb-4">User Info</h2>
          <ul className="space-y-2 text-textMuted">
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Role:</strong> {user.role}</li>
            <li><strong>ID:</strong> {user.id}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}