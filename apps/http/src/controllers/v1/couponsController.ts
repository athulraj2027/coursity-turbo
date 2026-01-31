import { Request, Response } from "express";
import prisma from "@repo/db/client";

export const createCoupon = async (req: Request, res: Response) => {
  try {
    const {
      code,
      description,
      discountType,
      discountValue,
      maxUses,
      expiresAt,
      courseId,
    } = req.body;

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (!userId || !["ADMIN", "TEACHER"].includes(userRole)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!code || !discountType || !discountValue) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await prisma.coupon.findUnique({ where: { code } });
    if (existing) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code,
        description,
        discountType,
        discountValue: Number(discountValue),
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt,
        courseId: courseId || null,
        createdById: userId,
      },
    });

    return res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    console.error("❌ Error creating coupon:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const getCouponById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
        redemptions: {
          select: {
            id: true,
            userId: true,
            redeemedAt: true,
          },
        },
      },
    });

    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    return res.status(200).json({
      message: "Coupon fetched successfully",
      coupon,
    });
  } catch (error) {
    console.error("❌ Error fetching coupon:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const editCouponById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      description,
      discountType,
      discountValue,
      maxUses,
      expiresAt,
      courseId,
      isActive,
    } = req.body;

    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (existingCoupon.createdById !== userId && userRole !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this coupon" });
    }

    const updateData: any = {};

    if (description !== undefined) updateData.description = description;
    if (discountType !== undefined) updateData.discountType = discountType;
    if (discountValue !== undefined)
      updateData.discountValue = Number(discountValue);
    if (maxUses !== undefined) updateData.maxUses = Number(maxUses);
    if (expiresAt !== undefined)
      updateData.expiresAt = expiresAt ? new Date(expiresAt) : null;
    if (courseId !== undefined) updateData.courseId = courseId || null;
    if (isActive !== undefined) updateData.isActive = Boolean(isActive);

    // ✅ Update in DB
    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      message: "Coupon updated successfully",
      coupon: updatedCoupon,
    });
  } catch (error) {
    console.error("❌ Error updating coupon:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const deleteCouponById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (!id) {
      return res.status(400).json({ message: "Coupon ID is required" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingCoupon = await prisma.coupon.findUnique({
      where: { id },
    });

    if (!existingCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    if (existingCoupon.createdById !== userId && userRole !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this coupon" });
    }

    const deletedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    return res.status(200).json({
      message: "Coupon deleted successfully",
      coupon: deletedCoupon,
    });
  } catch (error) {
    console.error("❌ Error deleting coupon:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const getMyCouponsForTeachers = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (userRole !== "TEACHER" && userRole !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const {
      page = "1",
      limit = "10",
      active,
      search = "",
    } = req.query as Record<string, string>;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const whereClause: any = {
      createdById: userId,
      deletedAt: null,
    };

    if (active === "true") whereClause.isActive = true;
    if (active === "false") whereClause.isActive = false;
    if (search) {
      whereClause.OR = [
        { code: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [coupons, totalCount] = await Promise.all([
      prisma.coupon.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.coupon.count({ where: whereClause }),
    ]);

    return res.status(200).json({
      total: totalCount,
      page: parseInt(page),
      limit: parseInt(limit),
      coupons,
    });
  } catch (error) {
    console.error("❌ Error fetching teacher coupons:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const applyCoupon = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { code, courseId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!code || !courseId) {
      return res
        .status(400)
        .json({ message: "Coupon code and courseId are required" });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code },
    });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    const now = new Date();
    if (!coupon.isActive || coupon.expiresAt < now) {
      return res.status(400).json({ message: "Coupon expired or inactive" });
    }

    if (coupon.courseId && coupon.courseId !== courseId) {
      return res
        .status(400)
        .json({ message: "Coupon not valid for this course" });
    }

    const alreadyRedeemed = await prisma.couponRedemption.findFirst({
      where: {
        userId,
        couponId: coupon.id,
      },
    });

    if (alreadyRedeemed) {
      return res
        .status(400)
        .json({ message: "You have already used this coupon" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let finalPrice = course.price;

    if (coupon.discountType === "PERCENTAGE") {
      finalPrice = course.price - (course.price * coupon.discountValue) / 100;
    } else if (coupon.discountType === "FIXED") {
      finalPrice = Math.max(0, course.price - coupon.discountValue);
    }

    await prisma.couponRedemption.create({
      data: {
        userId,
        courseId,
        couponId: coupon.id,
      },
    });

    return res.status(200).json({
      message: "Coupon applied successfully",
      originalPrice: course.price,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      finalPrice,
    });
  } catch (error) {
    console.error("❌ Error applying coupon:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export default {
  applyCoupon,
  getCouponById,
  getMyCouponsForTeachers,
  editCouponById,
  deleteCouponById,
  createCoupon,
};
