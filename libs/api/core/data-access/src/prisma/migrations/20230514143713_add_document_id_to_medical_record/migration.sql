BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[MedicalConditionProvider] ADD [documentId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[MedicalRecord] ADD [documentId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[MedicalRecord] ADD CONSTRAINT [MedicalRecord_documentId_fkey] FOREIGN KEY ([documentId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
