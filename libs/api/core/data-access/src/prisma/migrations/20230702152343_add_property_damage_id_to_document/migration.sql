/*
  Warnings:

  - You are about to drop the column `locationId` on the `VendorLocation` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CaseAccount] DROP CONSTRAINT [CaseAccount_locationId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[VendorLocation] DROP CONSTRAINT [VendorLocation_locationId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [propertyDamageId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Location] ADD [vendorLocationId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[VendorLocation] DROP COLUMN [locationId];

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_propertyDamageId_fkey] FOREIGN KEY ([propertyDamageId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Location] ADD CONSTRAINT [Location_vendorLocationId_fkey] FOREIGN KEY ([vendorLocationId]) REFERENCES [dbo].[VendorLocation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
