/*
  Warnings:

  - You are about to drop the `_NovuNotificationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_NovuNotificationToUser] DROP CONSTRAINT [_NovuNotificationToUser_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_NovuNotificationToUser] DROP CONSTRAINT [_NovuNotificationToUser_B_fkey];

-- AlterTable
ALTER TABLE [dbo].[NovuNotification] ADD [read] BIT,
[redirectLink] NVARCHAR(1000),
[tag] NVARCHAR(1000),
[userId] NVARCHAR(1000);

-- DropTable
DROP TABLE [dbo].[_NovuNotificationToUser];

-- AddForeignKey
ALTER TABLE [dbo].[NovuNotification] ADD CONSTRAINT [NovuNotification_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
