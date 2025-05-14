-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_studentId_fkey";

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("studentId") ON DELETE SET NULL ON UPDATE CASCADE;
