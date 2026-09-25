-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "rating" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;
