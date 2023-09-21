BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ContractedRate] ADD [clinicalProviderId] NVARCHAR(1000),
[specialtyId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Lead] ADD [submittedById] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[ContractedRate] ADD CONSTRAINT [ContractedRate_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ContractedRate] ADD CONSTRAINT [ContractedRate_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_submittedById_fkey] FOREIGN KEY ([submittedById]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
