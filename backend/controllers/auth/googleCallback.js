import { issueAuthCookie } from "../../utils/jwt.js";
import { env } from "../../config/env.js";
import User from "../../models/user.js";

export const googleCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect(`${env.CLIENT_URL}/login`);
    }

    const role = req.session.oauthRole;

    if (!role) {
      return res.redirect(`${env.CLIENT_URL}/login`);
    }

    // Ensure role is set (first-time OAuth)
    if (!req.user.role) {
      req.user.role = role;
      await req.user.save();
    }

    // Issue auth cookie / JWT
    issueAuthCookie(res, {
      id: req.user._id,
      role: req.user.role,
    });

    // Role-based redirect
    const redirectPath =
      req.user.role === "educator"
        ? "/educator/dashboard"
        : "/student/dashboard";

    return res.redirect(`${env.CLIENT_URL}${redirectPath}`);
  } catch (err) {
    console.error("Google OAuth error:", err);
    return res.redirect(`${env.CLIENT_URL}/login`);
  }
};
