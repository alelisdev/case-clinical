BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Location] ADD [locationImageId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Location] ADD CONSTRAINT [Location_locationImageId_fkey] FOREIGN KEY ([locationImageId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
