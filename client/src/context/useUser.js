import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useUser = () => useContext(AuthContext);
