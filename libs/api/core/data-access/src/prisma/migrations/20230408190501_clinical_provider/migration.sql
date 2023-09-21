/*
  Warnings:

  - You are about to drop the column `prescriptionId` on the `Document` table. All the data in the column will be lost.
  - You are about to alter the column `firmStatusNote` on the `Firm` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Text`.
  - You are about to drop the column `premiseAccident_DoYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart` on the `LegalCase` table. All the data in the column will be lost.
  - You are about to drop the column `premiseAccident_LossOfEarningsIsBeingFiled` on the `LegalCase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Gender` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[attorneyId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[providerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[patientId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `categoryId` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `UserCourseProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `UserCourseProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `UserCourseProgress` required. This step will fail if there are existing NULL values in that column.
  - Made the column `courseId` on table `UserCourseProgress` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Course] DROP CONSTRAINT [Course_categoryId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Document] DROP CONSTRAINT [Document_contractId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Document] DROP CONSTRAINT [Document_patientStudyId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserCourseProgress] DROP CONSTRAINT [UserCourseProgress_courseId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserCourseProgress] DROP CONSTRAINT [UserCourseProgress_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[Appointment] ADD [clinicalProviderId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Attorney] ADD [userId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Contact] ADD [address] NVARCHAR(1000),
[avatar] NVARCHAR(1000),
[background] NVARCHAR(1000),
[birthday] NVARCHAR(1000),
[company] NVARCHAR(1000),
[title] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Course] ALTER COLUMN [duration] FLOAT(53) NULL;
ALTER TABLE [dbo].[Course] ALTER COLUMN [categoryId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_duration_df] DEFAULT 0 FOR [duration], CONSTRAINT [Course_totalSteps_df] DEFAULT 0 FOR [totalSteps];

-- AlterTable
ALTER TABLE [dbo].[Document] DROP COLUMN [prescriptionId];
ALTER TABLE [dbo].[Document] ADD [medicalConditionProviderId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Feature] ADD [priceId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Firm] ALTER COLUMN [firmStatusNote] TEXT NULL;

-- AlterTable
ALTER TABLE [dbo].[LegalCase] DROP COLUMN [premiseAccident_DoYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart],
[premiseAccident_LossOfEarningsIsBeingFiled];
ALTER TABLE [dbo].[LegalCase] ADD [premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart] BIT,
[premiseAccident_lossOfEarningsIsBeingFiled] BIT;

-- AlterTable
ALTER TABLE [dbo].[Navigation] ADD [featureId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Patient] ADD [userId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Setting] ADD [value] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[User] ADD [attorneyId] NVARCHAR(1000),
[customerId] NVARCHAR(1000) NOT NULL CONSTRAINT [User_customerId_df] DEFAULT '',
[officeName] NVARCHAR(1000),
[patientId] NVARCHAR(1000),
[planId] NVARCHAR(1000) CONSTRAINT [User_planId_df] DEFAULT '',
[providerId] NVARCHAR(1000),
[signupStatus] INT NOT NULL CONSTRAINT [User_signupStatus_df] DEFAULT 0,
[verified] BIT NOT NULL CONSTRAINT [User_verified_df] DEFAULT 0;

-- AlterTable
ALTER TABLE [dbo].[UserCourseProgress] ALTER COLUMN [createdAt] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[UserCourseProgress] ALTER COLUMN [updatedAt] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[UserCourseProgress] ALTER COLUMN [userId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[UserCourseProgress] ALTER COLUMN [courseId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[UserCourseProgress] ADD CONSTRAINT [UserCourseProgress_completed_df] DEFAULT 0 FOR [completed], CONSTRAINT [UserCourseProgress_currentStep_df] DEFAULT 1 FOR [currentStep];

-- CreateTable
CREATE TABLE [dbo].[FormLayout] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FormLayout_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FormLayout_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [config] TEXT,
    [type] INT NOT NULL CONSTRAINT [FormLayout_type_df] DEFAULT 0,
    [previewImage] NVARCHAR(1000),
    [testData] TEXT,
    CONSTRAINT [FormLayout_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactKind] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContactKind_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContactKind_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ContactKind_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[NovuNotification] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [isAdmin] BIT CONSTRAINT [NovuNotification_isAdmin_df] DEFAULT 0,
    [createdAt] DATETIME2 CONSTRAINT [NovuNotification_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [NovuNotification_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [NovuNotification_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RoleNavigation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RoleNavigation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RoleNavigation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [subtitle] NVARCHAR(1000),
    [type] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [link] NVARCHAR(1000),
    [roleId] NVARCHAR(1000),
    [parentId] NVARCHAR(1000),
    [featureId] NVARCHAR(1000),
    CONSTRAINT [RoleNavigation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RoleFeature] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RoleFeature_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RoleFeature_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [featureId] NVARCHAR(1000),
    [roleId] NVARCHAR(1000),
    CONSTRAINT [RoleFeature_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FeatureNavigation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FeatureNavigation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FeatureNavigation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [subtitle] NVARCHAR(1000),
    [type] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [link] NVARCHAR(1000),
    [parentId] NVARCHAR(1000),
    [featureId] NVARCHAR(1000),
    CONSTRAINT [FeatureNavigation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RoleFeaturePermission] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RoleFeaturePermission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RoleFeaturePermission_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [featurePermissionId] NVARCHAR(1000),
    [roleId] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    CONSTRAINT [RoleFeaturePermission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Country] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Country_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Country_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [iso] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    [flagImagePos] NVARCHAR(1000),
    CONSTRAINT [Country_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[RolePermission] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [RolePermission_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [RolePermission_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [roleId] NVARCHAR(1000),
    [permissionId] NVARCHAR(1000),
    CONSTRAINT [RolePermission_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Ethnicity] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Ethnicity_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Ethnicity_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Ethnicity_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Ethnicity_name_key] UNIQUE NONCLUSTERED ([name])
);

-- CreateTable
CREATE TABLE [dbo].[Step] (
    [id] NVARCHAR(1000) NOT NULL,
    [order] INT NOT NULL,
    [title] NVARCHAR(1000),
    [subtitle] NVARCHAR(1000),
    [content] TEXT,
    [courseId] NVARCHAR(1000),
    CONSTRAINT [Step_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Translation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Translation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Translation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [languageCode] NVARCHAR(1000),
    [translation] NVARCHAR(1000),
    CONSTRAINT [Translation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tenant] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [country] NVARCHAR(1000),
    [phone] NVARCHAR(1000),
    [logo_url] NVARCHAR(1000),
    [createdAt] DATETIME2 CONSTRAINT [Tenant_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Tenant_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Tenant_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Plan] (
    [id] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [detail] NVARCHAR(1000) NOT NULL,
    [price] FLOAT(53) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Plan_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Plan_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Plan_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactEmail] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContactEmail_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContactEmail_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [email] NVARCHAR(1000),
    [name] NVARCHAR(1000),
    [contactId] NVARCHAR(1000),
    CONSTRAINT [ContactEmail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactPhoneNumber] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContactPhoneNumber_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContactPhoneNumber_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [countryId] NVARCHAR(1000),
    [phoneNumber] NVARCHAR(1000),
    [label] NVARCHAR(1000),
    [contactId] NVARCHAR(1000),
    CONSTRAINT [ContactPhoneNumber_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactSetting] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContactSetting_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContactSetting_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [value] NVARCHAR(1000),
    [iconUrl] NVARCHAR(1000),
    [properties] NVARCHAR(1000),
    [contactId] NVARCHAR(1000),
    [integrationId] NVARCHAR(1000),
    CONSTRAINT [ContactSetting_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContactTag] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContactTag_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContactTag_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [contactId] NVARCHAR(1000),
    CONSTRAINT [ContactTag_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Integration] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Integration_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Integration_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Integration_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClinicalProvider] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClinicalProvider_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClinicalProvider_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    [expertId] NVARCHAR(1000),
    [npi] NVARCHAR(1000),
    [honorific] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [suffix] NVARCHAR(1000),
    [phoneNumber] NVARCHAR(1000),
    [emailAddress] NVARCHAR(1000),
    [profilePictureId] NVARCHAR(1000),
    [compressProfilePictureId] NVARCHAR(1000),
    CONSTRAINT [ClinicalProvider_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClinicalProviderLocation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClinicalProviderLocation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClinicalProviderLocation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [locationId] NVARCHAR(1000),
    CONSTRAINT [ClinicalProviderLocation_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClinicalProviderLocationAvailability] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClinicalProviderLocationAvailability_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClinicalProviderLocationAvailability_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [day] NVARCHAR(1000),
    [startTime] NVARCHAR(1000),
    [endTime] NVARCHAR(1000),
    [clinicalProviderLocationId] NVARCHAR(1000),
    CONSTRAINT [ClinicalProviderLocationAvailability_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClinicalProviderSpecialty] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClinicalProviderSpecialty_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClinicalProviderSpecialty_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [specialtyId] NVARCHAR(1000),
    CONSTRAINT [ClinicalProviderSpecialty_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClinicalProviderTag] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClinicalProviderTag_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClinicalProviderTag_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [tagId] NVARCHAR(1000),
    CONSTRAINT [ClinicalProviderTag_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FavoriteProvider] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FavoriteProvider_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FavoriteProvider_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    [specialtyId] NVARCHAR(1000),
    CONSTRAINT [FavoriteProvider_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MedicalConditionProvider] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [MedicalConditionProvider_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [MedicalConditionProvider_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [medicalConditionId] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    CONSTRAINT [MedicalConditionProvider_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[MedicalRecord] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [MedicalRecord_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [MedicalRecord_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    CONSTRAINT [MedicalRecord_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PchProvider] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PchProvider_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PchProvider_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [clinicalProviderId] NVARCHAR(1000),
    CONSTRAINT [PchProvider_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[_NovuNotificationToUser] (
    [A] NVARCHAR(1000) NOT NULL,
    [B] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [_NovuNotificationToUser_AB_unique] UNIQUE NONCLUSTERED ([A],[B])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [_NovuNotificationToUser_B_index] ON [dbo].[_NovuNotificationToUser]([B]);

-- CreateIndex
ALTER TABLE [dbo].[Gender] ADD CONSTRAINT [Gender_name_key] UNIQUE NONCLUSTERED ([name]);

-- CreateIndex
ALTER TABLE [dbo].[Language] ADD CONSTRAINT [Language_name_key] UNIQUE NONCLUSTERED ([name]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_attorneyId_key] UNIQUE NONCLUSTERED ([attorneyId]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_providerId_key] UNIQUE NONCLUSTERED ([providerId]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_patientId_key] UNIQUE NONCLUSTERED ([patientId]);

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Contact] ADD CONSTRAINT [Contact_contactKindId_fkey] FOREIGN KEY ([contactKindId]) REFERENCES [dbo].[ContactKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_contractId_fkey] FOREIGN KEY ([contractId]) REFERENCES [dbo].[Contract]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_patientStudyId_fkey] FOREIGN KEY ([patientStudyId]) REFERENCES [dbo].[PatientStudy]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_procedureVendorId_fkey] FOREIGN KEY ([procedureVendorId]) REFERENCES [dbo].[ProcedureVendor]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_medicalConditionProviderId_fkey] FOREIGN KEY ([medicalConditionProviderId]) REFERENCES [dbo].[MedicalConditionProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RoleNavigation] ADD CONSTRAINT [RoleNavigation_featureId_fkey] FOREIGN KEY ([featureId]) REFERENCES [dbo].[Feature]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RoleNavigation] ADD CONSTRAINT [RoleNavigation_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RoleNavigation] ADD CONSTRAINT [RoleNavigation_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[RoleNavigation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RoleFeature] ADD CONSTRAINT [RoleFeature_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RoleFeature] ADD CONSTRAINT [RoleFeature_featureId_fkey] FOREIGN KEY ([featureId]) REFERENCES [dbo].[Feature]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id])  ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_providerId_fkey] FOREIGN KEY ([providerId]) REFERENCES [dbo].[ClinicalProvider]([id])  ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_attorneyId_fkey] FOREIGN KEY ([attorneyId]) REFERENCES [dbo].[Attorney]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_planId_fkey] FOREIGN KEY ([planId]) REFERENCES [dbo].[Plan]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeatureNavigation] ADD CONSTRAINT [FeatureNavigation_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[FeatureNavigation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[RoleFeaturePermission] ADD CONSTRAINT [RoleFeaturePermission_featurePermissionId_fkey] FOREIGN KEY ([featurePermissionId]) REFERENCES [dbo].[FeaturePermission]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RoleFeaturePermission] ADD CONSTRAINT [RoleFeaturePermission_roleId_fkey] FOREIGN KEY ([roleId]) REFERENCES [dbo].[Role]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[RolePermission] ADD CONSTRAINT [RolePermission_permissionId_fkey] FOREIGN KEY ([permissionId]) REFERENCES [dbo].[Permission]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[AcademyCategory]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_ethnicityId_fkey] FOREIGN KEY ([ethnicityId]) REFERENCES [dbo].[Ethnicity]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Step] ADD CONSTRAINT [Step_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCourseProgress] ADD CONSTRAINT [UserCourseProgress_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCourseProgress] ADD CONSTRAINT [UserCourseProgress_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContactEmail] ADD CONSTRAINT [ContactEmail_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContactPhoneNumber] ADD CONSTRAINT [ContactPhoneNumber_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContactPhoneNumber] ADD CONSTRAINT [ContactPhoneNumber_countryId_fkey] FOREIGN KEY ([countryId]) REFERENCES [dbo].[Country]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContactSetting] ADD CONSTRAINT [ContactSetting_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContactSetting] ADD CONSTRAINT [ContactSetting_integrationId_fkey] FOREIGN KEY ([integrationId]) REFERENCES [dbo].[Integration]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContactTag] ADD CONSTRAINT [ContactTag_contactId_fkey] FOREIGN KEY ([contactId]) REFERENCES [dbo].[Contact]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ChatUsers] ADD CONSTRAINT [ChatUsers_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderLocation] ADD CONSTRAINT [ClinicalProviderLocation_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderLocationAvailability] ADD CONSTRAINT [ClinicalProviderLocationAvailability_clinicalProviderLocationId_fkey] FOREIGN KEY ([clinicalProviderLocationId]) REFERENCES [dbo].[ClinicalProviderLocation]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderSpecialty] ADD CONSTRAINT [ClinicalProviderSpecialty_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderTag] ADD CONSTRAINT [ClinicalProviderTag_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClinicalProviderTag] ADD CONSTRAINT [ClinicalProviderTag_tagId_fkey] FOREIGN KEY ([tagId]) REFERENCES [dbo].[Tag]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FavoriteProvider] ADD CONSTRAINT [FavoriteProvider_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MedicalConditionProvider] ADD CONSTRAINT [MedicalConditionProvider_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[MedicalRecord] ADD CONSTRAINT [MedicalRecord_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PchProvider] ADD CONSTRAINT [PchProvider_clinicalProviderId_fkey] FOREIGN KEY ([clinicalProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_NovuNotificationToUser] ADD CONSTRAINT [_NovuNotificationToUser_A_fkey] FOREIGN KEY ([A]) REFERENCES [dbo].[NovuNotification]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[_NovuNotificationToUser] ADD CONSTRAINT [_NovuNotificationToUser_B_fkey] FOREIGN KEY ([B]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
