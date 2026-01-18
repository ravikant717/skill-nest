import User from "../../models/user.js";
import { comparePassword } from "../../utils/hash.js";
import { issueAuthCookie } from "../../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.passwordSet) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    if (!user.emailVerified) {
      return res.status(403).json({
        message: "Email not verified",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    issueAuthCookie(res, user._id);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
