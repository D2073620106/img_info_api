/*
  Warnings:

  - You are about to drop the `imagerecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `imagerecord`;

-- CreateTable
CREATE TABLE `image_record` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imageUrl` VARCHAR(191) NOT NULL,
    `shotAt` DATETIME(3) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NULL,
    `userId` INTEGER NULL,
    `result` JSON NULL,

    INDEX `image_record_shotAt_idx`(`shotAt`),
    INDEX `image_record_latitude_longitude_idx`(`latitude`, `longitude`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_appleId_key` TO `user_appleId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_idx` TO `user_email_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_googleId_key` TO `user_googleId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_openId_idx` TO `user_openId_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_openId_key` TO `user_openId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_phone_idx` TO `user_phone_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_phone_key` TO `user_phone_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_unionId_idx` TO `user_unionId_idx`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_unionId_key` TO `user_unionId_key`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_username_key` TO `user_username_key`;
