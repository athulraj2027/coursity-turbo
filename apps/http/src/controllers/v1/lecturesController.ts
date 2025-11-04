import { Request, Response } from "express";
import prisma from "@repo/db/client";

// teacher routes

export const createLecture = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Check authentication
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Check role
    if (req.user.role !== "TEACHER") {
      return res
        .status(403)
        .json({ message: "Only teachers can create lectures" });
    }

    // 3️⃣ Extract body data
    const { courseId, title, startTime, endTime } = req.body;

    if (!courseId || !title || !startTime) {
      return res.status(400).json({
        message: "courseId, title, and startTime are required",
      });
    }

    // 4️⃣ Validate course ownership
    const course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.teacherId !== req.user.teacherProfileId) {
      return res
        .status(403)
        .json({ message: "You can only create lectures for your own courses" });
    }

    // 5️⃣ Create lecture
    const lecture = await prisma.lecture.create({
      data: {
        courseId,
        title,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
      },
    });

    // 6️⃣ Send response
    return res.status(201).json({
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    console.error("Error creating lecture:", error);
    return res.status(500).json({
      message: "Server error while creating lecture",
      error,
    });
  }
};

export const editLectureById = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Authentication check
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Role check
    if (req.user.role !== "TEACHER") {
      return res
        .status(403)
        .json({ message: "Only teachers can edit lectures" });
    }

    const { id } = req.params;
    const { title, startTime, endTime } = req.body;

    // 3️⃣ Validate lecture exists
    const lecture = await prisma.lecture.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // 4️⃣ Verify ownership — teacher can only edit their own course lectures
    if (lecture.course.teacherId !== req.user.teacherProfileId) {
      return res
        .status(403)
        .json({ message: "You can only edit your own course lectures" });
    }

    // 5️⃣ Update lecture
    const updatedLecture = await prisma.lecture.update({
      where: { id },
      data: {
        title: title ?? lecture.title,
        startTime: startTime ? new Date(startTime) : lecture.startTime,
        endTime: endTime ? new Date(endTime) : lecture.endTime,
      },
    });

    return res.status(200).json({
      message: "Lecture updated successfully",
      lecture: updatedLecture,
    });
  } catch (error) {
    console.error("Error editing lecture:", error);
    return res.status(500).json({
      message: "Server error while updating lecture",
      error,
    });
  }
};

export const deleteLectureById = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Authentication check
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Role check
    if (req.user.role !== "TEACHER") {
      return res
        .status(403)
        .json({ message: "Only teachers can delete lectures" });
    }

    const { id } = req.params;

    // 3️⃣ Check if lecture exists
    const lecture = await prisma.lecture.findUnique({
      where: { id },
      include: { course: true },
    });

    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // 4️⃣ Ownership check — can only delete lecture from their own course
    if (lecture.course.teacherId !== req.user.teacherProfileId) {
      return res
        .status(403)
        .json({ message: "You can only delete your own course lectures" });
    }

    // 5️⃣ Delete lecture
    await prisma.lecture.delete({ where: { id } });

    return res.status(200).json({
      message: "Lecture deleted successfully",
      lectureId: id,
    });
  } catch (error) {
    console.error("Error deleting lecture:", error);
    return res.status(500).json({
      message: "Server error while deleting lecture",
      error,
    });
  }
};

export const getMyLectures = async (req: Request, res: Response) => {
  try {
    const teacherCourses = await prisma.course.findMany({
      where: {
        teacherId: req.user!.teacherProfileId,
      },
      select: {
        id: true,
      },
    });

    if (teacherCourses.length === 0) {
      return res
        .status(200)
        .json({ message: "No courses found for this teacher", lectures: [] });
    }

    const courseIds = teacherCourses.map((c) => c.id);

    // 4️⃣ Fetch lectures belonging to those courses
    const lectures = await prisma.lecture.findMany({
      where: {
        courseId: { in: courseIds },
      },
      orderBy: {
        startTime: "desc",
      },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    // 5️⃣ Respond with all lectures
    return res.status(200).json({
      count: lectures.length,
      lectures,
    });
  } catch (error) {
    console.error("Error fetching teacher lectures:", error);
    return res.status(500).json({
      message: "Server error while fetching lectures",
      error,
    });
  }
};

export const getLectureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 1️⃣ Ensure user is logged in
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Ensure user is a teacher
    if (req.user.role !== "TEACHER") {
      return res
        .status(403)
        .json({ message: "Only teachers can access lecture details" });
    }

    // 3️⃣ Find the lecture and ensure it belongs to this teacher
    const lecture = await prisma.lecture.findUnique({
      where: { id },
      include: {
        course: {
          include: {
            teacher: {
              include: { user: true },
            },
          },
        },
        participants: {
          include: {
            user: {
              select: { id: true, username: true, email: true },
            },
          },
        },
      },
    });

    // 4️⃣ Handle if lecture doesn’t exist
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    // 5️⃣ Check if this lecture belongs to the authenticated teacher
    if (lecture.course.teacher.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to view this lecture" });
    }

    // 6️⃣ Success — return lecture details
    return res.status(200).json({
      message: "Lecture fetched successfully",
      lecture,
    });
  } catch (error) {
    console.error("Error fetching lecture by ID:", error);
    return res.status(500).json({
      message: "Server error while fetching lecture details",
      error,
    });
  }
};

//student routes

export const getUpcomingLectures = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Check authentication
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Ensure user is a student
    if (req.user.role !== "STUDENT") {
      return res
        .status(403)
        .json({ message: "Only students can access upcoming lectures" });
    }

    // 3️⃣ Find student's profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!studentProfile) {
      return res.status(404).json({ message: "Student profile not found" });
    }

    // 4️⃣ Get all active enrollments for this student
    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: studentProfile.id,
        status: "ACTIVE",
      },
      select: {
        courseId: true,
      },
    });

    const enrolledCourseIds = enrollments.map((e) => e.courseId);

    if (enrolledCourseIds.length === 0) {
      return res
        .status(200)
        .json({ message: "No active enrollments", lectures: [] });
    }

    // 5️⃣ Find upcoming lectures
    const now = new Date();
    const upcomingLectures = await prisma.lecture.findMany({
      where: {
        courseId: { in: enrolledCourseIds },
        startTime: { gt: now },
      },
      orderBy: { startTime: "asc" },
      include: {
        course: {
          select: {
            id: true,
            name: true,
            teacher: {
              include: {
                user: {
                  select: { username: true, email: true },
                },
              },
            },
          },
        },
      },
    });

    // 6️⃣ Return response
    return res.status(200).json({
      message: "Upcoming lectures fetched successfully",
      count: upcomingLectures.length,
      lectures: upcomingLectures,
    });
  } catch (error) {
    console.error("Error fetching upcoming lectures:", error);
    return res.status(500).json({
      message: "Server error while fetching upcoming lectures",
      error,
    });
  }
};

export default {
  createLecture,
  editLectureById,
  deleteLectureById,
  getMyLectures,
  getLectureById,
  getUpcomingLectures,
};
