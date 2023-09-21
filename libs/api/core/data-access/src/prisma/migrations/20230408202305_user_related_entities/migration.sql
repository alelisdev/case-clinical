/*
  Warnings:

  - You are about to drop the column `userId` on the `Attorney` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Patient` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_attorneyId_key];

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_patientId_key];

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_providerId_key];

-- AlterTable
ALTER TABLE [dbo].[Attorney] DROP COLUMN [userId];

-- AlterTable
ALTER TABLE [dbo].[Patient] DROP COLUMN [userId];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
