BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Lead] ADD [legalCaseId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[EligibilityRequest] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [EligibilityRequest_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [EligibilityRequest_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [providerId] NVARCHAR(1000),
    [specialtyId] NVARCHAR(1000),
    [locationId] NVARCHAR(1000),
    [visitTypeId] NVARCHAR(1000),
    [taxID] NVARCHAR(1000),
    [dateOfBirth] DATETIME2,
    [memberRegistrationNumber] NVARCHAR(1000),
    [eligibilityStatusId] NVARCHAR(1000),
    CONSTRAINT [EligibilityRequest_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[EligibilityStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [EligibilityStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [EligibilityStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [EligibilityStatus_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Lead] ADD CONSTRAINT [Lead_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[EligibilityRequest] ADD CONSTRAINT [EligibilityRequest_eligibilityStatusId_fkey] FOREIGN KEY ([eligibilityStatusId]) REFERENCES [dbo].[EligibilityStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
