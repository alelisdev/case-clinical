BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Notification] DROP CONSTRAINT [Notification_userId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[NovuNotification] DROP CONSTRAINT [NovuNotification_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Appointment] ADD [assignedToId] NVARCHAR(1000),
[medicalRecordStatusId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[MedicalRecordStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [MedicalRecordStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [MedicalRecordStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [MedicalRecordStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_assignedToId_fkey] FOREIGN KEY ([assignedToId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_medicalRecordStatusId_fkey] FOREIGN KEY ([medicalRecordStatusId]) REFERENCES [dbo].[MedicalRecordStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Notification] ADD CONSTRAINT [Notification_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[NovuNotification] ADD CONSTRAINT [NovuNotification_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
