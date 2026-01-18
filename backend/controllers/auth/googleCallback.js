import { handleGoogleOAuth } from "./passwordGlogin.js";
import { issueAuthCookie } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

/**
 * GOOGLE OAUTH CALLBACK CONTROLLER
 * GET /api/auth/google/callback
 */
export const googleCallback = async (req, res) => {
  try {
    // 🔐 Passport must attach user
    if (!req.user) {
      return res.redirect(`${env.CLIENT_URL}/login`);
    }

    const result = await handleGoogleOAuth(req.user);

    // OAuth user must set password
    if (result.requiresPassword) {
      return res.redirect(
        `${env.CLIENT_URL}/set-password?token=${result.token}`
      );
    }

    // Normal OAuth login
    issueAuthCookie(res, result.userId);

    return res.redirect(`${env.CLIENT_URL}/dashboard`);
  } catch (err) {
    console.error("Google OAuth error:", err);
    return res.redirect(`${env.CLIENT_URL}/login`);
  }
};
