/*
  Warnings:

  - You are about to drop the column `email` on the `contactUs` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `contactUs` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `contactUs` table. All the data in the column will be lost.
  - Added the required column `complaint_category` to the `contactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `contactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `contactUs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_number` to the `contactUs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contactUs" DROP COLUMN "email",
DROP COLUMN "message",
DROP COLUMN "name",
ADD COLUMN     "complaint_category" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "full_name" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "room_number" INTEGER NOT NULL;
