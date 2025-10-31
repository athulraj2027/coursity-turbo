import express from "express";
import authRoutes from "./auth";
import courseRouter from "./courses";
import lecturesRouter from "./lectures";
import couponsRouter from "./coupons";
import profileRouter from "./profile";
import adminRouter from "./admin/index";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/courses", courseRouter);
router.use("/lectures", lecturesRouter);
router.use("/coupons", couponsRouter);
router.use("/profile", profileRouter);
router.use("/admin", adminRouter);
export default router;
