BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ProcedureVendor] ADD [statusId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[ProcedureVendorStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureVendorStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureVendorStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ProcedureVendorStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureVendor] ADD CONSTRAINT [ProcedureVendor_statusId_fkey] FOREIGN KEY ([statusId]) REFERENCES [dbo].[ProcedureVendorStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
