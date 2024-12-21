/*
  Warnings:

  - Changed the type of `studentId` on the `allocation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `StudentId` on the `roomRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `studentId` on the `student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "roomRequest" DROP CONSTRAINT "roomRequest_StudentId_fkey";

-- AlterTable
ALTER TABLE "allocation" DROP COLUMN "studentId",
ADD COLUMN     "studentId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "roomRequest" DROP COLUMN "StudentId",
ADD COLUMN     "StudentId" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "studentId",
ADD COLUMN     "studentId" BIGINT NOT NULL,
ALTER COLUMN "profile" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "allocation_studentId_key" ON "allocation"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "roomRequest_StudentId_key" ON "roomRequest"("StudentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_studentId_key" ON "student"("studentId");

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomRequest" ADD CONSTRAINT "roomRequest_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "student"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
