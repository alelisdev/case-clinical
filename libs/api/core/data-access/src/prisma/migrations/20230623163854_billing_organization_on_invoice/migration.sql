BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Claim] ADD [claimId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_claimProcedureId_fkey] FOREIGN KEY ([claimProcedureId]) REFERENCES [dbo].[ClaimProcedure]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Invoice] ADD CONSTRAINT [Invoice_organizationId_fkey] FOREIGN KEY ([organizationId]) REFERENCES [dbo].[Organization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Claim] ADD CONSTRAINT [Claim_claimId_fkey] FOREIGN KEY ([claimId]) REFERENCES [dbo].[Document]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
