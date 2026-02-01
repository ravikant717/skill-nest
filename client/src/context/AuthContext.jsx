import { createContext, useEffect, useState, useCallback } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const refetchUser = useCallback(async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      // 401 is expected if user is not logged in
      if (err.response?.status !== 401) {
        console.error("Error fetching user:", err);
      }
      setUser(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    refetchUser();
  }, [refetchUser]);

  return (
    <AuthContext.Provider value={{ user, isLoaded, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
