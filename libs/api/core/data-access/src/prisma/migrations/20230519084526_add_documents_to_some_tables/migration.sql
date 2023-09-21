/*
  Warnings:

  - You are about to drop the column `billUrl` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicalReportUrl` on the `Appointment` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;
-- AlterTable
ALTER TABLE [dbo].[Specialty] ADD [iconId] NVARCHAR(1000);
-- AddForeignKey
ALTER TABLE [dbo].[Specialty] ADD CONSTRAINT [Specialty_iconId_fkey] FOREIGN KEY ([iconId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE [dbo].[ClinicalProvider] DROP COLUMN [profilePictureId];
ALTER TABLE [dbo].[ClinicalProvider] ADD [profilePictureId] NVARCHAR(1000);
-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProvider] ADD CONSTRAINT [ClinicalProvider_profilePictureId_fkey] FOREIGN KEY ([profilePictureId]) REFERENCES [dbo].[Document]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
