BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[MedicalCondition] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [MedicalCondition_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [MedicalCondition_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [MedicalCondition_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[MedicalConditionProvider] ADD CONSTRAINT [MedicalConditionProvider_medicalConditionId_fkey] FOREIGN KEY ([medicalConditionId]) REFERENCES [dbo].[MedicalCondition]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
