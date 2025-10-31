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
    const { name, description, price, startDate, numberOfClasses, totalHours } =
      req.body;

    if (!name || !description || !price || !startDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const teacherId = req.user.teacherProfileId;

    if (!teacherId) {
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

    const course = await prisma.course.create({
      data: {
        name,
        description,
        price: Number(price),
        startDate: new Date(startDate),
        numberOfClasses: Number(numberOfClasses) || 0,
        totalHours: Number(totalHours) || 0,
        teacherId,
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
        numberOfClasses:
          numberOfClasses !== undefined
            ? Number(numberOfClasses)
            : course.numberOfClasses,
        totalHours:
          totalHours !== undefined ? Number(totalHours) : course.totalHours,
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
      error:,
    });
  }
  
};

const deleteCourseById = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const getMyCoursesForTeachers = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

//student routes
const enrollCourseById = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
};

const getEnrolledCoursesForStudents = async (req: Request, res: Response) => {
  try {
  } catch (error) {}
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
