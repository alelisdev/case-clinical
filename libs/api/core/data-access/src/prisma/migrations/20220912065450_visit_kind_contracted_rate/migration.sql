BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ContractedRate] ADD [visitKindId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[ContractedRate] ADD CONSTRAINT [ContractedRate_visitKindId_fkey] FOREIGN KEY ([visitKindId]) REFERENCES [dbo].[VisitKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
