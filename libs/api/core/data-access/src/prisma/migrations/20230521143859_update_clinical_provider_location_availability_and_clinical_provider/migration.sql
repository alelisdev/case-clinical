/*
  Warnings:

  - You are about to alter the column `startTime` on the `ClinicalProviderLocationAvailability` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `DateTime2`.
  - You are about to alter the column `endTime` on the `ClinicalProviderLocationAvailability` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `DateTime2`.
  - You are about to drop the column `locationImageId` on the `Location` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Location] DROP CONSTRAINT [Location_locationImageId_fkey];

-- AlterTable
ALTER TABLE [dbo].[ClinicalProvider] ADD [hourlyRate] FLOAT(53) CONSTRAINT [ClinicalProvider_hourlyRate_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [locationId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Location] DROP COLUMN [locationImageId];

-- CreateTable
CREATE TABLE [dbo].[Award] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Award_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Award_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [school] NVARCHAR(1000),
    [awardedAt] DATETIME2,
    [note] NVARCHAR(1000),
    CONSTRAINT [Award_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClinicalProviderService] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClinicalProviderService_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClinicalProviderService_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [serviceId] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    CONSTRAINT [ClinicalProviderService_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Education] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Education_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Education_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [school] NVARCHAR(1000),
    [degree] NVARCHAR(1000),
    [from] DATETIME2,
    [to] DATETIME2,
    CONSTRAINT [Education_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Experience] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Experience_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Experience_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [workplace] NVARCHAR(1000),
    [from] DATETIME2,
    [to] DATETIME2,
    CONSTRAINT [Experience_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Review] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Review_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Review_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [comment] NVARCHAR(1000),
    [rating] FLOAT(53) CONSTRAINT [Review_rating_df] DEFAULT 0,
    [reivewDateAndTime] DATETIME2,
    [parentId] NVARCHAR(1000),
    CONSTRAINT [Review_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Service] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Service_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Service_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Service_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Award] ADD CONSTRAINT [Award_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderService] ADD CONSTRAINT [ClinicalProviderService_serviceId_fkey] FOREIGN KEY ([serviceId]) REFERENCES [dbo].[Service]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderService] ADD CONSTRAINT [ClinicalProviderService_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Education] ADD CONSTRAINT [Education_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Experience] ADD CONSTRAINT [Experience_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[Review]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Review] ADD CONSTRAINT [Review_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
