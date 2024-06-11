-- CreateTable
CREATE TABLE `Product` (
    `id` CHAR(20) NOT NULL,
    `name` VARCHAR(225) NOT NULL,
    `price` INTEGER NOT NULL,
    `image` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
