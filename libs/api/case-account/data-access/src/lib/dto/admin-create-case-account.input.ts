import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateLegalCaseInput } from '@case-clinical/api/legal-case/data-access' 
import { AdminCreateLocationInput } from '@case-clinical/api/location/data-access' 
import { AdminCreateVendorInput } from '@case-clinical/api/vendor/data-access' 
import { AdminCreateAccountStatusInput } from '@case-clinical/api/account-status/data-access' 
import { AdminCreateProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access' 
import { AdminCreateAgreementTypeInput } from '@case-clinical/api/agreement-type/data-access' 
import { AdminCreateClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access' 
import { AdminCreateInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access' 
import { AdminCreateContractInput } from '@case-clinical/api/contract/data-access' 
import { AdminCreatePortfolioInput } from '@case-clinical/api/portfolio/data-access' 
import { AdminCreateProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access' 
import { AdminCreateWriteOffInput } from '@case-clinical/api/write-off/data-access' 
import { AdminCreateCaseAccountPaymentInput } from '@case-clinical/api/case-account-payment/data-access' 
import { AdminCreateJournalEntryInput } from '@case-clinical/api/journal-entry/data-access' 


@InputType()
export class AdminCreateCaseAccountInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  legalCaseId?: string

  @Field({ nullable: true }) 
  locationId?: string

  @Field({ nullable: true }) 
  vendorId?: string

  @Field({ nullable: true }) 
  accountStatusId?: string

  @Field({ nullable: true }) 
  procedureTypeId?: string

  @Field({ nullable: true }) 
  agreementTypeId?: string

  @Field({ nullable: true }) 
  accountAgentId?: string

  @Field({ nullable: true }) 
  claimProcedureId?: string

  @Field({ nullable: true }) 
  invoiceDetailId?: string

  @Field({ nullable: true }) 
  contractId?: string

  @Field({ nullable: true }) 
  portfolioId?: string

  @Field({ nullable: true }) 
  thirdPartyFunderName?: string

  @Field({ nullable: true }) 
  originalDueDate?: Date

  @Field({ nullable: true }) 
  accountTerm?: number

  @Field({ nullable: true }) 
  serviceDate?: Date

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  originalDebt?: number

  @Field({ nullable: true }) 
  cost?: number

  @Field({ nullable: true }) 
  balance?: number

  @Field({ nullable: true }) 
  lastBalance?: number

  @Field({ nullable: true }) 
  reduction?: number

  @Field({ nullable: true }) 
  treatmentState?: string

  @Field({ nullable: true }) 
  accountNumber?: string

  @Field({ nullable: true }) 
  servicesPerformed?: string

  @Field({ nullable: true }) 
  cptCodes?: string

  @Field({ nullable: true }) 
  treatingPhysician?: string

  @Field({ nullable: true }) 
  referringPhysician?: string

  @Field({ nullable: true }) 
  collectionsDate?: Date

  @Field({ nullable: true }) 
  deemedWriteOffDate?: Date

  @Field({ nullable: true }) 
  expensedBadDebtDate?: Date

  @Field({ nullable: true }) 
  paidDate?: Date

  @Field({ nullable: true }) 
  ghostAccount?: boolean

  @Field({ nullable: true }) 
  ghostedDate?: Date

  @Field({ nullable: true }) 
  ghostedBy?: string

  @Field({ nullable: true }) 
  unGhostedDate?: Date

  @Field({ nullable: true }) 
  unGhostedBy?: string

  @Field({ nullable: true }) 
  additionalPayment?: boolean

  @Field({ nullable: true }) 
  missingBill?: boolean

  @Field({ nullable: true }) 
  missingLien?: boolean

  @Field({ nullable: true }) 
  missingMedicalRecords?: boolean

  @Field({ nullable: true }) 
  assignedTo?: string

  @Field({ nullable: true }) 
  resubmitted?: Date

  @Field({ nullable: true }) 
  treatmentCity?: string

  @Field({ nullable: true }) 
  origination?: number

  @Field({ nullable: true }) 
  thresholdProviderRate?: number

  @Field({ nullable: true }) 
  thresholdLocationRate?: number

  @Field({ nullable: true }) 
  teamLeaderRateSource?: string

  @Field({ nullable: true }) 
  checkNumber?: string

  @Field({ nullable: true }) 
  accountDateReceived?: Date

  @Field({ nullable: true }) 
  dateApplied?: Date

  @Field({ nullable: true }) 
  amountApplied?: number

  @Field({ nullable: true }) 
  description?: string

  @Field({ nullable: true }) 
  note?: string

  @Field({ nullable: true }) 
  medicareRate?: number

  @Field({ nullable: true }) 
  providerPercentOfMedicare?: number

  @Field({ nullable: true }) 
  contractedAmount?: number

  @Field({ nullable: true }) 
  markupPercent?: number

  @Field({ nullable: true }) 
  reimbursedTotal?: number

  @Field({ nullable: true }) 
  initialRevenue?: number

  @Field({ nullable: true }) 
  factor?: number

  @Field({ nullable: true }) 
  retailBill?: number

  @Field({ nullable: true }) 
  estMargin?: number

  @Field({ nullable: true }) 
  roi?: number

  @Field({ nullable: true }) 
  attorneyPaid?: number

  @Field({ nullable: true }) 
  percentOfRetail?: number

  @Field({ nullable: true }) 
  reimbursedFromPCR?: number

  @Field({ nullable: true }) 
  ingredientCost?: number

  @Field({ nullable: true }) 
  dispensingCost?: number

  @Field({ nullable: true }) 
  administrativeCost?: number

  @Field({ nullable: true }) 
  coPay?: number

  @Field({ nullable: true }) 
  totalCost?: number

  @Field({ nullable: true }) 
  averageWholesalePrice?: number

  @Field({ nullable: true }) 
  weightedAverageCost?: number

  @Field({ nullable: true }) 
  averageSalePrice?: number

  @Field({ nullable: true }) 
  invoiceCost?: number

  @Field({ nullable: true }) 
  usualAndCustomary?: number

  @Field({ nullable: true }) 
  nationalDrugCode?: string

  @Field({ nullable: true }) 
  procedureVendorId?: string

  @Field(() => [AdminCreateWriteOffInput], { nullable: true }) 
  writeOffs?: AdminCreateWriteOffInput[]

  @Field(() => [AdminCreateCaseAccountPaymentInput], { nullable: true }) 
  caseAccountPayments?: AdminCreateCaseAccountPaymentInput[]

  @Field(() => [AdminCreateJournalEntryInput], { nullable: true }) 
  journalEntries?: AdminCreateJournalEntryInput[]


  @Field(() => AdminCreateLegalCaseInput ,{ nullable: true }) 
  legalCase?: AdminCreateLegalCaseInput  


  @Field(() => AdminCreateLocationInput ,{ nullable: true }) 
  location?: AdminCreateLocationInput  


  @Field(() => AdminCreateVendorInput ,{ nullable: true }) 
  vendor?: AdminCreateVendorInput  


  @Field(() => AdminCreateAccountStatusInput ,{ nullable: true }) 
  accountStatus?: AdminCreateAccountStatusInput  


  @Field(() => AdminCreateProcedureTypeInput ,{ nullable: true }) 
  procedureType?: AdminCreateProcedureTypeInput  


  @Field(() => AdminCreateAgreementTypeInput ,{ nullable: true }) 
  agreementType?: AdminCreateAgreementTypeInput  


  @Field(() => AdminCreateClaimProcedureInput ,{ nullable: true }) 
  claimProcedure?: AdminCreateClaimProcedureInput  


  @Field(() => AdminCreateInvoiceDetailInput ,{ nullable: true }) 
  invoiceDetail?: AdminCreateInvoiceDetailInput  


  @Field(() => AdminCreateContractInput ,{ nullable: true }) 
  contract?: AdminCreateContractInput  


  @Field(() => AdminCreatePortfolioInput ,{ nullable: true }) 
  portfolio?: AdminCreatePortfolioInput  


  @Field(() => AdminCreateProcedureVendorInput ,{ nullable: true }) 
  procedureVendor?: AdminCreateProcedureVendorInput  

}