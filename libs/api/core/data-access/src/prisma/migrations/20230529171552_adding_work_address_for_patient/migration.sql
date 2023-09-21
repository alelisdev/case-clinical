BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Patient] ADD [workAddressCity] NVARCHAR(1000),
[workAddressLine1] NVARCHAR(1000),
[workAddressLine2] NVARCHAR(1000),
[workAddressPostalCode] NVARCHAR(1000),
[workAddressStateOrProvince] NVARCHAR(1000),
[workEmailAddress] NVARCHAR(1000),
[workLatitude] FLOAT(53),
[workLongitude] FLOAT(53);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
