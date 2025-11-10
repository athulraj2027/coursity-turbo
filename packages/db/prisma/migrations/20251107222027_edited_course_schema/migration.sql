/*
  Warnings:

  - You are about to drop the column `numberOfClasses` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `totalHours` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `Lecture` table. All the data in the column will be lost.
  - Added the required column `endingDate` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Lecture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Lecture` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LectureStatus" AS ENUM ('NOT_STARTED', 'STARTED', 'CANCELLED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "numberOfClasses",
DROP COLUMN "totalHours",
ADD COLUMN     "endingDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Lecture" DROP COLUMN "endTime",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "status" "LectureStatus" NOT NULL;
