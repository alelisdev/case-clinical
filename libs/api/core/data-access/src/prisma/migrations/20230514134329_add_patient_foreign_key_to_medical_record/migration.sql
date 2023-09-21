BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[MedicalRecord] ADD [patientId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteProvider] ADD CONSTRAINT [FavoriteProvider_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MedicalRecord] ADD CONSTRAINT [MedicalRecord_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
