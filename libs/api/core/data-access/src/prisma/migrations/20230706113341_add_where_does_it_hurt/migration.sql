BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[WhereDoesItHurt] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [WhereDoesItHurt_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [WhereDoesItHurt_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [sideId] NVARCHAR(1000),
    [bodyPartId] NVARCHAR(1000),
    CONSTRAINT [WhereDoesItHurt_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WhereDoesItHurtSpecialty] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [WhereDoesItHurtSpecialty_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [WhereDoesItHurtSpecialty_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [whereDoesItHurtId] NVARCHAR(1000),
    [specialtyId] NVARCHAR(1000),
    [ordinal] INT,
    CONSTRAINT [WhereDoesItHurtSpecialty_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Side] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Side_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Side_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Side_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[WhereDoesItHurt] ADD CONSTRAINT [WhereDoesItHurt_bodyPartId_fkey] FOREIGN KEY ([bodyPartId]) REFERENCES [dbo].[BodyPart]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WhereDoesItHurt] ADD CONSTRAINT [WhereDoesItHurt_sideId_fkey] FOREIGN KEY ([sideId]) REFERENCES [dbo].[Side]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WhereDoesItHurtSpecialty] ADD CONSTRAINT [WhereDoesItHurtSpecialty_whereDoesItHurtId_fkey] FOREIGN KEY ([whereDoesItHurtId]) REFERENCES [dbo].[WhereDoesItHurt]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WhereDoesItHurtSpecialty] ADD CONSTRAINT [WhereDoesItHurtSpecialty_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
