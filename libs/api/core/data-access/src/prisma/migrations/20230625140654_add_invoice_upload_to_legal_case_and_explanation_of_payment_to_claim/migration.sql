BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Claim] DROP CONSTRAINT [Claim_claimId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Claim] ADD [explanationOfPaymentId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Invoice] ADD [invoiceId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Invoice] ADD CONSTRAINT [Invoice_invoiceId_fkey] FOREIGN KEY ([invoiceId]) REFERENCES [dbo].[Document]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Claim] ADD CONSTRAINT [Claim_claimId_fkey] FOREIGN KEY ([claimId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Claim] ADD CONSTRAINT [Claim_explanationOfPaymentId_fkey] FOREIGN KEY ([explanationOfPaymentId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
