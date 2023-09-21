BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[PriorMedsToDate] ADD [specialtyId] NVARCHAR(1000),
[visitKindId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[PriorMedsToDate] ADD CONSTRAINT [PriorMedsToDate_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorMedsToDate] ADD CONSTRAINT [PriorMedsToDate_visitKindId_fkey] FOREIGN KEY ([visitKindId]) REFERENCES [dbo].[VisitKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
