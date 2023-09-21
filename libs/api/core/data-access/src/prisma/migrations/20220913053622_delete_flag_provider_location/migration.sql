BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProviderLocation] ADD [isDeleted] BIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH