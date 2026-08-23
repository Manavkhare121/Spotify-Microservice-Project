import express from "express";
import { register,googleAuthCallback,login} from "../controller/auth.controller.js";
import { loginUserValidationRules, registerUserValidationRules } from "../middlewares/validation.middlware.js";
import passport from "passport";
const router = express.Router();
router.post("/register", registerUserValidationRules, register);

router.post("/login",loginUserValidationRules,login)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),googleAuthCallback
);
export default router;
