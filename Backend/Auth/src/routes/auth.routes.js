import express from "express";
import { register,googleAuthCallback} from "../controller/auth.controller.js";
import { registerUserValidationRules } from "../middlewares/validation.middlware.js";
import passport from "passport";
const router = express.Router();
router.post("/register", registerUserValidationRules, register);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),googleAuthCallback
);
export default router;
