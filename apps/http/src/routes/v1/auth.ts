import express from "express";
import authController from "../../controllers/v1/authController";
const router = express.Router();

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/login", authController.login);

export default router;
