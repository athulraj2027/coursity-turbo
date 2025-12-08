import { Request, Response } from "express";
import prisma from "@repo/db/client";

const verifyEnrollmentForClass = async (req: Request, res: Response) => {
  try {
    const meetingId = req.query.meetingId as string;
    const { id, role, name } = req.user;

    const lecture = await prisma.lecture.findUnique({
      where: { meetingId },
      include: {
        course: {
          include: {
            teacher: true,
          },
        },
      },
    });

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found",
      });
    }

    const courseId = lecture.courseId;

    if (role === "STUDENT") {
      const enrollment = await prisma.enrollment.findFirst({
        where: {
          courseId: courseId,
          studentId: id,
        },
      });

      if (!enrollment) {
        return res.status(403).json({
          success: false,
          message: "You are not enrolled in this course",
        });
      }

      const attendance = await prisma.attendance.upsert({
        where: {
          lectureId_studentId: {
            lectureId: lecture.id,
            studentId: id,
          },
        },
        create: {
          lectureId: lecture.id,
          studentId: id,
          status: "PRESENT",
          joinTime: new Date(),
        },
        update: {
          joinTime: null,
        },
      });

      return res.json({
        success: true,
        role: "STUDENT",
        access: true,
        attendanceStarted: true,
        attendanceId: attendance.id,
        message: "Student verified & attendance started",
        user: {
          id,
          name,
        },
      });
    }

    if (role === "TEACHER") {
      if (lecture.course.teacher.userId !== id) {
        return res.status(403).json({
          success: false,
          message: "You are not the teacher of this lecture",
        });
      }

      if (lecture.status === "NOT_STARTED") {
        await prisma.lecture.update({
          where: { id: lecture.id },
          data: { status: "STARTED" },
        });
      }
      return res.json({
        success: true,
        role: "TEACHER",
        access: true,
        message: "Teacher verified",
        user: {
          id,
          name,
        },
      });
    }

    // can add for admin, to join
  } catch (error) {
    console.error("Verify enrollment error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error verifying enrollments",
    });
  }
};

export default { verifyEnrollmentForClass };
