/*
  Warnings:

  - Added the required column `thumbUrl` to the `image_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `image_record` ADD COLUMN `thumbUrl` VARCHAR(191) NOT NULL;
