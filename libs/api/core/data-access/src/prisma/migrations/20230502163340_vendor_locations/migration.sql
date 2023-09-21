/*
  Warnings:

  - You are about to drop the column `cotes` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ach` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `apDetailTemplate` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `baa` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `billOfSaleInstructions` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `billOfSaleTemplate` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `contract` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `dl` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `facilityCheck` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `nci` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `nds` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `ota` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `other` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `sa` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `ucc` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `w9` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `wire` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the `ProviderLocation` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[AssignedDocument] DROP CONSTRAINT [AssignedDocument_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProviderLocation] DROP CONSTRAINT [ProviderLocation_locationId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProviderLocation] DROP CONSTRAINT [ProviderLocation_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[ProviderLocation] DROP CONSTRAINT [ProviderLocation_vendorId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_providerId_fkey];

-- AlterTable
ALTER TABLE [dbo].[AssignedDocument] ADD [vendorId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Location] DROP COLUMN [cotes];
ALTER TABLE [dbo].[Location] ADD [placeOfServiceId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [providerId];
ALTER TABLE [dbo].[User] ADD [vendorId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Vendor] DROP COLUMN [ach],
[apDetailTemplate],
[baa],
[billOfSaleInstructions],
[billOfSaleTemplate],
[contract],
[dl],
[facilityCheck],
[nci],
[nds],
[ota],
[other],
[permission],
[sa],
[ucc],
[w9],
[wire];
ALTER TABLE [dbo].[Vendor] ADD [achCheckOrWire] NVARCHAR(1000),
[driversLicenseId] NVARCHAR(1000),
[logoId] NVARCHAR(1000),
[providerSearchNameDisplayType] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[ProviderLocation];

-- CreateTable
CREATE TABLE [dbo].[VendorLocation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [VendorLocation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [VendorLocation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [locationId] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    CONSTRAINT [VendorLocation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[AssignedDocument] ADD CONSTRAINT [AssignedDocument_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AssignedDocument] ADD CONSTRAINT [AssignedDocument_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProvider] ADD CONSTRAINT [ClinicalProvider_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Location] ADD CONSTRAINT [Location_placeOfServiceId_fkey] FOREIGN KEY ([placeOfServiceId]) REFERENCES [dbo].[PlaceOfService]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VendorLocation] ADD CONSTRAINT [VendorLocation_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[VendorLocation] ADD CONSTRAINT [VendorLocation_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
