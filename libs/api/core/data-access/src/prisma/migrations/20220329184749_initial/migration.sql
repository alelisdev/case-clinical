/*
  Warnings:

  - You are about to drop the column `billUrl` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `line1` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `locationName` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `medicalReportUrl` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `calendarDrawerMode` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `calendarEventEditMode` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `calendarEventPanelMode` on the `Calendar` table. All the data in the column will be lost.
  - You are about to drop the column `completionNotes` on the `TaskItem` table. All the data in the column will be lost.
  - You are about to drop the column `genderId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weatherZip` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_Appointment_calendars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[prescriptionId]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_Appointment_calendars] DROP CONSTRAINT [FK___Appointment_calendars__A];

-- DropForeignKey
ALTER TABLE [dbo].[_Appointment_calendars] DROP CONSTRAINT [FK___Appointment_calendars__B];

-- DropForeignKey
ALTER TABLE [dbo].[Email] DROP CONSTRAINT [FK__Email__ownerId];

-- DropForeignKey
ALTER TABLE [dbo].[Task] DROP CONSTRAINT [FK__Task__appointmentId];

-- DropForeignKey
ALTER TABLE [dbo].[TaskItem] DROP CONSTRAINT [FK__TaskItem__assignedToId];

-- DropForeignKey
ALTER TABLE [dbo].[User] DROP CONSTRAINT [FK__User__genderId];

-- DropIndex
ALTER TABLE [dbo].[Email] DROP CONSTRAINT [Email_email_unique];

-- DropIndex
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_username_unique];

-- DropIndex
ALTER TABLE [dbo].[UserCalendar] DROP CONSTRAINT [UserCalendar_calendarId_unique];

-- DropIndex
ALTER TABLE [dbo].[UserCalendar] DROP CONSTRAINT [UserCalendar_teamId_unique];

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Appointment__id', N'Appointment_pkey';
ALTER TABLE [dbo].[Appointment] DROP COLUMN [billUrl],
[city],
[latitude],
[line1],
[locationName],
[longitude],
[medicalReportUrl],
[postalCode],
[state];
ALTER TABLE [dbo].[Appointment] ADD [calendarId] NVARCHAR(1000),
[legalCaseId] NVARCHAR(1000);

-- AlterTable
EXEC SP_RENAME N'dbo.PK__AppointmentStatus__id', N'AppointmentStatus_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Calendar__id', N'Calendar_pkey';
ALTER TABLE [dbo].[Calendar] DROP COLUMN [calendarDrawerMode],
[calendarEventEditMode],
[calendarEventPanelMode];

-- AlterTable
EXEC SP_RENAME N'dbo.PK__CalendarType__id', N'CalendarType_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__CalendarWeekday__id', N'CalendarWeekday_pkey';
ALTER TABLE [dbo].[CalendarWeekday] ALTER COLUMN [createdAt] DATETIME2 NULL;
ALTER TABLE [dbo].[CalendarWeekday] ALTER COLUMN [updatedAt] DATETIME2 NULL;

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Contact__id', N'Contact_pkey';
ALTER TABLE [dbo].[Contact] ALTER COLUMN [dateOfBirth] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Contact] ADD [adjuster] NVARCHAR(1000),
[insured] NVARCHAR(1000),
[intake] NVARCHAR(1000);

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Document__id', N'Document_pkey';
ALTER TABLE [dbo].[Document] ADD [contractId] NVARCHAR(1000),
[patientId] NVARCHAR(1000),
[patientStudyId] NVARCHAR(1000),
[prescriptionId] NVARCHAR(1000),
[procedureVendorId] NVARCHAR(1000),
[providerId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[Email] DROP CONSTRAINT [DF__Email__isPublic],
[DF__Email__primary],
[DF__Email__verified];
EXEC SP_RENAME N'dbo.PK__Email__id', N'Email_pkey';
ALTER TABLE [dbo].[Email] ALTER COLUMN [createdAt] DATETIME2 NULL;
ALTER TABLE [dbo].[Email] ALTER COLUMN [updatedAt] DATETIME2 NULL;
ALTER TABLE [dbo].[Email] ALTER COLUMN [email] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Email] ALTER COLUMN [isPublic] BIT NULL;
ALTER TABLE [dbo].[Email] ALTER COLUMN [primary] BIT NULL;
ALTER TABLE [dbo].[Email] ALTER COLUMN [verified] BIT NULL;
ALTER TABLE [dbo].[Email] ALTER COLUMN [ownerId] NVARCHAR(1000) NULL;

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Gender__id', N'Gender_pkey';
ALTER TABLE [dbo].[Gender] ALTER COLUMN [createdAt] DATETIME2 NULL;
ALTER TABLE [dbo].[Gender] ALTER COLUMN [updatedAt] DATETIME2 NULL;
ALTER TABLE [dbo].[Gender] ADD [code] NVARCHAR(1000),
[value] INT;

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Role__id', N'Role_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Setting__id', N'Setting_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__TaskItem__id', N'TaskItem_pkey';
ALTER TABLE [dbo].[TaskItem] DROP COLUMN [completionNotes];
ALTER TABLE [dbo].[TaskItem] ADD [legalCaseId] NVARCHAR(1000),
[notes] NVARCHAR(1000),
[order] INT,
[priority] INT,
[type] NVARCHAR(1000);

-- AlterTable
EXEC SP_RENAME N'dbo.PK__Team__id', N'Team_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__TeamRole__id', N'TeamRole_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__TeamUser__id', N'TeamUser_pkey';

-- AlterTable
ALTER TABLE [dbo].[User] DROP CONSTRAINT [DF__User__developer];
EXEC SP_RENAME N'dbo.PK__User__id', N'User_pkey';
ALTER TABLE [dbo].[User] ALTER COLUMN [createdAt] DATETIME2 NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [updatedAt] DATETIME2 NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [developer] BIT NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [username] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[User] DROP COLUMN [genderId],
[location],
[weatherZip];
ALTER TABLE [dbo].[User] ADD [name] NVARCHAR(1000),
[status] NVARCHAR(1000);

-- AlterTable
EXEC SP_RENAME N'dbo.PK__UserCalendar__id', N'UserCalendar_pkey';

-- AlterTable
EXEC SP_RENAME N'dbo.PK__UserRole__id', N'UserRole_pkey';

-- DropTable
DROP TABLE [dbo].[_Appointment_calendars];

-- DropTable
DROP TABLE [dbo].[Task];

-- CreateTable
CREATE TABLE [dbo].[AssignedDocument] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AssignedDocument_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AssignedDocument_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [expirationDate] DATETIME2,
    [entityName] NVARCHAR(1000),
    [entityId] NVARCHAR(1000),
    [documentId] NVARCHAR(1000),
    [templateId] NVARCHAR(1000),
    [documentTypeId] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    CONSTRAINT [AssignedDocument_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Chat] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Chat_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Chat_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    [unreadCount] INT,
    [muted] BIT,
    [lastMessage] NVARCHAR(1000),
    [lastMessageAt] NVARCHAR(1000),
    CONSTRAINT [Chat_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[DocumentType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [DocumentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [DocumentType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [DocumentType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Message] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Message_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Message_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [link] NVARCHAR(1000),
    [useRouter] BIT,
    [time] DATETIME2,
    [read] BIT,
    [isMine] BIT,
    [userId] NVARCHAR(1000),
    [chatId] NVARCHAR(1000),
    CONSTRAINT [Message_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Navigation] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Navigation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Navigation_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [subtitle] NVARCHAR(1000),
    [type] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [link] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    [parentId] NVARCHAR(1000),
    CONSTRAINT [Navigation_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Notification] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Notification_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Notification_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [type] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [image] NVARCHAR(1000),
    [link] NVARCHAR(1000),
    [useRouter] BIT,
    [time] DATETIME2,
    [read] BIT,
    [userId] NVARCHAR(1000),
    CONSTRAINT [Notification_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Shortcut] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Shortcut_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Shortcut_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [label] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [icon] NVARCHAR(1000),
    [link] NVARCHAR(1000),
    [useRouter] BIT,
    [userId] NVARCHAR(1000),
    CONSTRAINT [Shortcut_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Tag] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Tag_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Tag_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Tag_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TaskTag] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [TaskTag_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [TaskTag_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [taskId] NVARCHAR(1000),
    [tagId] NVARCHAR(1000),
    CONSTRAINT [TaskTag_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Template] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Template_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Template_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [attachment] NVARCHAR(1000),
    [encoding] NVARCHAR(1000),
    [signatureFileType] NVARCHAR(1000),
    CONSTRAINT [Template_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[TimeEntry] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [TimeEntry_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [TimeEntry_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [date] DATETIME2,
    [rate] FLOAT(53),
    [hours] FLOAT(53),
    [description] NVARCHAR(1000),
    [isBilled] BIT,
    CONSTRAINT [TimeEntry_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AcademyCategory] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AcademyCategory_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AcademyCategory_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [slug] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    CONSTRAINT [AcademyCategory_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AccidentType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AccidentType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AccidentType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AccidentType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AccountStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AccountStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AccountStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AccountStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AdverseInsuranceStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AdverseInsuranceStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AdverseInsuranceStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AdverseInsuranceStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AgreementType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AgreementType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AgreementType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AgreementType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Attorney] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Attorney_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Attorney_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [firmId] NVARCHAR(1000),
    [attorneyStatusId] NVARCHAR(1000),
    [attorneyTypeId] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [direct] NVARCHAR(1000),
    [fax] NVARCHAR(1000),
    [cellPhone] NVARCHAR(1000),
    [barNumber] NVARCHAR(1000),
    [barState] NVARCHAR(1000),
    [doNotDisturb] BIT,
    [temp] NVARCHAR(1000),
    [createdById] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [removed] BIT,
    [migSource] NVARCHAR(1000),
    [entity] NVARCHAR(1000),
    [firmNolongerNeeded] BIT,
    CONSTRAINT [Attorney_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AttorneyStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AttorneyStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AttorneyStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AttorneyStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[AttorneyType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [AttorneyType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [AttorneyType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [AttorneyType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CalculationBasisType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CalculationBasisType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CalculationBasisType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [CalculationBasisType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseAccount] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CaseAccount_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CaseAccount_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [locationId] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    [accountStatusId] NVARCHAR(1000),
    [procedureTypeId] NVARCHAR(1000),
    [agreementTypeId] NVARCHAR(1000),
    [accountAgentId] NVARCHAR(1000),
    [internalAgentId] NVARCHAR(1000),
    [contractId] NVARCHAR(1000),
    [parentAccountId] NVARCHAR(1000),
    [portfolioId] NVARCHAR(1000),
    [thirdPartyFunderName] NVARCHAR(1000),
    [originalDueDate] DATETIME2,
    [accountTerm] INT,
    [serviceDate] DATETIME2,
    [quantity] INT,
    [originalDebt] FLOAT(53),
    [cost] FLOAT(53),
    [balance] FLOAT(53),
    [lastBalance] FLOAT(53),
    [reduction] FLOAT(53),
    [treatmentState] NVARCHAR(1000),
    [accountNumber] NVARCHAR(1000),
    [servicesPerformed] NVARCHAR(1000),
    [cptCodes] NVARCHAR(1000),
    [outsideBrokerFlatFee] FLOAT(53),
    [outsideBrokerRate] FLOAT(53),
    [outsideBrokerMultiply] NVARCHAR(1000),
    [insideBrokerRate] FLOAT(53),
    [insideBrokerMultiply] NVARCHAR(1000),
    [providerTxnID] NVARCHAR(1000),
    [minPerformanceRate] FLOAT(53),
    [minPerformanceFlatFee] FLOAT(53),
    [thresholdRate] FLOAT(53),
    [thresholdFlatFee] FLOAT(53),
    [expectedPmtRate] FLOAT(53),
    [expectedPmtFlatFee] FLOAT(53),
    [wcFeeSchedule] FLOAT(53),
    [interestRate] FLOAT(53),
    [treatingPhysician] NVARCHAR(1000),
    [referringPhysician] NVARCHAR(1000),
    [servicingFeePercent] FLOAT(53),
    [paidToPlaintiff] FLOAT(53),
    [ifgDefaultServiceFee] FLOAT(53),
    [assigneePaysToAssignor] FLOAT(53),
    [projectedPayoffDate] NVARCHAR(1000),
    [collectionsDate] DATETIME2,
    [deemedWriteOffDate] DATETIME2,
    [expensedBadDebtDate] DATETIME2,
    [unExpensedBadDebtDate] DATETIME2,
    [bageledDate] DATETIME2,
    [mDSContractDate] DATETIME2,
    [reOpenedDate] DATETIME2,
    [ifgAdvanceDate] DATETIME2,
    [paidDate] DATETIME2,
    [qbTxnId] NVARCHAR(1000),
    [qbEditSequence] NVARCHAR(1000),
    [qbJournalDate] DATETIME2,
    [refundQBTxnId] NVARCHAR(1000),
    [refundQBEditSequence] NVARCHAR(1000),
    [refundQBJournalDate] DATETIME2,
    [ghostAccount] BIT,
    [ghostedDate] DATETIME2,
    [ghostedBy] NVARCHAR(1000),
    [unGhostedDate] DATETIME2,
    [unGhostedBy] NVARCHAR(1000),
    [excludeFromBorrowingBase] BIT,
    [additionalPayment] BIT,
    [missingBill] BIT,
    [missingLien] BIT,
    [missingMedicalRecords] BIT,
    [assignedTo] NVARCHAR(1000),
    [resubmitted] DATETIME2,
    [overageId] NVARCHAR(1000),
    [temp] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [removed] BIT,
    [securitizationGroup] NVARCHAR(1000),
    [outsideAgentId] NVARCHAR(1000),
    [defaultTeamLead] INT,
    [defaultTeamLeaderRate] FLOAT(53),
    [treatmentCity] NVARCHAR(1000),
    [origination] INT,
    [thresholdProviderRate] FLOAT(53),
    [thresholdLocationRate] FLOAT(53),
    [teamLeaderRateSource] NVARCHAR(1000),
    [checkNumber] NVARCHAR(1000),
    [accountDateReceived] DATETIME2,
    [dateApplied] DATETIME2,
    [amountApplied] FLOAT(53),
    [taxable] BIT,
    [reimbursable] BIT,
    [taxRate] FLOAT(53),
    [time] FLOAT(53),
    [rate] FLOAT(53),
    [expenseAmount] FLOAT(53),
    [count] FLOAT(53),
    [description] NVARCHAR(1000),
    [note] NVARCHAR(1000),
    [medicareRate] FLOAT(53),
    [providerPercentOfMedicare] FLOAT(53),
    [contractedAmount] FLOAT(53),
    [markupPercent] FLOAT(53),
    [reimbursedTotal] FLOAT(53),
    [initialRevenue] FLOAT(53),
    [factor] FLOAT(53),
    [retailBill] FLOAT(53),
    [estMargin] FLOAT(53),
    [roi] FLOAT(53),
    [attorneyPaid] FLOAT(53),
    [percentOfRetail] FLOAT(53),
    [reimbursedFromPCR] FLOAT(53),
    [ingredientCost] FLOAT(53),
    [dispensingCost] FLOAT(53),
    [administrativeCost] FLOAT(53),
    [coPay] FLOAT(53),
    [totalCost] FLOAT(53),
    [averageWholesalePrice] FLOAT(53),
    [weightedAverageCost] FLOAT(53),
    [averageSalePrice] FLOAT(53),
    [invoiceCost] FLOAT(53),
    [usualAndCustomary] FLOAT(53),
    [nationalDrugCode] NVARCHAR(1000),
    [procedureVendorId] NVARCHAR(1000),
    CONSTRAINT [CaseAccount_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CasePreAccident] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CasePreAccident_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CasePreAccident_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [accidentDate] NVARCHAR(1000),
    [injuries] NVARCHAR(1000),
    [symptoms] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [removed] BIT,
    CONSTRAINT [CasePreAccident_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CasePreInjury] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CasePreInjury_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CasePreInjury_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [affectsInjury] BIT,
    [injuryDate] NVARCHAR(1000),
    [injured] NVARCHAR(1000),
    [anatomic] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [removed] BIT,
    CONSTRAINT [CasePreInjury_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CasePreProblem] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CasePreProblem_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CasePreProblem_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [sameRegion] BIT,
    [problemDate] DATETIME2,
    [duration] NVARCHAR(1000),
    [symptoms] NVARCHAR(1000),
    [regions] NVARCHAR(1000),
    [removed] BIT,
    CONSTRAINT [CasePreProblem_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CasePreProcedure] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CasePreProcedure_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CasePreProcedure_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [procedureType] NVARCHAR(1000),
    [procedureDate] DATETIME2,
    [dateCreated] DATETIME2,
    [removed] BIT,
    CONSTRAINT [CasePreProcedure_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseProcedure] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CaseProcedure_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CaseProcedure_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [locationId] NVARCHAR(1000),
    [procedureDate] DATETIME2,
    [cost] FLOAT(53),
    [notes] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [removed] BIT,
    [approvedDate] DATETIME2,
    [procedureReasonName] NVARCHAR(1000),
    [decisionDate] DATETIME2,
    [nextActionDate] DATETIME2,
    CONSTRAINT [CaseProcedure_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseProgressStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CaseProgressStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CaseProgressStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [CaseProgressStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CaseStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CaseStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [orderIndex] INT,
    [color] NVARCHAR(1000),
    [isDefault] BIT,
    [tickerDate] INT,
    [maxTickerDate] INT,
    [moveDocs] BIT,
    [dateCreated] DATETIME2,
    [removed] BIT,
    [createdBy] NVARCHAR(1000),
    [migSource] NVARCHAR(1000),
    [entity] NVARCHAR(1000),
    [temp] NVARCHAR(1000),
    CONSTRAINT [CaseStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[CaseType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [CaseType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [CaseType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [orderIndex] INT,
    [dateCreated] DATETIME2,
    [removed] BIT,
    [migSource] NVARCHAR(1000),
    [entity] NVARCHAR(1000),
    [temp] NVARCHAR(1000),
    CONSTRAINT [CaseType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Claim] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Claim_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Claim_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [originalRecordDate] DATETIME2,
    [receivedDate] DATETIME2,
    [dueDate] DATETIME2,
    [patientName] NVARCHAR(1000),
    [patientDob] NVARCHAR(1000),
    [patientAddressLine1] NVARCHAR(1000),
    [patientAddressCity] NVARCHAR(1000),
    [patientAddressState] NVARCHAR(1000),
    [patientAddressPostalCode] NVARCHAR(1000),
    [carrierName] NVARCHAR(1000),
    [carrierLine1] NVARCHAR(1000),
    [carrierLine2] NVARCHAR(1000),
    [carrierCity] NVARCHAR(1000),
    [carrierState] NVARCHAR(1000),
    [carrierPostalCode] NVARCHAR(1000),
    [insuredName] NVARCHAR(1000),
    [insuredLine1] NVARCHAR(1000),
    [insuredCity] NVARCHAR(1000),
    [insuredState] NVARCHAR(1000),
    [insuredPostalCode] NVARCHAR(1000),
    [patientSignature] NVARCHAR(1000),
    [diagnosisCode1] NVARCHAR(1000),
    [diagnosisCode2] NVARCHAR(1000),
    [diagnosisCode3] NVARCHAR(1000),
    [diagnosisCode4] NVARCHAR(1000),
    [diagnosisCode5] NVARCHAR(1000),
    [diagnosisCode6] NVARCHAR(1000),
    [diagnosisCode7] NVARCHAR(1000),
    [diagnosisCode8] NVARCHAR(1000),
    [federalTaxId] NVARCHAR(1000),
    [totalCharges] NVARCHAR(1000),
    [amountPaid] NVARCHAR(1000),
    [physicianSignature] NVARCHAR(1000),
    [physicianSignedOn] NVARCHAR(1000),
    [serviceFacility] NVARCHAR(1000),
    [serviceFacilityLine1] NVARCHAR(1000),
    [serviceFacilityCity] NVARCHAR(1000),
    [serviceFacilityState] NVARCHAR(1000),
    [serviceFacilityPostalCode] NVARCHAR(1000),
    [serviceFacilityNpi] NVARCHAR(1000),
    [billingFacility] NVARCHAR(1000),
    [billingLine1] NVARCHAR(1000),
    [billingCity] NVARCHAR(1000),
    [billingState] NVARCHAR(1000),
    [billingPostalCode] NVARCHAR(1000),
    [billingNpi] NVARCHAR(1000),
    [billingPhoneNumber] NVARCHAR(1000),
    [billingOther] NVARCHAR(1000),
    [sessionNotes] NVARCHAR(1000),
    [referringProvider] NVARCHAR(1000),
    [referringProviderNpi] NVARCHAR(1000),
    [additionalClaimInfo] NVARCHAR(1000),
    [accountNumber] NVARCHAR(1000),
    [referenceNumber] NVARCHAR(1000),
    [facility] NVARCHAR(1000),
    [priorAuthorizationNumber] NVARCHAR(1000),
    [providerName] NVARCHAR(1000),
    [providerNumber] NVARCHAR(1000),
    [vendor] NVARCHAR(1000),
    [vendorLine1] NVARCHAR(1000),
    [vendorCSZ] NVARCHAR(1000),
    [vendorTaxId] NVARCHAR(1000),
    [totalApprovedAmount] FLOAT(53),
    [totalBilledAmount] FLOAT(53),
    [totalNetPayAmount] FLOAT(53),
    [notes] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    CONSTRAINT [Claim_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClaimProcedure] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClaimProcedure_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClaimProcedure_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [claimProcedureCodeId] NVARCHAR(1000),
    [procedureCodeId] NVARCHAR(1000),
    [claimId] NVARCHAR(1000),
    [fromDateOfService] DATETIME2,
    [toDateOfService] DATETIME2,
    [placeOfServiceId] NVARCHAR(1000),
    [nationalDrugCode] NVARCHAR(1000),
    [drugUnit] NVARCHAR(1000),
    [drugQuantity] NVARCHAR(1000),
    [quantity] INT,
    [billedAmount] FLOAT(53),
    [approvedAmount] FLOAT(53),
    [adjustmentAmount] FLOAT(53),
    [netPaymentAmount] FLOAT(53),
    [paymentMethod] NVARCHAR(1000),
    [internalMemo] NVARCHAR(1000),
    [explainationOfBenefitsComment] NVARCHAR(1000),
    [claimStatusId] NVARCHAR(1000),
    [reason] NVARCHAR(1000),
    [procedureCode] NVARCHAR(1000),
    [diagnosisPointer] NVARCHAR(1000),
    [modifier1] NVARCHAR(1000),
    [modifier2] NVARCHAR(1000),
    [modifier3] NVARCHAR(1000),
    [modifier4] NVARCHAR(1000),
    CONSTRAINT [ClaimProcedure_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ClaimStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ClaimStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ClaimStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ClaimStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Contract] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Contract_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Contract_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [organizationId] NVARCHAR(1000),
    [billingOrganizationId] NVARCHAR(1000),
    [templateId] NVARCHAR(1000),
    [billOnBehalf] BIT,
    [billRate] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    [contractDate] DATETIME2,
    [maturityDate] DATETIME2,
    [requiresTpaMedicalNecessity] BIT,
    [requiresTpaMedicareAllowable] BIT,
    [reconciliationPeriodTypeId] NVARCHAR(1000),
    [calculationBasisTypeId] NVARCHAR(1000),
    [signed] BIT,
    [processId] NVARCHAR(1000),
    CONSTRAINT [Contract_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContractedRate] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContractedRate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContractedRate_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [amount] FLOAT(53),
    [percentage] FLOAT(53),
    [reimbursedRate] FLOAT(53),
    [billOnBehalf] BIT,
    [contractId] NVARCHAR(1000),
    [contractedRateKindId] NVARCHAR(1000),
    [contractKindId] NVARCHAR(1000),
    CONSTRAINT [ContractedRate_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContractedRateKind] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContractedRateKind_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContractedRateKind_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    [value] INT,
    CONSTRAINT [ContractedRateKind_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContractKind] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContractKind_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContractKind_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ContractKind_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ContractTerm] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ContractTerm_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ContractTerm_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [maxApproved] FLOAT(53),
    [numberIncluded] INT,
    [factor] FLOAT(53),
    [contractTermId] NVARCHAR(1000),
    CONSTRAINT [ContractTerm_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Course] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Course_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Course_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [slug] NVARCHAR(1000),
    [title] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [duration] INT,
    [totalSteps] INT,
    [featured] BIT,
    [content] NVARCHAR(1000),
    [categoryId] NVARCHAR(1000),
    CONSTRAINT [Course_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FacilityFeeSchedule] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FacilityFeeSchedule_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FacilityFeeSchedule_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [organizationId] NVARCHAR(1000),
    [specialtyId] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    [modifier] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [medicareFacilityRate] FLOAT(53),
    [facilityFee] FLOAT(53),
    [baseUnit] FLOAT(53),
    [profCf] FLOAT(53),
    CONSTRAINT [FacilityFeeSchedule_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FeeSchedule] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FeeSchedule_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FeeSchedule_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [organizationId] NVARCHAR(1000),
    [specialtyId] NVARCHAR(1000),
    [code] NVARCHAR(1000),
    [modifier] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [medicarePhysicianNonFacilityRate] FLOAT(53),
    [physicianNonFacilityFee] FLOAT(53),
    [medicarePhysicianFacilityRate] FLOAT(53),
    [physicianFacilityFee] FLOAT(53),
    [baseUnit] NVARCHAR(1000),
    [profCf] NVARCHAR(1000),
    CONSTRAINT [FeeSchedule_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Firm] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Firm_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Firm_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [firmStatusNote] NVARCHAR(1000),
    [firmStatusId] NVARCHAR(1000),
    [firmName] NVARCHAR(1000),
    [address] NVARCHAR(1000),
    [address2] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [zip] NVARCHAR(1000),
    [country] NVARCHAR(1000),
    [office] NVARCHAR(1000),
    [fax] NVARCHAR(1000),
    [webAddress] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [rating] FLOAT(53),
    [notes] NVARCHAR(1000),
    [doNotDisturb] BIT,
    [invoiceOnly] BIT,
    [reductionNotes] NVARCHAR(1000),
    [deceased] BIT,
    [createdBy] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    CONSTRAINT [Firm_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[FirmStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [FirmStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [FirmStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [blackListed] BIT,
    [active] BIT,
    [statusColor] NVARCHAR(1000),
    CONSTRAINT [FirmStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[HealthInsurance] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [HealthInsurance_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [HealthInsurance_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [healthInsuranceKind] NVARCHAR(1000),
    [identificationGroupNumber] NVARCHAR(1000),
    [mediCalNumber] NVARCHAR(1000),
    [medicareNumber] NVARCHAR(1000),
    [policyNumber] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    CONSTRAINT [HealthInsurance_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Insurance] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Insurance_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Insurance_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [insuranceTypeId] NVARCHAR(1000),
    [insuranceSectorId] NVARCHAR(1000),
    [policyNumber] NVARCHAR(1000),
    [insuranceCompany] NVARCHAR(1000),
    [minimumCoverageAmount] FLOAT(53),
    [maximumCoverageAmount] FLOAT(53),
    [isStackable] BIT,
    [adjuster] NVARCHAR(1000),
    CONSTRAINT [Insurance_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[InsuranceSector] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [InsuranceSector_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [InsuranceSector_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [InsuranceSector_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[InsuranceType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [InsuranceType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [InsuranceType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [InsuranceType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Language] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Language_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Language_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Language_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[LegalCase] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [LegalCase_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [LegalCase_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    [accidentTypeId] NVARCHAR(1000),
    [firmId] NVARCHAR(1000),
    [attorneyId] NVARCHAR(1000),
    [agentId] NVARCHAR(1000),
    [caseStatusId] NVARCHAR(1000),
    [caseTypeId] NVARCHAR(1000),
    [patientTreatmentStatusId] NVARCHAR(1000),
    [dateOfLoss] DATETIME2,
    [caseStatusDate] DATETIME2,
    [caseStatusOther] NVARCHAR(1000),
    [paralegal] NVARCHAR(1000),
    [paralegalContact] NVARCHAR(1000),
    [caseNoteSummary] NVARCHAR(1000),
    [policyLimit] FLOAT(53),
    [attorneyFee] FLOAT(53),
    [referringPhysician] NVARCHAR(1000),
    [noMoreTreatment] BIT,
    [medpay] BIT,
    [fileNumber] NVARCHAR(1000),
    [caseNumber] NVARCHAR(1000),
    [accidentState] NVARCHAR(1000),
    [assignedTo] NVARCHAR(1000),
    [attorneyPaid] BIT,
    [attorneySentDate] DATETIME2,
    [writeOff] BIT,
    [noMRI] BIT,
    [noPT] BIT,
    [noFirstAppointment] BIT,
    [hot] BIT,
    [documentsUploaded] BIT,
    [attorneyReview] BIT,
    [escalatedReview] BIT,
    [inActive] BIT,
    [criteria1712] BIT,
    [documentUploadedDate] DATETIME2,
    [patientDischargedGatheringRecordsDate] DATETIME2,
    [resubmitted] DATETIME2,
    [caseProgressStatusId] NVARCHAR(1000),
    [firmCaseManager] NVARCHAR(1000),
    [adverseInsuranceStatusId] NVARCHAR(1000),
    [createdBy] NVARCHAR(1000),
    [renegotiatePayOffDate] DATETIME2,
    [underwriting_dateCreated] DATETIME2,
    [underwriting_lastUpdateDate] DATETIME2,
    [underwriting_timeSensitive] BIT,
    [underwriting_needsMoreInfo] INT,
    [underwriting_billsAttached] BIT,
    [underwriting_completedMedRecs] BIT,
    [underwriting_balance] FLOAT(53),
    [underwriting_signedLien] BIT,
    [underwriting_procedureRequested] NVARCHAR(1000),
    [underwriting_medBills] NVARCHAR(1000),
    [underwriting_estimate] BIT,
    [underwriting_plaintiff] NVARCHAR(1000),
    [underwriting_covered] NVARCHAR(1000),
    [underwriting_remarks] NVARCHAR(1000),
    [accidentInformation_accidentTypeId] NVARCHAR(1000),
    [accidentInformation_accidentDescription] NVARCHAR(1000),
    [accidentInformation_dateOfLoss] DATETIME2,
    [accidentInformation_review] NVARCHAR(1000),
    [accidentInformation_initialEvaluation] NVARCHAR(1000),
    [accidentInformation_evaluation] NVARCHAR(1000),
    [accidentInformation_evaluationAfterHowLong] NVARCHAR(1000),
    [accidentInformation_evaluatedIn] NVARCHAR(1000),
    [accidentInformation_complaints] NVARCHAR(1000),
    [accidentInformation_previousHistory] BIT,
    [accidentInformation_gapInCare] BIT,
    [accidentInformation_gapInCareWhen] NVARCHAR(1000),
    [accidentInformation_preExistingProblems] NVARCHAR(1000),
    [accidentInformation_priorInjuries] NVARCHAR(1000),
    [accidentInformation_otherInjuriesSince] NVARCHAR(1000),
    [motorVehicleAccident_mvaDriver] BIT,
    [motorVehicleAccident_mvaPassenger] BIT,
    [motorVehicleAccident_mvaVehicle] NVARCHAR(1000),
    [motorVehicleAccident_mvaClaimants] NVARCHAR(1000),
    [motorVehicleAccident_mvaOperable] NVARCHAR(1000),
    [motorVehicleAccident_mvaTar] NVARCHAR(1000),
    [motorVehicleAccident_mvaDamage] NVARCHAR(1000),
    [motorVehicleAccident_mvaLess] NVARCHAR(1000),
    [motorVehicleAccident_mvaGreater] NVARCHAR(1000),
    [motorVehicleAccident_mvaAmount] NVARCHAR(1000),
    [premiseAccident_clientHasObtainedPlaintiffAdvance] BIT,
    [premiseAccident_advanceAmount] FLOAT(53),
    [premiseAccident_LossOfEarningsIsBeingFiled] BIT,
    [premiseAccident_DoYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart] BIT,
    [premiseAccident_explain] NVARCHAR(1000),
    [premiseAccident_clientHasCriminalHistory] BIT,
    [premiseAccident_criminalHistory] NVARCHAR(1000),
    [premiseAccident_locationOfIncident] NVARCHAR(1000),
    [productLiability_product] NVARCHAR(1000),
    [productLiability_whereDidItHappen] NVARCHAR(1000),
    [productLiability_proofOfLiability] NVARCHAR(1000),
    [productLiability_productWasRecalled] BIT,
    [workRelated_selfInsuredWorkComp] BIT,
    [workRelated_workCompCaseIsOpenClosed] NVARCHAR(1000),
    [workRelated_workCompCaseSettledAmount] FLOAT(53),
    [workRelated_workCompCaseSettlementIncludesFutureMedicals] BIT,
    [workRelated_reasonNotFiledUnderWorkComp] NVARCHAR(1000),
    CONSTRAINT [LegalCase_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorMedsToDate] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorMedsToDate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorMedsToDate_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    [priorMedsToDateStatusId] NVARCHAR(1000),
    [quantity] INT,
    [amount] FLOAT(53),
    CONSTRAINT [PriorMedsToDate_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PriorMedsToDateStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PriorMedsToDateStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PriorMedsToDateStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PriorMedsToDateStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Location] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Location_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Location_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [locationName] NVARCHAR(1000),
    [line1] NVARCHAR(1000),
    [line2] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [postalCode] NVARCHAR(1000),
    [latitude] FLOAT(53),
    [longitude] FLOAT(53),
    [abbrev] NVARCHAR(1000),
    [division] NVARCHAR(1000),
    [country] NVARCHAR(1000),
    [officePhone] NVARCHAR(1000),
    [fax] NVARCHAR(1000),
    [cotes] NVARCHAR(1000),
    [attentionTo] NVARCHAR(1000),
    CONSTRAINT [Location_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Organization] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Organization_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Organization_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Organization_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Patient] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Patient_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Patient_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [middleName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [suffix] NVARCHAR(1000),
    [genderId] NVARCHAR(1000),
    [nickname] NVARCHAR(1000),
    [height] NVARCHAR(1000),
    [weight] NVARCHAR(1000),
    [dateOfBirth] DATETIME2,
    [primaryPhoneNumber] NVARCHAR(1000),
    [isPrimaryPhoneMobile] BIT,
    [secondaryPhoneNumber] NVARCHAR(1000),
    [isSecondaryPhoneMobile] BIT,
    [memberRegistrationNumber] NVARCHAR(1000),
    [ethnicityId] NVARCHAR(1000),
    [languageId] NVARCHAR(1000),
    [requiresTranslator] BIT,
    [socialSecurityNumber] NVARCHAR(1000),
    [honorific] NVARCHAR(1000),
    [primaryEmailAddress] NVARCHAR(1000),
    [primaryAddressLine1] NVARCHAR(1000),
    [primaryAddressLine2] NVARCHAR(1000),
    [primaryAddressCity] NVARCHAR(1000),
    [primaryAddressStateOrProvince] NVARCHAR(1000),
    [primaryAddressPostalCode] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [latitude] FLOAT(53),
    [longitude] FLOAT(53),
    [emergencyContactId] NVARCHAR(1000),
    [homePhoneNumber] NVARCHAR(1000),
    [mobileNumber] NVARCHAR(1000),
    [bmi] NVARCHAR(1000),
    [occupation] NVARCHAR(1000),
    [debtorRemarks] NVARCHAR(1000),
    CONSTRAINT [Patient_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PatientStudy] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PatientStudy_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PatientStudy_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    CONSTRAINT [PatientStudy_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PatientTreatmentStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PatientTreatmentStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PatientTreatmentStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [PatientTreatmentStatus_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[PlaceOfService] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [PlaceOfService_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [PlaceOfService_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [isFacility] BIT,
    CONSTRAINT [PlaceOfService_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Portfolio] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Portfolio_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Portfolio_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Portfolio_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Prescription] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Prescription_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Prescription_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [medicalProvider] NVARCHAR(1000),
    [dateWritten] DATETIME2,
    [days] NVARCHAR(1000),
    [note] NVARCHAR(1000),
    [category] NVARCHAR(1000),
    [kind] NVARCHAR(1000),
    [quantity] FLOAT(53),
    [refills] NVARCHAR(1000),
    [rxNumber] NVARCHAR(1000),
    [sig] NVARCHAR(1000),
    [strength] NVARCHAR(1000),
    [unit] NVARCHAR(1000),
    [patientId] NVARCHAR(1000),
    CONSTRAINT [Prescription_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProcedureType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [orderIndex] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    [isSystem] BIT,
    [removed] BIT,
    [modality] NVARCHAR(1000),
    CONSTRAINT [ProcedureType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ProcedureVendor] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProcedureVendor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ProcedureVendor_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [procedureId] NVARCHAR(1000),
    [contractId] NVARCHAR(1000),
    [vendorId] NVARCHAR(1000),
    [estimate] FLOAT(53),
    [fundingApproved] BIT,
    CONSTRAINT [ProcedureVendor_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Process] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Process_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Process_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [Process_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[ReconciliationPeriodType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ReconciliationPeriodType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [ReconciliationPeriodType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [ReconciliationPeriodType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Specialty] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Specialty_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Specialty_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [active] BIT,
    CONSTRAINT [Specialty_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserCourseProgress] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [UserCourseProgress_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [UserCourseProgress_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [userId] NVARCHAR(1000),
    [courseId] NVARCHAR(1000),
    [currentStep] INT,
    [completed] INT,
    CONSTRAINT [UserCourseProgress_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Vendor] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Vendor_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Vendor_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [taxId] NVARCHAR(1000),
    [line1] NVARCHAR(1000),
    [city] NVARCHAR(1000),
    [state] NVARCHAR(1000),
    [postalCode] NVARCHAR(1000),
    [emailAddress] NVARCHAR(1000),
    [phoneNumber] NVARCHAR(1000),
    [fax] NVARCHAR(1000),
    [mailingAddress] NVARCHAR(1000),
    [vendorTypeId] NVARCHAR(1000),
    [line2] NVARCHAR(1000),
    [country] NVARCHAR(1000),
    [office] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [website] NVARCHAR(1000),
    [contactPerson] NVARCHAR(1000),
    [owner] NVARCHAR(1000),
    [w9] NVARCHAR(1000),
    [bankRoutingNumber] NVARCHAR(1000),
    [bankAccountNumber] NVARCHAR(1000),
    [bankName] NVARCHAR(1000),
    [bankCity] NVARCHAR(1000),
    [bankState] NVARCHAR(1000),
    [bankZip] NVARCHAR(1000),
    [billOfSaleTemplate] NVARCHAR(1000),
    [billOfSaleInstructions] NVARCHAR(1000),
    [apDetailTemplate] NVARCHAR(1000),
    [notes] NVARCHAR(1000),
    [agreementDetails] NVARCHAR(1000),
    [dl] BIT,
    [nci] BIT,
    [baa] BIT,
    [ucc] BIT,
    [nds] BIT,
    [contract] BIT,
    [sa] BIT,
    [other] BIT,
    [ota] BIT,
    [permission] NVARCHAR(1000),
    [cellphone] NVARCHAR(1000),
    [ach] BIT,
    [facilityCheck] BIT,
    [wire] BIT,
    [reductionNotes] NVARCHAR(1000),
    [latitude] FLOAT(53),
    [longitude] FLOAT(53),
    [businessCentralName] NVARCHAR(1000),
    CONSTRAINT [Vendor_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[VendorType] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [VendorType_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [VendorType_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [VendorType_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WriteOff] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [WriteOff_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [WriteOff_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [accountId] NVARCHAR(1000),
    [writeOffStatusId] NVARCHAR(1000),
    [amount] FLOAT(53),
    [createdBy] NVARCHAR(1000),
    [dateCreated] DATETIME2,
    CONSTRAINT [WriteOff_pkey] PRIMARY KEY ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WriteOffStatus] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [WriteOffStatus_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [WriteOffStatus_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    CONSTRAINT [WriteOffStatus_pkey] PRIMARY KEY ([id])
);

-- CreateIndex

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__Appointment__appointmentStatusId', 'Appointment_appointmentStatusId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__Setting__userId', 'Setting_userId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__TeamUser__teamId', 'TeamUser_teamId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__TeamUser__teamRoleId', 'TeamUser_teamRoleId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__TeamUser__userId', 'TeamUser_userId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__UserCalendar__calendarId', 'UserCalendar_calendarId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__UserCalendar__calendarTypeId', 'UserCalendar_calendarTypeId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__UserCalendar__teamId', 'UserCalendar_teamId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__UserCalendar__userId', 'UserCalendar_userId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__UserRole__roleId', 'UserRole_roleId_fkey', 'OBJECT';

-- RenameForeignKey
EXEC sp_rename 'dbo.FK__UserRole__userId', 'UserRole_userId_fkey', 'OBJECT';

-- AddForeignKey
ALTER TABLE [dbo].[Appointment] ADD CONSTRAINT [Appointment_calendarId_fkey] FOREIGN KEY ([calendarId]) REFERENCES [dbo].[Calendar]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AssignedDocument] ADD CONSTRAINT [AssignedDocument_documentId_fkey] FOREIGN KEY ([documentId]) REFERENCES [dbo].[Document]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[AssignedDocument] ADD CONSTRAINT [AssignedDocument_templateId_fkey] FOREIGN KEY ([templateId]) REFERENCES [dbo].[Template]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AssignedDocument] ADD CONSTRAINT [AssignedDocument_documentTypeId_fkey] FOREIGN KEY ([documentTypeId]) REFERENCES [dbo].[DocumentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[AssignedDocument] ADD CONSTRAINT [AssignedDocument_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Chat] ADD CONSTRAINT [Chat_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_contractId_fkey] FOREIGN KEY ([contractId]) REFERENCES [dbo].[Contract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_prescriptionId_fkey] FOREIGN KEY ([prescriptionId]) REFERENCES [dbo].[Prescription]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_patientStudyId_fkey] FOREIGN KEY ([patientStudyId]) REFERENCES [dbo].[PatientStudy]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Email] ADD CONSTRAINT [Email_ownerId_fkey] FOREIGN KEY ([ownerId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Message] ADD CONSTRAINT [Message_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Message] ADD CONSTRAINT [Message_chatId_fkey] FOREIGN KEY ([chatId]) REFERENCES [dbo].[Chat]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Navigation] ADD CONSTRAINT [Navigation_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Navigation] ADD CONSTRAINT [Navigation_parentId_fkey] FOREIGN KEY ([parentId]) REFERENCES [dbo].[Navigation]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Notification] ADD CONSTRAINT [Notification_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Shortcut] ADD CONSTRAINT [Shortcut_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskItem] ADD CONSTRAINT [TaskItem_assignedToId_fkey] FOREIGN KEY ([assignedToId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[TaskTag] ADD CONSTRAINT [TaskTag_taskId_fkey] FOREIGN KEY ([taskId]) REFERENCES [dbo].[TaskItem]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[TaskTag] ADD CONSTRAINT [TaskTag_tagId_fkey] FOREIGN KEY ([tagId]) REFERENCES [dbo].[Tag]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attorney] ADD CONSTRAINT [Attorney_firmId_fkey] FOREIGN KEY ([firmId]) REFERENCES [dbo].[Firm]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attorney] ADD CONSTRAINT [Attorney_attorneyStatusId_fkey] FOREIGN KEY ([attorneyStatusId]) REFERENCES [dbo].[AttorneyStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attorney] ADD CONSTRAINT [Attorney_attorneyTypeId_fkey] FOREIGN KEY ([attorneyTypeId]) REFERENCES [dbo].[AttorneyType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Attorney] ADD CONSTRAINT [Attorney_createdById_fkey] FOREIGN KEY ([createdById]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_accountStatusId_fkey] FOREIGN KEY ([accountStatusId]) REFERENCES [dbo].[AccountStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_procedureTypeId_fkey] FOREIGN KEY ([procedureTypeId]) REFERENCES [dbo].[ProcedureType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_agreementTypeId_fkey] FOREIGN KEY ([agreementTypeId]) REFERENCES [dbo].[AgreementType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_accountAgentId_fkey] FOREIGN KEY ([accountAgentId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_contractId_fkey] FOREIGN KEY ([contractId]) REFERENCES [dbo].[Contract]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_portfolioId_fkey] FOREIGN KEY ([portfolioId]) REFERENCES [dbo].[Portfolio]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_procedureVendorId_fkey] FOREIGN KEY ([procedureVendorId]) REFERENCES [dbo].[ProcedureVendor]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CasePreAccident] ADD CONSTRAINT [CasePreAccident_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CasePreInjury] ADD CONSTRAINT [CasePreInjury_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CasePreProblem] ADD CONSTRAINT [CasePreProblem_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CasePreProcedure] ADD CONSTRAINT [CasePreProcedure_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseProcedure] ADD CONSTRAINT [CaseProcedure_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[CaseProcedure] ADD CONSTRAINT [CaseProcedure_locationId_fkey] FOREIGN KEY ([locationId]) REFERENCES [dbo].[Location]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Claim] ADD CONSTRAINT [Claim_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClaimProcedure] ADD CONSTRAINT [ClaimProcedure_placeOfServiceId_fkey] FOREIGN KEY ([placeOfServiceId]) REFERENCES [dbo].[PlaceOfService]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClaimProcedure] ADD CONSTRAINT [ClaimProcedure_claimStatusId_fkey] FOREIGN KEY ([claimStatusId]) REFERENCES [dbo].[ClaimStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ClaimProcedure] ADD CONSTRAINT [ClaimProcedure_claimId_fkey] FOREIGN KEY ([claimId]) REFERENCES [dbo].[Claim]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_organizationId_fkey] FOREIGN KEY ([organizationId]) REFERENCES [dbo].[Organization]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_billingOrganizationId_fkey] FOREIGN KEY ([billingOrganizationId]) REFERENCES [dbo].[Organization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_templateId_fkey] FOREIGN KEY ([templateId]) REFERENCES [dbo].[Template]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_reconciliationPeriodTypeId_fkey] FOREIGN KEY ([reconciliationPeriodTypeId]) REFERENCES [dbo].[ReconciliationPeriodType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_calculationBasisTypeId_fkey] FOREIGN KEY ([calculationBasisTypeId]) REFERENCES [dbo].[CalculationBasisType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Contract] ADD CONSTRAINT [Contract_processId_fkey] FOREIGN KEY ([processId]) REFERENCES [dbo].[Process]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContractedRate] ADD CONSTRAINT [ContractedRate_contractId_fkey] FOREIGN KEY ([contractId]) REFERENCES [dbo].[Contract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContractedRate] ADD CONSTRAINT [ContractedRate_contractedRateKindId_fkey] FOREIGN KEY ([contractedRateKindId]) REFERENCES [dbo].[ContractedRateKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContractedRate] ADD CONSTRAINT [ContractedRate_contractKindId_fkey] FOREIGN KEY ([contractKindId]) REFERENCES [dbo].[ContractKind]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ContractTerm] ADD CONSTRAINT [ContractTerm_contractTermId_fkey] FOREIGN KEY ([contractTermId]) REFERENCES [dbo].[Contract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Course] ADD CONSTRAINT [Course_categoryId_fkey] FOREIGN KEY ([categoryId]) REFERENCES [dbo].[AcademyCategory]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FacilityFeeSchedule] ADD CONSTRAINT [FacilityFeeSchedule_organizationId_fkey] FOREIGN KEY ([organizationId]) REFERENCES [dbo].[Organization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FacilityFeeSchedule] ADD CONSTRAINT [FacilityFeeSchedule_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeeSchedule] ADD CONSTRAINT [FeeSchedule_organizationId_fkey] FOREIGN KEY ([organizationId]) REFERENCES [dbo].[Organization]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[FeeSchedule] ADD CONSTRAINT [FeeSchedule_specialtyId_fkey] FOREIGN KEY ([specialtyId]) REFERENCES [dbo].[Specialty]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Firm] ADD CONSTRAINT [Firm_firmStatusId_fkey] FOREIGN KEY ([firmStatusId]) REFERENCES [dbo].[FirmStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[HealthInsurance] ADD CONSTRAINT [HealthInsurance_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Insurance] ADD CONSTRAINT [Insurance_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Insurance] ADD CONSTRAINT [Insurance_insuranceTypeId_fkey] FOREIGN KEY ([insuranceTypeId]) REFERENCES [dbo].[InsuranceType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Insurance] ADD CONSTRAINT [Insurance_insuranceSectorId_fkey] FOREIGN KEY ([insuranceSectorId]) REFERENCES [dbo].[InsuranceSector]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_accidentTypeId_fkey] FOREIGN KEY ([accidentTypeId]) REFERENCES [dbo].[AccidentType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_firmId_fkey] FOREIGN KEY ([firmId]) REFERENCES [dbo].[Firm]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_attorneyId_fkey] FOREIGN KEY ([attorneyId]) REFERENCES [dbo].[Attorney]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_agentId_fkey] FOREIGN KEY ([agentId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_caseStatusId_fkey] FOREIGN KEY ([caseStatusId]) REFERENCES [dbo].[CaseStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_caseTypeId_fkey] FOREIGN KEY ([caseTypeId]) REFERENCES [dbo].[CaseType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_patientTreatmentStatusId_fkey] FOREIGN KEY ([patientTreatmentStatusId]) REFERENCES [dbo].[PatientTreatmentStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_caseProgressStatusId_fkey] FOREIGN KEY ([caseProgressStatusId]) REFERENCES [dbo].[CaseProgressStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[LegalCase] ADD CONSTRAINT [LegalCase_adverseInsuranceStatusId_fkey] FOREIGN KEY ([adverseInsuranceStatusId]) REFERENCES [dbo].[AdverseInsuranceStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorMedsToDate] ADD CONSTRAINT [PriorMedsToDate_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorMedsToDate] ADD CONSTRAINT [PriorMedsToDate_priorMedsToDateStatusId_fkey] FOREIGN KEY ([priorMedsToDateStatusId]) REFERENCES [dbo].[PriorMedsToDateStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_genderId_fkey] FOREIGN KEY ([genderId]) REFERENCES [dbo].[Gender]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Patient] ADD CONSTRAINT [Patient_languageId_fkey] FOREIGN KEY ([languageId]) REFERENCES [dbo].[Language]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PatientStudy] ADD CONSTRAINT [PatientStudy_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Prescription] ADD CONSTRAINT [Prescription_patientId_fkey] FOREIGN KEY ([patientId]) REFERENCES [dbo].[Patient]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureVendor] ADD CONSTRAINT [ProcedureVendor_procedureId_fkey] FOREIGN KEY ([procedureId]) REFERENCES [dbo].[CaseProcedure]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureVendor] ADD CONSTRAINT [ProcedureVendor_contractId_fkey] FOREIGN KEY ([contractId]) REFERENCES [dbo].[Contract]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[ProcedureVendor] ADD CONSTRAINT [ProcedureVendor_vendorId_fkey] FOREIGN KEY ([vendorId]) REFERENCES [dbo].[Vendor]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserCourseProgress] ADD CONSTRAINT [UserCourseProgress_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserCourseProgress] ADD CONSTRAINT [UserCourseProgress_courseId_fkey] FOREIGN KEY ([courseId]) REFERENCES [dbo].[Course]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Vendor] ADD CONSTRAINT [Vendor_vendorTypeId_fkey] FOREIGN KEY ([vendorTypeId]) REFERENCES [dbo].[VendorType]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WriteOff] ADD CONSTRAINT [WriteOff_accountId_fkey] FOREIGN KEY ([accountId]) REFERENCES [dbo].[CaseAccount]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[WriteOff] ADD CONSTRAINT [WriteOff_writeOffStatusId_fkey] FOREIGN KEY ([writeOffStatusId]) REFERENCES [dbo].[WriteOffStatus]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
