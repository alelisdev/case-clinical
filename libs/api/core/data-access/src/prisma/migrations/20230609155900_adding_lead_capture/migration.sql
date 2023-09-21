BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Insurance] ADD [leadId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[BodyPartLead] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BodyPartLead_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BodyPartLead_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [leadId] NVARCHAR(1000),
    [bodyPartId] NVARCHAR(1000),
    CONSTRAINT [BodyPartLead_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Lead] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Lead_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Lead_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [postalCode] NVARCHAR(1000),
    [dateOfBirth] DATETIME2,
    [dateOfLoss] DATETIME2,
    [phoneNumber] NVARCHAR(1000),
    [emailAddress] NVARCHAR(1000),
    [driversLicense] NVARCHAR(1000),
    [driversLicenseNumber] NVARCHAR(1000),
    [driversLicenseState] NVARCHAR(1000),
    [severityOfInjuriesId] NVARCHAR(1000),
    [emergencyContactId] NVARCHAR(1000),
    [policeReport] BIT,
    [leadStatusId] NVARCHAR(1000),
    [leadSpecialistId] NVARCHAR(1000),
    [leadSourceId] NVARCHAR(1000),
    CONSTRAINT [Lead_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LeadAction] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [LeadAction_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [LeadAction_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [leadId] NVARCHAR(1000),
    CONSTRAINT [LeadAction_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LeadSource] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [LeadSource_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [LeadSource_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [leadId] NVARCHAR(1000),
    CONSTRAINT [LeadSource_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LeadStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [LeadStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [LeadStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [LeadStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Severity] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Severity_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Severity_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Severity_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BodyPart] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [BodyPart_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [BodyPart_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [BodyPart_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Insurance] ADD CONSTRAINT [Insurance_leadId_fkey] FOREIGN KEY ([leadId]) REFERENCES [dbo].[Lead]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BodyPartLead] ADD CONSTRAINT [BodyPartLead_leadId_fkey] FOREIGN KEY ([leadId]) REFERENCES [dbo].[Lead]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[BodyPartLead] ADD CONSTRAINT [BodyPartLead_bodyPartId_fkey] FOREIGN KEY ([bodyPartId]) REFERENCES [dbo].[BodyPart]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LeadAction] ADD CONSTRAINT [LeadAction_leadId_fkey] FOREIGN KEY ([leadId]) REFERENCES [dbo].[Lead]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
