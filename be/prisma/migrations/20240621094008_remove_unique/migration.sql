/*
  Warnings:

  - You are about to drop the column `blogid` on the `comment` table. All the data in the column will be lost.
  - Added the required column `blogId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_blogid_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `blogid`,
    ADD COLUMN `blogId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
