/*
  Warnings:

  - You are about to drop the column `billUrl` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicalReportUrl` on the `Appointment` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] DROP CONSTRAINT [PriorAuthorizationRequest_billId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] DROP CONSTRAINT [PriorAuthorizationRequest_medicalReportId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Appointment] DROP COLUMN [billUrl],
[medicalReportUrl];
ALTER TABLE [dbo].[Appointment] ADD [billId] NVARCHAR(1000),
[imagingId] NVARCHAR(1000),
[medicalReportId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[LegalCase] ADD [medicalRecordNumber] NVARCHAR(1000),
[pchGroupNumber] NVARCHAR(1000),
[pharmacyControlNumber] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_medicalReportId_fkey] FOREIGN KEY ([medicalReportId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_billId_fkey] FOREIGN KEY ([billId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_imagingId_fkey] FOREIGN KEY ([imagingId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
