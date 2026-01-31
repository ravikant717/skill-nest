import { Router } from "express";
import passport from "passport";
import { register } from "../controllers/auth/signup.js";
import { login } from "../controllers/auth/login.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { googleAuth } from "../controllers/auth/googleAuth.js";
import { googleCallback } from "../controllers/auth/googleCallback.js";
import { resendVerification } from "../controllers/auth/sendVerificationToken.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getUserCredentials } from "../controllers/auth/getMyData.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);

router.get("/me", authMiddleware, getUserCredentials);
router.get(
  "/google",
  googleAuth,
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleCallback,
);
router.post("/resend-verification", resendVerification);

export default router;
