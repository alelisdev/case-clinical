BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Claim] ADD [insuredDob] NVARCHAR(1000),
[insuredIdNumber] NVARCHAR(1000),
[insuredPhoneNumber] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[ClinicalProvider] ADD [caqhNumber] NVARCHAR(1000),
[stateLicenseNumber] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
