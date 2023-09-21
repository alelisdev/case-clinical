BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Invoice] ADD [clinicalProviderId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Invoice] ADD CONSTRAINT [Invoice_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequest] ADD CONSTRAINT [ProcedureOrTreatmentRequest_requestingProviderId_fkey] FOREIGN KEY ([requestingProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequest] ADD CONSTRAINT [ProcedureOrTreatmentRequest_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequest] ADD CONSTRAINT [ProcedureOrTreatmentRequest_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequest] ADD CONSTRAINT [ProcedureOrTreatmentRequest_procedureTypeId_fkey] FOREIGN KEY ([procedureTypeId]) REFERENCES [dbo].[ProcedureType]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrder] ADD CONSTRAINT [RecommendedOrder_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrder] ADD CONSTRAINT [RecommendedOrder_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrder] ADD CONSTRAINT [RecommendedOrder_requestingProviderId_fkey] FOREIGN KEY ([requestingProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
