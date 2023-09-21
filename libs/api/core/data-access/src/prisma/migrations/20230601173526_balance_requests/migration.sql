BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[BalanceRequest] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BalanceRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BalanceRequest_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [requestedOn] DATETIME2,
    [repliedOn] DATETIME2,
    [status] NVARCHAR(1000),
    [statementId] NVARCHAR(1000),
    [type] NVARCHAR(1000),
    [balanceAmount] FLOAT(53),
    [legalCaseId] NVARCHAR(1000),
    CONSTRAINT [BalanceRequest_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [BalanceRequest_name_key] UNIQUE NONCLUSTERED ([name])
);

-- AddForeignKey
ALTER TABLE [dbo].[BalanceRequest] ADD CONSTRAINT [BalanceRequest_statementId_fkey] FOREIGN KEY ([statementId]) REFERENCES [dbo].[Document]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BalanceRequest] ADD CONSTRAINT [BalanceRequest_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
