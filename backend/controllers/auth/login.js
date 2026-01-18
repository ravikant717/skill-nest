import User from "../../models/user.js";
import { comparePassword } from "../../utils/hash.js";
import { issueAuthCookie } from "../../utils/jwt.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Ensure password exists (for local login)
    if (!user.password) {
      return res.status(401).json({
        message: "Use Google login for this account",
      });
    }

    // 4️⃣ Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        message: "Email not verified",
        code: "EMAIL_NOT_VERIFIED",
      });
    }

    // 5️⃣ Compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // 6️⃣ Issue auth cookie / token
    issueAuthCookie(res, {
      id: user._id,
      role: user.role,
    });

    // 7️⃣ Respond
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
