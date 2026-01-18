import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js";

import { corsConfig } from "./config/cors.js";

const app = express();

app.use(corsConfig);
app.options("*", corsConfig);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
export default app;
