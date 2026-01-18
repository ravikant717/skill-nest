import cors from "cors";
import { env } from "./env.js";

export const corsConfig = cors({
  origin: env.CLIENT_URL,   
  credentials: true,       
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
});
