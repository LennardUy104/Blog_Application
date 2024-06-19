/*
  Warnings:

  - You are about to drop the column `author` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `comment` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `Blog_author_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_author_fkey`;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `author`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `author`,
    ADD COLUMN `authorId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
