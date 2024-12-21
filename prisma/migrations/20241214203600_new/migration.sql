-- DropForeignKey
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_studentId_fkey";

-- DropForeignKey
ALTER TABLE "roomRequest" DROP CONSTRAINT "roomRequest_StudentId_fkey";

-- AlterTable
ALTER TABLE "allocation" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "roomRequest" ALTER COLUMN "StudentId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "studentId" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roomRequest" ADD CONSTRAINT "roomRequest_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "student"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
