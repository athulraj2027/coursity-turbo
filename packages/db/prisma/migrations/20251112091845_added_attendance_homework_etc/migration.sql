-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'SUBMITTED', 'GRADED', 'LATE');

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "noOfClassesAttended" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL,
    "lectureId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "status" "AttendanceStatus" NOT NULL DEFAULT 'PRESENT',
    "joinTime" TIMESTAMP(3),
    "leaveTime" TIMESTAMP(3),
    "durationMinutes" INTEGER,
    "markedBy" TEXT,
    "markedAt" TIMESTAMP(3),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Homework" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homework_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HomeworkSubmission" (
    "id" TEXT NOT NULL,
    "homeworkId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3),
    "fileUrl" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "marks" INTEGER,
    "feedback" TEXT,
    "gradedAt" TIMESTAMP(3),

    CONSTRAINT "HomeworkSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentReport" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "totalLectures" INTEGER NOT NULL DEFAULT 0,
    "attendedLectures" INTEGER NOT NULL DEFAULT 0,
    "attendanceRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avgHomeworkScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherReport" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "totalCourses" INTEGER NOT NULL DEFAULT 0,
    "totalLectures" INTEGER NOT NULL DEFAULT 0,
    "totalStudents" INTEGER NOT NULL DEFAULT 0,
    "avgAttendanceRate" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "avgHomeworkScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_lectureId_fkey" FOREIGN KEY ("lectureId") REFERENCES "Lecture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Homework" ADD CONSTRAINT "Homework_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeworkSubmission" ADD CONSTRAINT "HomeworkSubmission_homeworkId_fkey" FOREIGN KEY ("homeworkId") REFERENCES "Homework"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HomeworkSubmission" ADD CONSTRAINT "HomeworkSubmission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentReport" ADD CONSTRAINT "StudentReport_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentReport" ADD CONSTRAINT "StudentReport_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherReport" ADD CONSTRAINT "TeacherReport_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "TeacherProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
