import User from "../../models/user.js";
import { verifyToken } from "../../utils/jwt.js";

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        message: "Verification token is missing",
      });
    }

    const payload = verifyToken(token);

    await User.findByIdAndUpdate(payload.id, {
      emailVerified: true,
    });

    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (err) {
    console.error("VERIFY EMAIL ERROR:", err);

    return res.status(400).json({
      message: "Invalid or expired verification link",
    });
  }
};
