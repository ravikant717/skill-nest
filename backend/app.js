import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js";
import auth from "./routes/auth.js";
import { corsConfig } from "./config/cors.js";
import streamRoutes from "./routes/stream.routes.js";

const app = express();

app.use(corsConfig);
app.options("*", corsConfig);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", auth);
app.use("/api/live", streamRoutes);

export default app;
