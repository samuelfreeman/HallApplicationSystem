/*
  Warnings:

  - You are about to drop the column `roomsId` on the `allocation` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `allocation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "allocation" DROP CONSTRAINT "allocation_roomsId_fkey";

-- AlterTable
ALTER TABLE "allocation" DROP COLUMN "roomsId",
ADD COLUMN     "roomId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "allocation" ADD CONSTRAINT "allocation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
