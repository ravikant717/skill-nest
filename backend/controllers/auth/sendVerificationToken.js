import User from "../../models/user.js";
import { signToken } from "../../utils/jwt.js";
import { sendEmail } from "../../utils/mailer.js";
import { env } from "../../config/env.js";

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      // 🔐 Do NOT reveal whether user exists
      return res.status(200).json({
        message: "If the email exists, a verification link was sent",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        message: "Email already verified",
      });
    }

    const token = signToken({ id: user._id }, "15m");

    await sendEmail({
      to: email,
      subject: "Verify your email",
      template: "verifyEmail.html",
      variables: {
        link: `${env.CLIENT_URL}/verify-email/callback?token=${token}`,
      },
    });

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (err) {
    console.error("RESEND VERIFICATION ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
