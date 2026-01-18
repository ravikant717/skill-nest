import User from "../../models/user.js";
import { hashPassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mailer.js";
import { env } from "../../config/env.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["student", "educator"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // 2️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 3️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      role,
      isVerified: false,
    });

    // 4️⃣ Create verification token
    const token = signToken(
      { id: user._id, email: user.email },
      "15m"
    );

    // 5️⃣ Send verification email
    await sendEmail({
      to: email,
      subject: "Verify your email",
      template: "verifyEmail.html",
      variables: {
        link: `${env.CLIENT_URL}/verify-email?token=${token}`,
      },
    });

    // 6️⃣ Response
    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
