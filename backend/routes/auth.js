import { Router } from "express";
import passport from "passport";
import { register } from "../controllers/auth/signup.js";
import { login} from "../controllers/auth/login.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { forgotPassword } from "../controllers/auth/forgotPassword.js";
import { resetPassword } from "../controllers/auth/resetPassword.js";
import { setPasswordOauth } from "../controllers/auth/setPaaword.js";
import { googleCallback } from "../controllers/auth/googleCallback.js";
import { resendVerification } from "../controllers/auth/sendVerificationToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.post("/set-password", setPasswordOauth);

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.post("/resend-verification", resendVerification);

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

export default router;
