/*
  Warnings:

  - You are about to drop the column `driversLicense` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `severityOfInjuriesId` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `leadId` on the `LeadSource` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Insurance] DROP CONSTRAINT [Insurance_legalCaseId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Lead] DROP COLUMN [driversLicense],
[severityOfInjuriesId];
ALTER TABLE [dbo].[Lead] ADD [accidentTypeId] NVARCHAR(1000),
[allowedToContactEmergencyContact] BIT,
[driversLicenseId] NVARCHAR(1000),
[middleName] NVARCHAR(1000),
[phoneRecordingId] NVARCHAR(1000),
[policeReportAttachmentId] NVARCHAR(1000),
[priorRepresentation] NVARCHAR(1000),
[severeInjury] BIT;

-- AlterTable
ALTER TABLE [dbo].[LeadSource] DROP COLUMN [leadId];

-- CreateTable
CREATE TABLE [dbo].[LeadTreatment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [LeadTreatment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [LeadTreatment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [leadId] NVARCHAR(1000),
    [treatmentId] NVARCHAR(1000),
    CONSTRAINT [LeadTreatment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LeadInjury] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [LeadInjury_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [LeadInjury_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [leadId] NVARCHAR(1000),
    [bodyPartId] NVARCHAR(1000),
    [severityId] NVARCHAR(1000),
    CONSTRAINT [LeadInjury_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Injury] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Injury_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Injury_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Injury_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Treatment] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Treatment_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Treatment_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Treatment_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_LeadInjury_injuries] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_LeadInjury_injuries_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_LeadInjury_injuries_B_index] ON [dbo].[_LeadInjury_injuries]([B]);

-- AddForeignKey
ALTER TABLE [dbo].[Insurance] ADD CONSTRAINT [Insurance_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_accidentTypeId_fkey] FOREIGN KEY ([accidentTypeId]) REFERENCES [dbo].[AccidentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_driversLicenseId_fkey] FOREIGN KEY ([driversLicenseId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_policeReportAttachmentId_fkey] FOREIGN KEY ([policeReportAttachmentId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_phoneRecordingId_fkey] FOREIGN KEY ([phoneRecordingId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_leadStatusId_fkey] FOREIGN KEY ([leadStatusId]) REFERENCES [dbo].[LeadStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_leadSourceId_fkey] FOREIGN KEY ([leadSourceId]) REFERENCES [dbo].[LeadSource]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LeadTreatment] ADD CONSTRAINT [LeadTreatment_leadId_fkey] FOREIGN KEY ([leadId]) REFERENCES [dbo].[Lead]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LeadTreatment] ADD CONSTRAINT [LeadTreatment_treatmentId_fkey] FOREIGN KEY ([treatmentId]) REFERENCES [dbo].[Treatment]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LeadInjury] ADD CONSTRAINT [LeadInjury_leadId_fkey] FOREIGN KEY ([leadId]) REFERENCES [dbo].[Lead]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LeadInjury] ADD CONSTRAINT [LeadInjury_severityId_fkey] FOREIGN KEY ([severityId]) REFERENCES [dbo].[Severity]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_LeadInjury_injuries] ADD CONSTRAINT [_LeadInjury_injuries_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[Injury]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_LeadInjury_injuries] ADD CONSTRAINT [_LeadInjury_injuries_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[LeadInjury]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
