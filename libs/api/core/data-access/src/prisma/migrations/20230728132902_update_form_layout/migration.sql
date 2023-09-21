BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Appointment] ADD [finalVisitApproved] BIT;

-- AlterTable
ALTER TABLE [dbo].[FormLayout] ADD [order] INT,
[parentId] NVARCHAR(1000),
[title] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[FormLayout] ADD CONSTRAINT [FormLayout_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[FormLayout]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
