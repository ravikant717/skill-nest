import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import User from "../models/user.js";
import { env } from "./env.js";

/**
 * Google OAuth Strategy
 * - Used ONLY to verify identity
 * - We DO NOT store Google tokens
 * - We issue our own JWT after this
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        const name = profile.displayName;

        if (!email) {
          return done(new Error("Google account has no email"), null);
        }

        let user = await User.findOne({ email });

        // First-time OAuth user
        if (!user) {
          user = await User.create({
            name,
            email,
            authProvider: "google",
            emailVerified: true,   // Google already verified email
            passwordSet: false,    // force password setup
          });
        }

        // Existing user (OAuth or linked)
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
