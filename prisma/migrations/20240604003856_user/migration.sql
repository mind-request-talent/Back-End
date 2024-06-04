/*
  Warnings:

  - Added the required column `role` to the `Vacancy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `vacancy` ADD COLUMN `role` ENUM('PO', 'SM', 'TL', 'Dev', 'QA', 'DevOps', 'UIUX') NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `permissions` ENUM('DELIVERY', 'RECRUITMENT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
