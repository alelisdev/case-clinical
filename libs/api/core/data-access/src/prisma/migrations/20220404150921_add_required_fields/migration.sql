BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[LegalCase] ADD [medLevelId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[MedLevel] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [MedLevel_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [MedLevel_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [approvedSiteCosts] FLOAT(53),
    [maximumMedicalBillsToDate] FLOAT(53),
    CONSTRAINT [MedLevel_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RequiredField] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RequiredField_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RequiredField_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [entityName] NVARCHAR(1000),
    [accidentTypeId] NVARCHAR(1000),
    [medLevelId] NVARCHAR(1000),
    CONSTRAINT [RequiredField_pkey] PRIMARY KEY ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_medLevelId_fkey] FOREIGN KEY ([medLevelId]) REFERENCES [dbo].[MedLevel]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RequiredField] ADD CONSTRAINT [RequiredField_accidentTypeId_fkey] FOREIGN KEY ([accidentTypeId]) REFERENCES [dbo].[AccidentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RequiredField] ADD CONSTRAINT [RequiredField_medLevelId_fkey] FOREIGN KEY ([medLevelId]) REFERENCES [dbo].[MedLevel]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
