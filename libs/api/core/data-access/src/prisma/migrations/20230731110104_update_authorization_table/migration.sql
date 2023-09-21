/*
  Warnings:

  - You are about to alter the column `durationOrQuantity` on the `Authorization` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Authorization] ALTER COLUMN [durationOrQuantity] FLOAT(53) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
