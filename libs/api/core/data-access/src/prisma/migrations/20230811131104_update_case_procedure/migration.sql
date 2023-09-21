BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[CaseProcedure] ADD [procedureStatusId] NVARCHAR(1000),
[procedureTypeId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[ProcedureStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ProcedureStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CaseProcedure] ADD CONSTRAINT [CaseProcedure_procedureStatusId_fkey] FOREIGN KEY ([procedureStatusId]) REFERENCES [dbo].[ProcedureStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseProcedure] ADD CONSTRAINT [CaseProcedure_procedureTypeId_fkey] FOREIGN KEY ([procedureTypeId]) REFERENCES [dbo].[ProcedureType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
