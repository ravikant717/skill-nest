import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const signToken = (payload, expiresIn = env.JWT_EXPIRES_IN) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn });

export const verifyToken = (token) => jwt.verify(token, env.JWT_SECRET);

export const issueAuthCookie = (res, userId) => {
  const token = signToken({ id: userId });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
  });
};

export const clearAuthCookie = (res) => {
  res.clearCookie("access_token");
};
