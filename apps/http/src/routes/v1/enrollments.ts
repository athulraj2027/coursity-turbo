import express from "express";
import { authenticate, authorize } from "../../middlewares/authMiddleware";
import enrollmentController from "../../controllers/v1/enrollmentController";
const router = express.Router();

router.post(
  "/verify",
  authenticate,
  authorize("STUDENT", "TEACHER"),
  enrollmentController.verifyEnrollmentForClass
);

export default router;
