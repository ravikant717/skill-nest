import { Router } from "express";
import passport from "passport";
import { register } from "../controllers/auth/signup.js";
import { login} from "../controllers/auth/login.js";
import { verifyEmail } from "../controllers/auth/verifyEmail.js";
import { googleAuth } from "../controllers/auth/googleAuth.js";
import { resendVerification } from "../controllers/auth/sendVerificationToken.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);

router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.post("/resend-verification", resendVerification);

router.get(
  "/auth/google",
  googleAuth,
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


export default router;
