import express from "express";
const router = express.Router();
import profileController from "../../controllers/v1/profileController";
import { authenticate, authorize } from "../../middlewares/authMiddleware";

router.put("/:id", authenticate, profileController.putProfileById);
router.patch("/:id", authenticate, profileController.patchProfileById);
router.get("/:id", authenticate, profileController.getProfileById);

export default router;
