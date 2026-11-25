CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'TEACHER') NOT NULL DEFAULT 'TEACHER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Student` (
    `studentNumber` VARCHAR(191) NOT NULL,
    `icNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `studentPhone` VARCHAR(191) NULL,
    `kursusId` INTEGER NOT NULL,
    `cohort` INTEGER NOT NULL,
    `programType` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `parentName` VARCHAR(191) NOT NULL,
    `parentPhone` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Student_icNumber_key`(`icNumber`),
    PRIMARY KEY (`studentNumber`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `Kursus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Kursus_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `OffenceType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `OffenceType_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `DisciplinaryRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` VARCHAR(191) NOT NULL,
    `offenceTypeId` INTEGER NOT NULL,
    `teacherId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `warningLetterId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `WarningLetter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` VARCHAR(191) NOT NULL,
    `warningTier` INTEGER NOT NULL,
    `issuedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Student` ADD CONSTRAINT `Student_kursusId_fkey` FOREIGN KEY (`kursusId`) REFERENCES `Kursus`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `DisciplinaryRecord` ADD CONSTRAINT `DisciplinaryRecord_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`studentNumber`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `DisciplinaryRecord` ADD CONSTRAINT `DisciplinaryRecord_offenceTypeId_fkey` FOREIGN KEY (`offenceTypeId`) REFERENCES `OffenceType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `DisciplinaryRecord` ADD CONSTRAINT `DisciplinaryRecord_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `DisciplinaryRecord` ADD CONSTRAINT `DisciplinaryRecord_warningLetterId_fkey` FOREIGN KEY (`warningLetterId`) REFERENCES `WarningLetter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `WarningLetter` ADD CONSTRAINT `WarningLetter_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`studentNumber`) ON DELETE CASCADE ON UPDATE CASCADE;
