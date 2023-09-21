
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCaseAccountInput } from './dto/admin-create-case-account.input'
import { AdminListCaseAccountInput } from './dto/admin-list-case-account.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListLocationInput } from '@case-clinical/api/location/data-access'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminListAccountStatusInput } from '@case-clinical/api/account-status/data-access'
import { AdminListProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'
import { AdminListAgreementTypeInput } from '@case-clinical/api/agreement-type/data-access'
import { AdminListClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access'
import { AdminListInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access'
import { AdminListContractInput } from '@case-clinical/api/contract/data-access'
import { AdminListPortfolioInput } from '@case-clinical/api/portfolio/data-access'
import { AdminListProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'
import { AdminUpdateCaseAccountInput } from './dto/admin-update-case-account.input'

@Injectable()
export class ApiCaseAccountDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCaseAccounts(adminId: string, input?: AdminListCaseAccountInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.caseAccount.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true}
    })
  }

  async adminCountCaseAccounts(adminId: string, input?: AdminListCaseAccountInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseAccount.count(
    {
      where: { 
            name: { 
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  
  

  async adminCaseAccount(adminId: string, caseAccountId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.caseAccount.findUnique({ where: { id: caseAccountId } , include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true, caseAccountPayments: true, journalEntries: true, writeOffs: true} })
  }

  async checkCaseAccountExist(caseAccountName: string) {
    try {
      return this.data.caseAccount.findMany({ where: { name: caseAccountName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCaseAccount(adminId: string, input: AdminCreateCaseAccountInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const caseAccountData = await this.checkCaseAccountExist(input.name)

      if (caseAccountData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.caseAccount.create({
          data: { 
      
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                location: 
                input.locationId != null
                ? {
                        connect:  { 
                            id: input.locationId
                        }
                    }: undefined,  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,  
                accountStatus: 
                input.accountStatusId != null
                ? {
                        connect:  { 
                            id: input.accountStatusId
                        }
                    }: undefined,  
                procedureType: 
                input.procedureTypeId != null
                ? {
                        connect:  { 
                            id: input.procedureTypeId
                        }
                    }: undefined,  
                agreementType: 
                input.agreementTypeId != null
                ? {
                        connect:  { 
                            id: input.agreementTypeId
                        }
                    }: undefined,  
                claimProcedure: 
                input.claimProcedureId != null
                ? {
                        connect:  { 
                            id: input.claimProcedureId
                        }
                    }: undefined,  
                invoiceDetail: 
                input.invoiceDetailId != null
                ? {
                        connect:  { 
                            id: input.invoiceDetailId
                        }
                    }: undefined,  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                portfolio: 
                input.portfolioId != null
                ? {
                        connect:  { 
                            id: input.portfolioId
                        }
                    }: undefined,  
                procedureVendor: 
                input.procedureVendorId != null
                ? {
                        connect:  { 
                            id: input.procedureVendorId
                        }
                    }: undefined,name: input.name, 
thirdPartyFunderName: input.thirdPartyFunderName, 
originalDueDate: input.originalDueDate, 
accountTerm: input.accountTerm, 
serviceDate: input.serviceDate, 
quantity: input.quantity, 
originalDebt: input.originalDebt, 
cost: input.cost, 
balance: input.balance, 
lastBalance: input.lastBalance, 
reduction: input.reduction, 
treatmentState: input.treatmentState, 
accountNumber: input.accountNumber, 
servicesPerformed: input.servicesPerformed, 
cptCodes: input.cptCodes, 
treatingPhysician: input.treatingPhysician, 
referringPhysician: input.referringPhysician, 
collectionsDate: input.collectionsDate, 
deemedWriteOffDate: input.deemedWriteOffDate, 
expensedBadDebtDate: input.expensedBadDebtDate, 
paidDate: input.paidDate, 
ghostAccount: input.ghostAccount, 
ghostedDate: input.ghostedDate, 
ghostedBy: input.ghostedBy, 
unGhostedDate: input.unGhostedDate, 
unGhostedBy: input.unGhostedBy, 
additionalPayment: input.additionalPayment, 
missingBill: input.missingBill, 
missingLien: input.missingLien, 
missingMedicalRecords: input.missingMedicalRecords, 
assignedTo: input.assignedTo, 
resubmitted: input.resubmitted, 
treatmentCity: input.treatmentCity, 
origination: input.origination, 
thresholdProviderRate: input.thresholdProviderRate, 
thresholdLocationRate: input.thresholdLocationRate, 
teamLeaderRateSource: input.teamLeaderRateSource, 
checkNumber: input.checkNumber, 
accountDateReceived: input.accountDateReceived, 
dateApplied: input.dateApplied, 
amountApplied: input.amountApplied, 
description: input.description, 
note: input.note, 
medicareRate: input.medicareRate, 
providerPercentOfMedicare: input.providerPercentOfMedicare, 
contractedAmount: input.contractedAmount, 
markupPercent: input.markupPercent, 
reimbursedTotal: input.reimbursedTotal, 
initialRevenue: input.initialRevenue, 
factor: input.factor, 
retailBill: input.retailBill, 
estMargin: input.estMargin, 
roi: input.roi, 
attorneyPaid: input.attorneyPaid, 
percentOfRetail: input.percentOfRetail, 
reimbursedFromPCR: input.reimbursedFromPCR, 
ingredientCost: input.ingredientCost, 
dispensingCost: input.dispensingCost, 
administrativeCost: input.administrativeCost, 
coPay: input.coPay, 
totalCost: input.totalCost, 
averageWholesalePrice: input.averageWholesalePrice, 
weightedAverageCost: input.weightedAverageCost, 
averageSalePrice: input.averageSalePrice, 
invoiceCost: input.invoiceCost, 
usualAndCustomary: input.usualAndCustomary, 
nationalDrugCode: input.nationalDrugCode, 

    }
    , include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true, caseAccountPayments: true, journalEntries: true, writeOffs: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCaseAccount(adminId: string, caseAccountId, input: AdminUpdateCaseAccountInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseAccount.update({
      where: { id: caseAccountId },
      data: {
  
                legalCase: 
                input.legalCaseId != null
                ? {
                        connect:  { 
                            id: input.legalCaseId
                        }
                    }: undefined,  
                location: 
                input.locationId != null
                ? {
                        connect:  { 
                            id: input.locationId
                        }
                    }: undefined,  
                vendor: 
                input.vendorId != null
                ? {
                        connect:  { 
                            id: input.vendorId
                        }
                    }: undefined,  
                accountStatus: 
                input.accountStatusId != null
                ? {
                        connect:  { 
                            id: input.accountStatusId
                        }
                    }: undefined,  
                procedureType: 
                input.procedureTypeId != null
                ? {
                        connect:  { 
                            id: input.procedureTypeId
                        }
                    }: undefined,  
                agreementType: 
                input.agreementTypeId != null
                ? {
                        connect:  { 
                            id: input.agreementTypeId
                        }
                    }: undefined,  
                claimProcedure: 
                input.claimProcedureId != null
                ? {
                        connect:  { 
                            id: input.claimProcedureId
                        }
                    }: undefined,  
                invoiceDetail: 
                input.invoiceDetailId != null
                ? {
                        connect:  { 
                            id: input.invoiceDetailId
                        }
                    }: undefined,  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                portfolio: 
                input.portfolioId != null
                ? {
                        connect:  { 
                            id: input.portfolioId
                        }
                    }: undefined,  
                procedureVendor: 
                input.procedureVendorId != null
                ? {
                        connect:  { 
                            id: input.procedureVendorId
                        }
                    }: undefined,name: input.name, 
thirdPartyFunderName: input.thirdPartyFunderName, 
originalDueDate: input.originalDueDate, 
accountTerm: input.accountTerm, 
serviceDate: input.serviceDate, 
quantity: input.quantity, 
originalDebt: input.originalDebt, 
cost: input.cost, 
balance: input.balance, 
lastBalance: input.lastBalance, 
reduction: input.reduction, 
treatmentState: input.treatmentState, 
accountNumber: input.accountNumber, 
servicesPerformed: input.servicesPerformed, 
cptCodes: input.cptCodes, 
treatingPhysician: input.treatingPhysician, 
referringPhysician: input.referringPhysician, 
collectionsDate: input.collectionsDate, 
deemedWriteOffDate: input.deemedWriteOffDate, 
expensedBadDebtDate: input.expensedBadDebtDate, 
paidDate: input.paidDate, 
ghostAccount: input.ghostAccount, 
ghostedDate: input.ghostedDate, 
ghostedBy: input.ghostedBy, 
unGhostedDate: input.unGhostedDate, 
unGhostedBy: input.unGhostedBy, 
additionalPayment: input.additionalPayment, 
missingBill: input.missingBill, 
missingLien: input.missingLien, 
missingMedicalRecords: input.missingMedicalRecords, 
assignedTo: input.assignedTo, 
resubmitted: input.resubmitted, 
treatmentCity: input.treatmentCity, 
origination: input.origination, 
thresholdProviderRate: input.thresholdProviderRate, 
thresholdLocationRate: input.thresholdLocationRate, 
teamLeaderRateSource: input.teamLeaderRateSource, 
checkNumber: input.checkNumber, 
accountDateReceived: input.accountDateReceived, 
dateApplied: input.dateApplied, 
amountApplied: input.amountApplied, 
description: input.description, 
note: input.note, 
medicareRate: input.medicareRate, 
providerPercentOfMedicare: input.providerPercentOfMedicare, 
contractedAmount: input.contractedAmount, 
markupPercent: input.markupPercent, 
reimbursedTotal: input.reimbursedTotal, 
initialRevenue: input.initialRevenue, 
factor: input.factor, 
retailBill: input.retailBill, 
estMargin: input.estMargin, 
roi: input.roi, 
attorneyPaid: input.attorneyPaid, 
percentOfRetail: input.percentOfRetail, 
reimbursedFromPCR: input.reimbursedFromPCR, 
ingredientCost: input.ingredientCost, 
dispensingCost: input.dispensingCost, 
administrativeCost: input.administrativeCost, 
coPay: input.coPay, 
totalCost: input.totalCost, 
averageWholesalePrice: input.averageWholesalePrice, 
weightedAverageCost: input.weightedAverageCost, 
averageSalePrice: input.averageSalePrice, 
invoiceCost: input.invoiceCost, 
usualAndCustomary: input.usualAndCustomary, 
nationalDrugCode: input.nationalDrugCode, 

}
, include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true, caseAccountPayments: true, journalEntries: true, writeOffs: true} 
    })
  }

  async adminDeleteCaseAccount(adminId: string, caseAccountId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseAccount.delete({ where: { id: caseAccountId } })
  }
}

