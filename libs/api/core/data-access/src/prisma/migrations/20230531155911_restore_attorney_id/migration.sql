/*
  Warnings:

  - You are about to drop the column `firmId` on the `User` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_firmId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] DROP COLUMN [firmId];
ALTER TABLE [dbo].[User] ADD [attorneyId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_attorneyId_fkey] FOREIGN KEY ([attorneyId]) REFERENCES [dbo].[Attorney]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteProvider] ADD CONSTRAINT [FavoriteProvider_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
