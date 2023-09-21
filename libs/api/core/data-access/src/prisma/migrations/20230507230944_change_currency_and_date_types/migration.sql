/*
  Warnings:

  - You are about to alter the column `estimatedCost` on the `DurableMedicalEquipment` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.
  - You are about to alter the column `estimatedCost` on the `PriorAuthDme` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Float(53)`.
  - You are about to alter the column `value` on the `Setting` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to drop the `_CaseProcedure_priorAuthorizationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_CaseProcedure_priorAuthorizationRequest] DROP CONSTRAINT [_CaseProcedure_priorAuthorizationRequest_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_CaseProcedure_priorAuthorizationRequest] DROP CONSTRAINT [_CaseProcedure_priorAuthorizationRequest_B_fkey];

-- AlterTable
ALTER TABLE [dbo].[CaseProcedure] ADD [appointmentId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[DurableMedicalEquipment] DROP COLUMN [estimatedCost];
ALTER TABLE [dbo].[DurableMedicalEquipment] ADD [estimatedCost] FLOAT(53) NULL;

-- AlterTable
ALTER TABLE [dbo].[PriorAuthDme] DROP COLUMN [estimatedCost];
ALTER TABLE [dbo].[PriorAuthDme] ADD [estimatedCost] FLOAT(53) NULL;

-- AlterTable
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD [caseProcedureId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Setting] ALTER COLUMN [value] TEXT NULL;

-- DropTable
DROP TABLE [dbo].[_CaseProcedure_priorAuthorizationRequest];

-- AddForeignKey
ALTER TABLE [dbo].[CaseProcedure] ADD CONSTRAINT [CaseProcedure_appointmentId_fkey] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[Appointment]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_caseProcedureId_fkey] FOREIGN KEY ([caseProcedureId]) REFERENCES [dbo].[CaseProcedure]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
