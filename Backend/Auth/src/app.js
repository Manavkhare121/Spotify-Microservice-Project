import express from "express";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import config from "./config/config.js"
const app=express();

app.use(morgan('dev'));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieparser());
app.use(passport.initialize());
passport.use(new GoogleStrategy({
  clientID:config.CLIENT_ID,
  clientSecret:config.CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically find or create a user in your database
  // For this example, we'll just return the profile
  return done(null, profile);
}));

app.use('/api/auth',authRoutes);

export default app;