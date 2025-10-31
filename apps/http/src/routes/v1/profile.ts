import express from "express";
const router = express.Router();
import profileController from "../../controllers/v1/profileController";
import { authenticate, authorize } from "../../middlewares/authMiddleware";

router.put(
  "/:id",
  authenticate,
  authorize("TEACHER", "STUDENT"),
  profileController.putProfileById
);

router.patch(
  "/:id",
  authenticate,
  authorize("TEACHER", "STUDENT"),
  profileController.patchProfileById
);
router.get(
  "/:id",
  authenticate,
  authorize("TEACHER", "STUDENT"),
  profileController.getProfileById
);

export default router;
