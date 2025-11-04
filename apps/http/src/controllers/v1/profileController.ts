import { Request, Response } from "express";
import prisma from "@repo/db/client";

export const putProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, bio, expertise, experience } = req.body;
    const userId = (req as any).user?.id;

    if (userId !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Update user base info
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        teacherProfile: {
          upsert: {
            create: { bio, expertise, experience },
            update: { bio, expertise, experience },
          },
        },
      },
      include: { teacherProfile: true },
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const patchProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = (req as any).user?.id;

    if (userId !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Separate base user fields and teacher profile fields
    const { username, bio, expertise, experience } = updates;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(username && { username }),
        teacherProfile: {
          update: {
            ...(bio && { bio }),
            ...(expertise && { expertise }),
            ...(experience && { experience }),
          },
        },
      },
      include: { teacherProfile: true },
    });

    res.status(200).json({
      message: "Profile partially updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error patching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const userRole = (req as any).user?.role;

    // Allow self-access or admin access
    if (userId !== id && userRole !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        studentProfile: true,
        teacherProfile: true,
        adminProfile: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { putProfileById, patchProfileById, getProfileById };
