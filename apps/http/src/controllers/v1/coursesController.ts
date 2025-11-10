import { Request, Response } from "express";
import prisma from "@repo/db/client";

// public routes

const getAllCourses = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;
    const [courses, totalCourses] = await Promise.all([
      prisma.course.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          teacher: {
            include: {
              user: {
                select: { id: true, username: true, email: true },
              },
            },
          },
        },
      }),
      prisma.course.count(),
    ]);

    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      data: courses,
      pagination: {
        totalCourses,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      message: "Failed to fetch courses",
    });
  }
};

const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        message: "Course ID is required",
      });

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          include: {
            user: {
              select: { id: true, username: true, email: true },
            },
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch course details",
      error,
    });
  }
};

const searchCourse = async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "";
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    if (!query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a search query",
      });
    }

    const [courses, totalCourses] = await Promise.all([
      prisma.course.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          teacher: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      prisma.course.count({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      }),
    ]);

    const totalPages = Math.ceil(totalCourses / limit);

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        totalCourses,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Error searching courses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search courses",
      error,
    });
  }
};

// teacher routes
const createCourse = async (req: Request, res: Response) => {
  try {
    const { name, description, price, date } = req.body;

    const { id, role } = req.user!;
    console.log("req.user : ", req.user);
    if (!name || !description || !price || !date) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // maybe we need to remove this
    if (role !== "TEACHER") {
      return res.status(403).json({
        success: false,
        message: "Only teachers can create courses",
      });
    }

    const existingCourse = await prisma.course.findUnique({
      where: { name },
    });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course with this name already exists",
      });
    }

    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: id },
    });

    if (!teacherProfile)
      return res.status(409).json({
        success: false,
        message: "User is not a teacher",
      });
    const course = await prisma.course.create({
      data: {
        name,
        description,
        price: Number(price),
        startDate: new Date(date),
        teacherId: teacherProfile.id,
      },
      include: {
        teacher: {
          include: {
            user: { select: { id: true, username: true, email: true } },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error,
    });
  }
};

const updateCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, startDate, numberOfClasses, totalHours } =
      req.body;

    // Validate course ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          include: { user: true },
        },
      },
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = req.user;
    if (user?.role !== "ADMIN" && user?.teacherProfileId !== course.teacherId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this course",
      });
    }

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        name: name ?? course.name,
        description: description ?? course.description,
        price: price !== undefined ? Number(price) : course.price,
        startDate: startDate ? new Date(startDate) : course.startDate,
      },
      include: {
        teacher: {
          include: {
            user: { select: { id: true, username: true, email: true } },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update course",
      error,
    });
  }
};

const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Only teachers can delete their own courses, unless admin
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      req.user?.role === "TEACHER" &&
      course.teacherId !== req.user.teacherProfileId
    ) {
      return res
        .status(403)
        .json({ message: "You can only delete your own courses" });
    }

    await prisma.course.delete({ where: { id } });
    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getMyCoursesForTeachers = async (req: Request, res: Response) => {
  try {
    const { id } = req.user;
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    // 4️⃣ Get teacher's profile ID (from token or DB)
    const teacherProfile = await prisma.teacherProfile.findUnique({
      where: { userId: id },
    });
    if (!teacherProfile)
      return res.status(400).json({ message: "Teacher profile not found" });

    console.log(teacherProfile);
    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where: { teacherId: teacherProfile.id },
        skip,
        take: limit,
        include: {
          _count: { select: { enrollments: true, lectures: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.course.count({ where: { teacherId: teacherProfile.id } }),
    ]);

    // 6️⃣ Send response
    return res.status(200).json({
      total,
      page,
      limit,
      courses,
    });
  } catch (error) {
    console.error("Error fetching teacher courses:", error);
    return res.status(500).json({
      message: "Server error while fetching courses",
      error,
    });
  }
};

//student routes
export const enrollCourseById = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Ensure the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Ensure the user is a student
    if (req.user.role !== "STUDENT") {
      return res
        .status(403)
        .json({ message: "Only students can enroll in courses" });
    }

    const { id: courseId } = req.params;

    // 3️⃣ Ensure the course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { teacher: true },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 4️⃣ Get student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!studentProfile) {
      return res.status(400).json({ message: "Student profile not found" });
    }

    // 5️⃣ Check if already enrolled
    const existingEnrollment = await prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId: studentProfile.id,
      },
    });

    if (existingEnrollment) {
      return res
        .status(400)
        .json({ message: "Already enrolled in this course" });
    }

    // 6️⃣ Create the enrollment record
    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: studentProfile.id,
        courseId,
        status: "ACTIVE",
      },
    });

    return res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return res.status(500).json({
      message: "Server error during enrollment",
      error,
    });
  }
};

export const getEnrolledCoursesForStudents = async (
  req: Request,
  res: Response
) => {
  try {
    // 1️⃣ Authentication check
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // 2️⃣ Role check
    if (req.user.role !== "STUDENT") {
      return res
        .status(403)
        .json({ message: "Only students can view enrolled courses" });
    }

    // 3️⃣ Get student profile
    const studentProfile = await prisma.studentProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!studentProfile) {
      return res.status(400).json({ message: "Student profile not found" });
    }

    // 4️⃣ Pagination support
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const skip = (page - 1) * limit;

    // 5️⃣ Fetch enrolled courses with course + teacher info
    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where: { studentId: studentProfile.id },
        skip,
        take: limit,
        include: {
          course: {
            include: {
              teacher: {
                include: {
                  user: {
                    select: { username: true, email: true },
                  },
                },
              },
              _count: { select: { lectures: true, enrollments: true } },
            },
          },
        },
        orderBy: { enrolledAt: "desc" },
      }),
      prisma.enrollment.count({ where: { studentId: studentProfile.id } }),
    ]);

    // 6️⃣ Response formatting
    const formattedCourses = enrollments.map((enrollment) => ({
      enrollmentId: enrollment.id,
      status: enrollment.status,
      enrolledAt: enrollment.enrolledAt,
      course: {
        id: enrollment.course.id,
        name: enrollment.course.name,
        description: enrollment.course.description,
        price: enrollment.course.price,
        numberOfClasses: enrollment.course.numberOfClasses,
        totalHours: enrollment.course.totalHours,
        lecturesCount: enrollment.course._count.lectures,
        enrollmentsCount: enrollment.course._count.enrollments,
        teacher: {
          name: enrollment.course.teacher.user.username,
          email: enrollment.course.teacher.user.email,
        },
      },
    }));

    return res.status(200).json({
      total,
      page,
      limit,
      courses: formattedCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return res.status(500).json({
      message: "Server error while fetching enrolled courses",
      error,
    });
  }
};

export default {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourseById,
  deleteCourseById,
  getMyCoursesForTeachers,
  getEnrolledCoursesForStudents,
  enrollCourseById,
  searchCourse,
};
