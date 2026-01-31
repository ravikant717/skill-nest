import { generateStreamToken } from "../../config/stream.js";

export const getStreamToken = async (req, res) => {
  try {
    const token = await generateStreamToken(req.user.userId);

    if (!token) {
      return res.status(400).json({ message: "Failed to generate token" });
    }

    res.status(200).json({ token });
  } catch (err) {
    console.log("Stream token error:", err);
    res.status(500).json({ message: "Failed to generate token" });
  }
};
