import express from "express"; 
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/auth/stream.controller.js";

const router = express.Router(); 

router.get("/token", authMiddleware, getStreamToken); 

export default router; 