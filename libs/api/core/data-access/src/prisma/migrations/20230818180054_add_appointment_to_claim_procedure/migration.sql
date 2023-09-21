BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Appointment] ADD [miscellaneousId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_miscellaneousId_fkey] FOREIGN KEY ([miscellaneousId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
