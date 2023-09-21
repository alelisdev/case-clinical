BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderLocation] ADD CONSTRAINT [ClinicalProviderLocation_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderSpecialty] ADD CONSTRAINT [ClinicalProviderSpecialty_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
