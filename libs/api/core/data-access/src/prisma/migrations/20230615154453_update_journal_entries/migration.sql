BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_planId_fkey];

-- AlterTable
ALTER TABLE [dbo].[JournalEntry] ADD [amount] FLOAT(53),
[documentDate] DATETIME2,
[dueDate] DATETIME2,
[postingDate] DATETIME2;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
