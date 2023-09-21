/*
  Warnings:

  - You are about to drop the column `assigneePaysToAssignor` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `bageledDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `count` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTeamLead` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `defaultTeamLeaderRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `excludeFromBorrowingBase` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `expectedPmtFlatFee` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `expectedPmtRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `expenseAmount` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `ifgAdvanceDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `ifgDefaultServiceFee` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `insideBrokerMultiply` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `insideBrokerRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `interestRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `internalAgentId` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `mDSContractDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `minPerformanceFlatFee` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `minPerformanceRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `outsideAgentId` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `outsideBrokerFlatFee` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `outsideBrokerMultiply` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `outsideBrokerRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `overageId` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `paidToPlaintiff` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `parentAccountId` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `projectedPayoffDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `providerTxnID` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `qbEditSequence` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `qbJournalDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `qbTxnId` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `rate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `reOpenedDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `refundQBEditSequence` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `refundQBJournalDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `refundQBTxnId` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `reimbursable` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `removed` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `securitizationGroup` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `servicingFeePercent` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `taxRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `taxable` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `temp` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `thresholdFlatFee` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `thresholdRate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `unExpensedBadDebtDate` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `wcFeeSchedule` on the `CaseAccount` table. All the data in the column will be lost.
  - You are about to drop the column `medicalProviderId` on the `PriorAuthorizationRequest` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[CaseAccount] DROP CONSTRAINT [CaseAccount_legalCaseId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] DROP CONSTRAINT [PriorAuthorizationRequest_medicalProviderId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] DROP CONSTRAINT [PriorAuthorizationRequest_referredToId_fkey];

-- AlterTable
ALTER TABLE [dbo].[CaseAccount] DROP COLUMN [assigneePaysToAssignor],
[bageledDate],
[count],
[createdBy],
[dateCreated],
[defaultTeamLead],
[defaultTeamLeaderRate],
[excludeFromBorrowingBase],
[expectedPmtFlatFee],
[expectedPmtRate],
[expenseAmount],
[ifgAdvanceDate],
[ifgDefaultServiceFee],
[insideBrokerMultiply],
[insideBrokerRate],
[interestRate],
[internalAgentId],
[mDSContractDate],
[minPerformanceFlatFee],
[minPerformanceRate],
[outsideAgentId],
[outsideBrokerFlatFee],
[outsideBrokerMultiply],
[outsideBrokerRate],
[overageId],
[paidToPlaintiff],
[parentAccountId],
[projectedPayoffDate],
[providerTxnID],
[qbEditSequence],
[qbJournalDate],
[qbTxnId],
[rate],
[reOpenedDate],
[refundQBEditSequence],
[refundQBJournalDate],
[refundQBTxnId],
[reimbursable],
[removed],
[securitizationGroup],
[servicingFeePercent],
[taxRate],
[taxable],
[temp],
[thresholdFlatFee],
[thresholdRate],
[time],
[unExpensedBadDebtDate],
[wcFeeSchedule];
ALTER TABLE [dbo].[CaseAccount] ADD [claimProcedureId] NVARCHAR(1000),
[invoiceDetailId] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[PriorAuthorizationRequest] DROP COLUMN [medicalProviderId];
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD [treatingProviderId] NVARCHAR(1000);

-- CreateTable
CREATE TABLE [dbo].[Invoice] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [Invoice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [Invoice_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [invoiceNumber] NVARCHAR(1000),
    [amount] FLOAT(53),
    [paid] FLOAT(53),
    [due] FLOAT(53),
    [organizationId] NVARCHAR(1000),
    [legalCaseId] NVARCHAR(1000),
    CONSTRAINT [Invoice_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[InvoiceDetail] (
    [id] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [InvoiceDetail_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 CONSTRAINT [InvoiceDetail_updatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    [name] NVARCHAR(1000),
    [invoiceId] NVARCHAR(1000),
    [dateOfService] DATETIME2,
    [providerName] NVARCHAR(1000),
    [procedureDescription] NVARCHAR(1000),
    [quantity] INT,
    [charges] FLOAT(53),
    [lineTotal] FLOAT(53),
    CONSTRAINT [InvoiceDetail_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[CaseAccount] ADD CONSTRAINT [CaseAccount_invoiceDetailId_fkey] FOREIGN KEY ([invoiceDetailId]) REFERENCES [dbo].[InvoiceDetail]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Invoice] ADD CONSTRAINT [Invoice_legalCaseId_fkey] FOREIGN KEY ([legalCaseId]) REFERENCES [dbo].[LegalCase]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[InvoiceDetail] ADD CONSTRAINT [InvoiceDetail_invoiceId_fkey] FOREIGN KEY ([invoiceId]) REFERENCES [dbo].[Invoice]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_treatingProviderId_fkey] FOREIGN KEY ([treatingProviderId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[PriorAuthorizationRequest] ADD CONSTRAINT [PriorAuthorizationRequest_referredToId_fkey] FOREIGN KEY ([referredToId]) REFERENCES [dbo].[ClinicalProvider]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
