-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `openId` VARCHAR(191) NULL,
    `unionId` VARCHAR(191) NULL,
    `appleId` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `gender` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NULL,
    `address` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_openId_key`(`openId`),
    UNIQUE INDEX `User_unionId_key`(`unionId`),
    UNIQUE INDEX `User_appleId_key`(`appleId`),
    UNIQUE INDEX `User_googleId_key`(`googleId`),
    INDEX `User_phone_idx`(`phone`),
    INDEX `User_email_idx`(`email`),
    INDEX `User_openId_idx`(`openId`),
    INDEX `User_unionId_idx`(`unionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParseImgHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `openId` VARCHAR(191) NULL,
    `unionId` VARCHAR(191) NULL,
    `appleId` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastLoginAt` DATETIME(3) NULL,
    `gender` VARCHAR(191) NULL,
    `birthday` DATETIME(3) NULL,
    `address` VARCHAR(191) NULL,

    UNIQUE INDEX `ParseImgHistory_username_key`(`username`),
    UNIQUE INDEX `ParseImgHistory_phone_key`(`phone`),
    UNIQUE INDEX `ParseImgHistory_email_key`(`email`),
    UNIQUE INDEX `ParseImgHistory_openId_key`(`openId`),
    UNIQUE INDEX `ParseImgHistory_unionId_key`(`unionId`),
    UNIQUE INDEX `ParseImgHistory_appleId_key`(`appleId`),
    UNIQUE INDEX `ParseImgHistory_googleId_key`(`googleId`),
    INDEX `ParseImgHistory_phone_idx`(`phone`),
    INDEX `ParseImgHistory_email_idx`(`email`),
    INDEX `ParseImgHistory_openId_idx`(`openId`),
    INDEX `ParseImgHistory_unionId_idx`(`unionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImageRecord` (
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

    INDEX `ImageRecord_shotAt_idx`(`shotAt`),
    INDEX `ImageRecord_latitude_longitude_idx`(`latitude`, `longitude`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
