import express from "express";
const router = express.Router();
import lecturesController from "../../controllers/v1/lecturesController";
import { authenticate, authorize } from "../../middlewares/authMiddleware";
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
router.get(
  "/my",
  authenticate,
  authorize("TEACHER"),
  lecturesController.getMyLectures
);

// student routes

router.get(
  "/:id",
  authenticate,
  authorize("TEACHER", "STUDENT"),
  lecturesController.getLectureById
);
router.get(
  "/upcoming",
  authenticate,
  authorize("STUDENT"),
  lecturesController.getUpcomingLectures
);

export default router;
