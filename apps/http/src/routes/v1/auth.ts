import express from "express";
import authController from "../../controllers/v1/authController";
const router = express.Router();

router.post("/send-otp", authController.sendOtp);
// router.post("/verify-otp")

export default router;
