import express from "express"
import { register } from "../controller/auth.controller.js";
import { registerUserValidationRules } from "../middlewares/validation.middlware.js";
const router=express.Router();
router.post('/register',registerUserValidationRules,register);
export default router;