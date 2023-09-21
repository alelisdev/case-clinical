BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[JournalEntryTemplate] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [JournalEntryTemplate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [JournalEntryTemplate_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [locationName] NVARCHAR(1000),
    [fromTo] NVARCHAR(1000),
    [frequency] NVARCHAR(1000),
    [autoOrManual] NVARCHAR(1000),
    [process] NVARCHAR(1000),
    [perAccountOrAggregateJE] NVARCHAR(1000),
    [costRate] FLOAT(53),
    [postingDate] DATETIME2,
    [documentDate] DATETIME2,
    [dueDate] DATETIME2,
    [amount] FLOAT(53),
    [accountType] NVARCHAR(1000),
    [accountNumber] NVARCHAR(1000),
    [costCenter] NVARCHAR(1000),
    [appliesToDocumentNumber] NVARCHAR(1000),
    [ordinal] INT,
    [scenario] NVARCHAR(1000),
    [caseAccountId] NVARCHAR(1000),
    CONSTRAINT [JournalEntryTemplate_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Authorization] ADD CONSTRAINT [Authorization_procedureId_fkey] FOREIGN KEY ([procedureId]) REFERENCES [dbo].[Procedure]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Authorization] ADD CONSTRAINT [Authorization_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JournalEntryTemplate] ADD CONSTRAINT [JournalEntryTemplate_caseAccountId_fkey] FOREIGN KEY ([caseAccountId]) REFERENCES [dbo].[CaseAccount]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
