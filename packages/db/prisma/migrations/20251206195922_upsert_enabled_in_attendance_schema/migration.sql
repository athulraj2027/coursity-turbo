/*
  Warnings:

  - A unique constraint covering the columns `[lectureId,studentId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Attendance_lectureId_studentId_key" ON "Attendance"("lectureId", "studentId");
