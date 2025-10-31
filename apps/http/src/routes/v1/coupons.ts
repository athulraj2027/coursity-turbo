import express from "express";
const router = express.Router();
import couponsController from "../../controllers/v1/couponsController";
import { authenticate, authorize } from "../../middlewares/authMiddleware";

// teacher routes
router.post(
  "/",
  authenticate,
  authorize("TEACHER"),
  couponsController.createCoupon
);
router.get(
  "/my",
  authenticate,
  authorize("TEACHER"),
  couponsController.getMyCouponsForTeachers
);
router.get(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  couponsController.getCouponById
);
router.put(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  couponsController.editCouponById
);
router.delete(
  "/:id",
  authenticate,
  authorize("TEACHER"),
  couponsController.deleteCouponById
);

// student routes
router.post(
  "/apply",
  authenticate,
  authorize("STUDENT"),
  couponsController.applyCoupon
);

export default router;
