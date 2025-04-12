-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "max_occupants" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "total_occupants" INTEGER NOT NULL DEFAULT 0;
