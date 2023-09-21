BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Appointment] ADD [visitKindId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [miscellaneousId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[FormLayout] ADD [modelData] TEXT;

-- AlterTable
ALTER TABLE [dbo].[Notification] ADD [appointmentId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[NovuNotification] ADD [appointmentId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Patient] ADD [subpoenaId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_visitKindId_fkey] FOREIGN KEY ([visitKindId]) REFERENCES [dbo].[VisitKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_miscellaneousId_fkey] FOREIGN KEY ([miscellaneousId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Notification] ADD CONSTRAINT [Notification_appointmentId_fkey] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[Appointment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[NovuNotification] ADD CONSTRAINT [NovuNotification_appointmentId_fkey] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[Appointment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_subpoenaId_fkey] FOREIGN KEY ([subpoenaId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
