/*
  Warnings:

  - You are about to alter the column `totalCharges` on the `Claim` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.
  - You are about to alter the column `amountPaid` on the `Claim` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
UPDATE Claim SET Claim.totalCharges = NULL;
UPDATE Claim SET Claim.amountPaid = NULL;
ALTER TABLE [dbo].[Claim] ALTER COLUMN [totalCharges] FLOAT(53) NULL;
ALTER TABLE [dbo].[Claim] ALTER COLUMN [amountPaid] FLOAT(53) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
