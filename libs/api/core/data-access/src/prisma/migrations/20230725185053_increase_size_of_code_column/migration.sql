BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Template] ALTER COLUMN [code] NVARCHAR(max) NULL;

-- CreateTable
CREATE TABLE [dbo].[Authorization] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Authorization_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Authorization_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    [authorizationCategoryId] NVARCHAR(1000),
    [authorizationTypeId] NVARCHAR(1000),
    [requestDescription] NVARCHAR(1000),
    [durationOrQuantity] NVARCHAR(1000),
    [unit] NVARCHAR(1000),
    [cptCode] NVARCHAR(1000),
    [procedureId] NVARCHAR(1000),
    CONSTRAINT [Authorization_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuthorizationCategory] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AuthorizationCategory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AuthorizationCategory_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AuthorizationCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuthorizationDiagnosisCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AuthorizationDiagnosisCode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AuthorizationDiagnosisCode_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [diagnosisCodeId] NVARCHAR(1000),
    [authorizationId] NVARCHAR(1000),
    CONSTRAINT [AuthorizationDiagnosisCode_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuthorizationType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AuthorizationType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AuthorizationType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AuthorizationType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProcedureOrTreatmentRequest] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureOrTreatmentRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureOrTreatmentRequest_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [facilityVendorId] NVARCHAR(1000),
    [facilityContractId] NVARCHAR(1000),
    [anesthesiaVendorId] NVARCHAR(1000),
    [anesthesiaVendorContractId] NVARCHAR(1000),
    [requestingProviderId] NVARCHAR(1000),
    [procedureTypeId] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    CONSTRAINT [ProcedureOrTreatmentRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProcedureOrTreatmentRequestAuthorization] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureOrTreatmentRequestAuthorization_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureOrTreatmentRequestAuthorization_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [authorizationId] NVARCHAR(1000),
    [procedureOrTreatmentRequestId] NVARCHAR(1000),
    CONSTRAINT [ProcedureOrTreatmentRequestAuthorization_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProcedureOrTreatmentRequestDiagnosisCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureOrTreatmentRequestDiagnosisCode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureOrTreatmentRequestDiagnosisCode_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [diagnosisCodeId] NVARCHAR(1000),
    [procedureOrTreatmentRequestId] NVARCHAR(1000),
    CONSTRAINT [ProcedureOrTreatmentRequestDiagnosisCode_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RecommendedOrder] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RecommendedOrder_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RecommendedOrder_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [requestingProviderId] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    CONSTRAINT [RecommendedOrder_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RecommendedOrderAuthorization] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RecommendedOrderAuthorization_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RecommendedOrderAuthorization_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [authorizationId] NVARCHAR(1000),
    [recommendedOrderId] NVARCHAR(1000),
    CONSTRAINT [RecommendedOrderAuthorization_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RecommendedOrderDiagnosisCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RecommendedOrderDiagnosisCode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RecommendedOrderDiagnosisCode_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [diagnosisCodeId] NVARCHAR(1000),
    [recommendedOrderId] NVARCHAR(1000),
    CONSTRAINT [RecommendedOrderDiagnosisCode_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ReferralRequest] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ReferralRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ReferralRequest_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [requestingProviderId] NVARCHAR(1000),
    [referredToId] NVARCHAR(1000),
    [clinicalProviderLocationId] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    CONSTRAINT [ReferralRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RequestAdditionalVisit] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RequestAdditionalVisit_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RequestAdditionalVisit_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [requestingProviderId] NVARCHAR(1000),
    [numberOfVisitsBeingRequested] INT,
    CONSTRAINT [RequestAdditionalVisit_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Authorization] ADD CONSTRAINT [Authorization_authorizationCategoryId_fkey] FOREIGN KEY ([authorizationCategoryId]) REFERENCES [dbo].[AuthorizationCategory]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Authorization] ADD CONSTRAINT [Authorization_authorizationTypeId_fkey] FOREIGN KEY ([authorizationTypeId]) REFERENCES [dbo].[AuthorizationType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AuthorizationDiagnosisCode] ADD CONSTRAINT [AuthorizationDiagnosisCode_diagnosisCodeId_fkey] FOREIGN KEY ([diagnosisCodeId]) REFERENCES [dbo].[DiagnosisCode]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AuthorizationDiagnosisCode] ADD CONSTRAINT [AuthorizationDiagnosisCode_authorizationId_fkey] FOREIGN KEY ([authorizationId]) REFERENCES [dbo].[Authorization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequestAuthorization] ADD CONSTRAINT [ProcedureOrTreatmentRequestAuthorization_authorizationId_fkey] FOREIGN KEY ([authorizationId]) REFERENCES [dbo].[Authorization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequestAuthorization] ADD CONSTRAINT [ProcedureOrTreatmentRequestAuthorization_procedureOrTreatmentRequestId_fkey] FOREIGN KEY ([procedureOrTreatmentRequestId]) REFERENCES [dbo].[ProcedureOrTreatmentRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequestDiagnosisCode] ADD CONSTRAINT [ProcedureOrTreatmentRequestDiagnosisCode_diagnosisCodeId_fkey] FOREIGN KEY ([diagnosisCodeId]) REFERENCES [dbo].[DiagnosisCode]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureOrTreatmentRequestDiagnosisCode] ADD CONSTRAINT [ProcedureOrTreatmentRequestDiagnosisCode_procedureOrTreatmentRequestId_fkey] FOREIGN KEY ([procedureOrTreatmentRequestId]) REFERENCES [dbo].[ProcedureOrTreatmentRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrderAuthorization] ADD CONSTRAINT [RecommendedOrderAuthorization_authorizationId_fkey] FOREIGN KEY ([authorizationId]) REFERENCES [dbo].[Authorization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrderAuthorization] ADD CONSTRAINT [RecommendedOrderAuthorization_recommendedOrderId_fkey] FOREIGN KEY ([recommendedOrderId]) REFERENCES [dbo].[RecommendedOrder]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrderDiagnosisCode] ADD CONSTRAINT [RecommendedOrderDiagnosisCode_diagnosisCodeId_fkey] FOREIGN KEY ([diagnosisCodeId]) REFERENCES [dbo].[DiagnosisCode]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RecommendedOrderDiagnosisCode] ADD CONSTRAINT [RecommendedOrderDiagnosisCode_recommendedOrderId_fkey] FOREIGN KEY ([recommendedOrderId]) REFERENCES [dbo].[RecommendedOrder]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ReferralRequest] ADD CONSTRAINT [ReferralRequest_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReferralRequest] ADD CONSTRAINT [ReferralRequest_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReferralRequest] ADD CONSTRAINT [ReferralRequest_requestingProviderId_fkey] FOREIGN KEY ([requestingProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReferralRequest] ADD CONSTRAINT [ReferralRequest_referredToId_fkey] FOREIGN KEY ([referredToId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ReferralRequest] ADD CONSTRAINT [ReferralRequest_clinicalProviderLocationId_fkey] FOREIGN KEY ([clinicalProviderLocationId]) REFERENCES [dbo].[ClinicalProviderLocation]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RequestAdditionalVisit] ADD CONSTRAINT [RequestAdditionalVisit_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RequestAdditionalVisit] ADD CONSTRAINT [RequestAdditionalVisit_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
