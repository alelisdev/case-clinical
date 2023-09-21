/*
  Warnings:

  - You are about to alter the column `dateOfBirth` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `DateTime2`.
  - A unique constraint covering the columns `[name]` on the table `Template` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Document] DROP CONSTRAINT [Document_prescriptionId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Appointment] ADD [billUrl] NVARCHAR(1000),
[locationId] NVARCHAR(1000),
[medicalReportUrl] NVARCHAR(1000),
[patientId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Claim] ADD [priorAuthorizationRequestId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[ClaimProcedure] ADD [appointmentId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Contact] ALTER COLUMN [dateOfBirth] DATETIME2 NULL;
ALTER TABLE [dbo].[Contact] ADD [contactKindId] NVARCHAR(1000),
[discriminator] NVARCHAR(1000),
[honorific] NVARCHAR(1000),
[latitude] FLOAT(53),
[longitude] FLOAT(53);

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [parentId] NVARCHAR(1000),
[userId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Firm] ADD [eulaId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Prescription] ADD [documentId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[UserFeature] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [UserFeature_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [UserFeature_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [featureId] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    CONSTRAINT [UserFeature_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserFeaturePermission] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [UserFeaturePermission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [UserFeaturePermission_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [featurePermissionId] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    CONSTRAINT [UserFeaturePermission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Permission] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Permission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Permission_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Permission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Feature] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Feature_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Feature_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Feature_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FeaturePermission] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FeaturePermission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FeaturePermission_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [featureId] NVARCHAR(1000),
    [permissionId] NVARCHAR(1000),
    CONSTRAINT [FeaturePermission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuthorizationKind] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AuthorizationKind_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AuthorizationKind_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [categoryId] NVARCHAR(1000),
    CONSTRAINT [AuthorizationKind_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AuthorizationStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AuthorizationStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AuthorizationStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AuthorizationStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Bank] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Bank_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Bank_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Bank_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BatchControl] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BatchControl_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BatchControl_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [trackingNumber] NVARCHAR(1000),
    [batchTotal] FLOAT(53),
    [defaultGLCode] NVARCHAR(1000),
    [posted] BIT,
    CONSTRAINT [BatchControl_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseAccountPayment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CaseAccountPayment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CaseAccountPayment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [amountApplied] FLOAT(53),
    [paymentId] NVARCHAR(1000),
    [caseAccountId] NVARCHAR(1000),
    CONSTRAINT [CaseAccountPayment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Category] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Category_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Category_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Category_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CostCategory] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CostCategory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CostCategory_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [CostCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DiagnosisCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DiagnosisCode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DiagnosisCode_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [DiagnosisCode_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DurableMedicalEquipment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DurableMedicalEquipment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DurableMedicalEquipment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [itemCode] NVARCHAR(1000),
    [size] NVARCHAR(1000),
    [brand] NVARCHAR(1000),
    [itemURL] NVARCHAR(1000),
    [estimatedCost] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    CONSTRAINT [DurableMedicalEquipment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Equipment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Equipment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Equipment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Equipment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Guideline] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Guideline_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Guideline_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Guideline_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[GuidelineUsed] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [GuidelineUsed_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [GuidelineUsed_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [GuidelineUsed_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Implant] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Implant_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Implant_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [estimatedCost] FLOAT(53),
    [categoryId] NVARCHAR(1000),
    [photoUrl] NVARCHAR(1000),
    [sku] NVARCHAR(1000),
    [salesRepresentativeId] NVARCHAR(1000),
    [implantCategoryId] NVARCHAR(1000),
    [manufacturerId] NVARCHAR(1000),
    CONSTRAINT [Implant_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ImplantCategory] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ImplantCategory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ImplantCategory_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ImplantCategory_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[JournalEntry] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [JournalEntry_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [JournalEntry_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [locationName] NVARCHAR(1000),
    [fromTo] NVARCHAR(1000),
    [frequency] NVARCHAR(1000),
    [autoOrManual] NVARCHAR(1000),
    [process] NVARCHAR(1000),
    [perAccountOrAggregateJE] NVARCHAR(1000),
    [costRate] FLOAT(53),
    [accountType] NVARCHAR(1000),
    [accountNumber] NVARCHAR(1000),
    [costCenter] NVARCHAR(1000),
    [appliesToDocumentNumber] NVARCHAR(1000),
    [caseAccountId] NVARCHAR(1000),
    CONSTRAINT [JournalEntry_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Manufacturer] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Manufacturer_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Manufacturer_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [primaryPhoneNumber] NVARCHAR(1000),
    [primaryEmailAddress] NVARCHAR(1000),
    [primaryAddressLine1] NVARCHAR(1000),
    [primaryAddressLine2] NVARCHAR(1000),
    [primaryAddressCity] NVARCHAR(1000),
    [primaryAddressStateOrProvince] NVARCHAR(1000),
    [primaryAddressPostalCode] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    CONSTRAINT [Manufacturer_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Payment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Payment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Payment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [paidOn] DATETIME2,
    [name] NVARCHAR(1000),
    [amount] FLOAT(53),
    [collected] FLOAT(53),
    [dac] FLOAT(53),
    [isPartial] BIT,
    [dateReceived] DATETIME2,
    [memo] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [securitizationGroup] NVARCHAR(1000),
    [batchControlId] NVARCHAR(1000),
    [bankId] NVARCHAR(1000),
    [payorTypeId] NVARCHAR(1000),
    [paymentTypeId] NVARCHAR(1000),
    [paymentApplicationMethodId] NVARCHAR(1000),
    CONSTRAINT [Payment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PaymentApplicationMethod] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PaymentApplicationMethod_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PaymentApplicationMethod_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PaymentApplicationMethod_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PaymentType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PaymentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PaymentType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PaymentType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PayorType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PayorType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PayorType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PayorType_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthDme] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthDme_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthDme_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [estimatedCost] NVARCHAR(1000),
    [durableMedicalEquipmentId] NVARCHAR(1000),
    [priorAuthId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthDme_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthGuideline] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthGuideline_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthGuideline_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [guidelineId] NVARCHAR(1000),
    [priorAuthorizationRequestId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthGuideline_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthorizationDiagnosisCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthorizationDiagnosisCode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthorizationDiagnosisCode_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [diagnosisCodeId] NVARCHAR(1000),
    [priorAuthorizationRequestId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthorizationDiagnosisCode_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthorizationEquipment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthorizationEquipment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthorizationEquipment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [estimatedCost] FLOAT(53),
    [equipmentId] NVARCHAR(1000),
    [priorAuthorizationRequestId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthorizationEquipment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthorizationImplant] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthorizationImplant_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthorizationImplant_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [estimatedCost] FLOAT(53),
    [priorAuthorizationRequestId] NVARCHAR(1000),
    [implantId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthorizationImplant_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthorizationProcedureCode] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthorizationProcedureCode_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthorizationProcedureCode_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [estimatedCost] FLOAT(53),
    [procedureId] NVARCHAR(1000),
    [costCategoryId] NVARCHAR(1000),
    [priorAuthorizationRequestId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthorizationProcedureCode_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorAuthorizationRequest] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorAuthorizationRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorAuthorizationRequest_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [referredOn] DATETIME2,
    [approvedOn] DATETIME2,
    [effectiveAsOf] DATETIME2,
    [expiresOn] DATETIME2,
    [duration] FLOAT(53),
    [procedureDescription] NVARCHAR(1000),
    [remarks] NVARCHAR(1000),
    [underwritingApproved] BIT,
    [tpaApproved] BIT,
    [requiresMedicalDirector] BIT,
    [reviewedOn] DATETIME2,
    [priorAuthorizationNumber] NVARCHAR(1000),
    [caseManager] NVARCHAR(1000),
    [memberNumber] NVARCHAR(1000),
    [medicalDirector] NVARCHAR(1000),
    [tpaApprover] NVARCHAR(1000),
    [underwriter] NVARCHAR(1000),
    [guidelineRequires] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [procedureSiteId] NVARCHAR(1000),
    [surgicalPositionId] NVARCHAR(1000),
    [medicalProviderId] NVARCHAR(1000),
    [referredToId] NVARCHAR(1000),
    [prescriptionId] NVARCHAR(1000),
    [visitKindId] NVARCHAR(1000),
    [guidelineUsedId] NVARCHAR(1000),
    [authorizationKindId] NVARCHAR(1000),
    [authorizationStatusId] NVARCHAR(1000),
    [billId] NVARCHAR(1000),
    [medicalReportId] NVARCHAR(1000),
    CONSTRAINT [PriorAuthorizationRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Procedure] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Procedure_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Procedure_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    CONSTRAINT [Procedure_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProcedureSite] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureSite_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureSite_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    CONSTRAINT [ProcedureSite_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[SurgicalPosition] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [SurgicalPosition_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [SurgicalPosition_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [SurgicalPosition_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[VisitKind] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [VisitKind_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [VisitKind_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    CONSTRAINT [VisitKind_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_CaseProcedure_priorAuthorizationRequest] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_CaseProcedure_priorAuthorizationRequest_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_CaseProcedure_priorAuthorizationRequest_B_index] ON [dbo].[_CaseProcedure_priorAuthorizationRequest]([B]);

-- CreateIndex
CREATE UNIQUE NONCLUSTERED INDEX [Template_name_key] ON [dbo].[Template]([name]);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserFeature] ADD CONSTRAINT [UserFeature_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserFeature] ADD CONSTRAINT [UserFeature_featureId_fkey] FOREIGN KEY ([featureId]) REFERENCES [dbo].[Feature]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserFeaturePermission] ADD CONSTRAINT [UserFeaturePermission_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserFeaturePermission] ADD CONSTRAINT [UserFeaturePermission_featurePermissionId_fkey] FOREIGN KEY ([featurePermissionId]) REFERENCES [dbo].[FeaturePermission]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeaturePermission] ADD CONSTRAINT [FeaturePermission_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permission]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeaturePermission] ADD CONSTRAINT [FeaturePermission_featureId_fkey] FOREIGN KEY ([featureId]) REFERENCES [dbo].[Feature]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Claim] ADD CONSTRAINT [Claim_priorAuthorizationRequestId_fkey] FOREIGN KEY ([priorAuthorizationRequestId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ClaimProcedure] ADD CONSTRAINT [ClaimProcedure_appointmentId_fkey] FOREIGN KEY ([appointmentId]) REFERENCES [dbo].[Appointment]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Firm] ADD CONSTRAINT [Firm_eulaId_fkey] FOREIGN KEY ([eulaId]) REFERENCES [dbo].[Document]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Prescription] ADD CONSTRAINT [Prescription_documentId_fkey] FOREIGN KEY ([documentId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AuthorizationKind] ADD CONSTRAINT [AuthorizationKind_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[Category]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccountPayment] ADD CONSTRAINT [CaseAccountPayment_caseAccountId_fkey] FOREIGN KEY ([caseAccountId]) REFERENCES [dbo].[CaseAccount]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccountPayment] ADD CONSTRAINT [CaseAccountPayment_paymentId_fkey] FOREIGN KEY ([paymentId]) REFERENCES [dbo].[Payment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[DurableMedicalEquipment] ADD CONSTRAINT [DurableMedicalEquipment_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Implant] ADD CONSTRAINT [Implant_salesRepresentativeId_fkey] FOREIGN KEY ([salesRepresentativeId]) REFERENCES [dbo].[Contact]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Implant] ADD CONSTRAINT [Implant_implantCategoryId_fkey] FOREIGN KEY ([implantCategoryId]) REFERENCES [dbo].[ImplantCategory]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Implant] ADD CONSTRAINT [Implant_manufacturerId_fkey] FOREIGN KEY ([manufacturerId]) REFERENCES [dbo].[Manufacturer]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[JournalEntry] ADD CONSTRAINT [JournalEntry_caseAccountId_fkey] FOREIGN KEY ([caseAccountId]) REFERENCES [dbo].[CaseAccount]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Payment] ADD CONSTRAINT [Payment_bankId_fkey] FOREIGN KEY ([bankId]) REFERENCES [dbo].[Bank]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Payment] ADD CONSTRAINT [Payment_batchControlId_fkey] FOREIGN KEY ([batchControlId]) REFERENCES [dbo].[BatchControl]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Payment] ADD CONSTRAINT [Payment_paymentApplicationMethodId_fkey] FOREIGN KEY ([paymentApplicationMethodId]) REFERENCES [dbo].[PaymentApplicationMethod]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Payment] ADD CONSTRAINT [Payment_paymentTypeId_fkey] FOREIGN KEY ([paymentTypeId]) REFERENCES [dbo].[PaymentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Payment] ADD CONSTRAINT [Payment_payorTypeId_fkey] FOREIGN KEY ([payorTypeId]) REFERENCES [dbo].[PayorType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthDme] ADD CONSTRAINT [PriorAuthDme_durableMedicalEquipmentId_fkey] FOREIGN KEY ([durableMedicalEquipmentId]) REFERENCES [dbo].[DurableMedicalEquipment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthDme] ADD CONSTRAINT [PriorAuthDme_priorAuthId_fkey] FOREIGN KEY ([priorAuthId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthGuideline] ADD CONSTRAINT [PriorAuthGuideline_guidelineId_fkey] FOREIGN KEY ([guidelineId]) REFERENCES [dbo].[Guideline]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthGuideline] ADD CONSTRAINT [PriorAuthGuideline_priorAuthorizationRequestId_fkey] FOREIGN KEY ([priorAuthorizationRequestId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationDiagnosisCode] ADD CONSTRAINT [PriorAuthorizationDiagnosisCode_diagnosisCodeId_fkey] FOREIGN KEY ([diagnosisCodeId]) REFERENCES [dbo].[DiagnosisCode]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationDiagnosisCode] ADD CONSTRAINT [PriorAuthorizationDiagnosisCode_priorAuthorizationRequestId_fkey] FOREIGN KEY ([priorAuthorizationRequestId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationEquipment] ADD CONSTRAINT [PriorAuthorizationEquipment_equipmentId_fkey] FOREIGN KEY ([equipmentId]) REFERENCES [dbo].[Equipment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationEquipment] ADD CONSTRAINT [PriorAuthorizationEquipment_priorAuthorizationRequestId_fkey] FOREIGN KEY ([priorAuthorizationRequestId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationImplant] ADD CONSTRAINT [PriorAuthorizationImplant_implantId_fkey] FOREIGN KEY ([implantId]) REFERENCES [dbo].[Implant]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationImplant] ADD CONSTRAINT [PriorAuthorizationImplant_priorAuthorizationRequestId_fkey] FOREIGN KEY ([priorAuthorizationRequestId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationProcedureCode] ADD CONSTRAINT [PriorAuthorizationProcedureCode_costCategoryId_fkey] FOREIGN KEY ([costCategoryId]) REFERENCES [dbo].[CostCategory]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationProcedureCode] ADD CONSTRAINT [PriorAuthorizationProcedureCode_priorAuthorizationRequestId_fkey] FOREIGN KEY ([priorAuthorizationRequestId]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationProcedureCode] ADD CONSTRAINT [PriorAuthorizationProcedureCode_procedureId_fkey] FOREIGN KEY ([procedureId]) REFERENCES [dbo].[Procedure]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_prescriptionId_fkey] FOREIGN KEY ([prescriptionId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_billId_fkey] FOREIGN KEY ([billId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_medicalReportId_fkey] FOREIGN KEY ([medicalReportId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_medicalProviderId_fkey] FOREIGN KEY ([medicalProviderId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_referredToId_fkey] FOREIGN KEY ([referredToId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_authorizationKindId_fkey] FOREIGN KEY ([authorizationKindId]) REFERENCES [dbo].[AuthorizationKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_authorizationStatusId_fkey] FOREIGN KEY ([authorizationStatusId]) REFERENCES [dbo].[AuthorizationStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_guidelineUsedId_fkey] FOREIGN KEY ([guidelineUsedId]) REFERENCES [dbo].[GuidelineUsed]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_procedureSiteId_fkey] FOREIGN KEY ([procedureSiteId]) REFERENCES [dbo].[ProcedureSite]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_surgicalPositionId_fkey] FOREIGN KEY ([surgicalPositionId]) REFERENCES [dbo].[SurgicalPosition]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_visitKindId_fkey] FOREIGN KEY ([visitKindId]) REFERENCES [dbo].[VisitKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_CaseProcedure_priorAuthorizationRequest] ADD CONSTRAINT [_CaseProcedure_priorAuthorizationRequest_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[CaseProcedure]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_CaseProcedure_priorAuthorizationRequest] ADD CONSTRAINT [_CaseProcedure_priorAuthorizationRequest_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[PriorAuthorizationRequest]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
