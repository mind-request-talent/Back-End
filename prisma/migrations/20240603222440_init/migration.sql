-- CreateTable
CREATE TABLE `Vacancy` (
    `id` VARCHAR(191) NOT NULL,
    `vacancy_name` VARCHAR(191) NOT NULL,
    `main_tech` VARCHAR(191) NOT NULL,
    `experience_required_for_main_tech` INTEGER NOT NULL,
    `second_tech` VARCHAR(191) NOT NULL,
    `experience_required_for_second_tech` INTEGER NOT NULL,
    `experience_level` ENUM('JR', 'MID', 'SR') NOT NULL,
    `vacancy_status` ENUM('AVAILABLE', 'TAKEN', 'IN_PROCESS') NOT NULL,
    `sale_rate` INTEGER NOT NULL,
    `client_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vacancy_client_id_key`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacancy` ADD CONSTRAINT `Vacancy_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
