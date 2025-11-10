import express from "express";
import coursesController from "../../controllers/v1/coursesController";
import { authenticate, authorize } from "../../middlewares/authMiddleware";
const router = express.Router();

//Public routes

router.get("/", coursesController.getAllCourses);

router.get("/search", coursesController.searchCourse);

//Teacher routes

router.post(
  "/create",
  authenticate,
  authorize("TEACHER"),
  coursesController.createCourse
);
router.get(
  "/my",
  authenticate,
  authorize("TEACHER"),
  coursesController.getMyCoursesForTeachers
); // for teachers

//Student routes

router.post(
  "/enroll/:id",
  authenticate,
  authorize("STUDENT"),
  coursesController.enrollCourseById
);
router.get(
  "/enrolled",
  authenticate,
  authorize("STUDENT"),
  coursesController.getEnrolledCoursesForStudents
); // for students

router.get("/:id", coursesController.getCourseById);
router.delete(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  coursesController.deleteCourseById
);
router.put(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  coursesController.updateCourseById
);

export default router;
