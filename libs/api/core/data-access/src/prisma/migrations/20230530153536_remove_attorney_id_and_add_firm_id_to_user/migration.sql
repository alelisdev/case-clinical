/*
  Warnings:

  - You are about to drop the column `attorneyId` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_attorneyId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [attorneyId];
ALTER TABLE [dbo].[User] ADD [firmId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_firmId_fkey] FOREIGN KEY ([firmId]) REFERENCES [dbo].[Firm]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
