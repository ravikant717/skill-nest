import User from "../../models/user.js";
import { hashPassword } from "../../utils/hash.js";
import { signToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mailer.js";
import { env } from "../../config/env.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password: await hashPassword(password),
      passwordSet: true,
      emailVerified: false,
    });

    const token = signToken({ id: user._id }, "15m");

    await sendEmail({
      to: email,
      subject: "Verify your email",
      template: "verifyEmail.html",
      variables: {
        link: `${env.CLIENT_URL}/verify-email/callback?token=${token}`,
      },
    });

    return res.status(201).json({
      message: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
