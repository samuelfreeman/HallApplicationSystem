/*
  Warnings:

  - You are about to alter the column `studentId` on the `allocation` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `StudentId` on the `roomRequest` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `studentId` on the `student` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "roomRequest" DROP CONSTRAINT "roomRequest_StudentId_fkey";

-- AlterTable
ALTER TABLE "allocation" ALTER COLUMN "studentId" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "roomRequest" ALTER COLUMN "StudentId" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "studentId" SET DATA TYPE INTEGER;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomRequest" ADD CONSTRAINT "roomRequest_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "student"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
