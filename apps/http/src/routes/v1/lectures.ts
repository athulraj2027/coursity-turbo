import express from "express";
const router = express.Router();
import lecturesController from "../../controllers/v1/lecturesController";
import { authenticate, authorize } from "../../middlewares/authMiddleware";

router.get(
  "/upcoming",
  authenticate,
  authorize("STUDENT"),
  lecturesController.getUpcomingLectures
);

router.get(
  "/my",
  authenticate,
  authorize("TEACHER"),
  lecturesController.getMyLectures
);

// teacher routes

router.post(
  "/",
  authenticate,
  authorize("TEACHER"),
  lecturesController.createLecture
);
router.put(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  lecturesController.editLectureById
);
router.delete(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  lecturesController.deleteLectureById
);

router.patch(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  lecturesController.createMeetingId
);

// student routes

router.get("/:id", authenticate, lecturesController.getLectureById);

export default router;
