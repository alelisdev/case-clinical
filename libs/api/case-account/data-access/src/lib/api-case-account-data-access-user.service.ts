
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateCaseAccountInput } from './dto/user-create-case-account.input'
import { UserListCaseAccountInput } from './dto/user-list-case-account.input'
import { UserUpdateCaseAccountInput } from './dto/user-update-case-account.input'
import { UserUpdateCaseAccountsInput } from './dto/user-update-case-accounts.input'

import { UserListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { UserListLocationInput } from '@case-clinical/api/location/data-access'
import { UserListVendorInput } from '@case-clinical/api/vendor/data-access'
import { UserListAccountStatusInput } from '@case-clinical/api/account-status/data-access'
import { UserListProcedureTypeInput } from '@case-clinical/api/procedure-type/data-access'
import { UserListAgreementTypeInput } from '@case-clinical/api/agreement-type/data-access'
import { UserListClaimProcedureInput } from '@case-clinical/api/claim-procedure/data-access'
import { UserListInvoiceDetailInput } from '@case-clinical/api/invoice-detail/data-access'
import { UserListContractInput } from '@case-clinical/api/contract/data-access'
import { UserListPortfolioInput } from '@case-clinical/api/portfolio/data-access'
import { UserListProcedureVendorInput } from '@case-clinical/api/procedure-vendor/data-access'

@Injectable()
export class ApiCaseAccountDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userCaseAccounts(userId: string, input?: UserListCaseAccountInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccount.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
locationId: input?.locationId,
vendorId: input?.vendorId,
accountStatusId: input?.accountStatusId,
procedureTypeId: input?.procedureTypeId,
agreementTypeId: input?.agreementTypeId,
claimProcedureId: input?.claimProcedureId,
invoiceDetailId: input?.invoiceDetailId,
contractId: input?.contractId,
portfolioId: input?.portfolioId,
procedureVendorId: input?.procedureVendorId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true}
    })
  }

  async userSelectCaseAccounts(userId: string, input?: UserListCaseAccountInput) {
    let name = input?.name ? input.name : undefined

    return this.data.caseAccount.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
locationId: input?.locationId,
vendorId: input?.vendorId,
accountStatusId: input?.accountStatusId,
procedureTypeId: input?.procedureTypeId,
agreementTypeId: input?.agreementTypeId,
claimProcedureId: input?.claimProcedureId,
invoiceDetailId: input?.invoiceDetailId,
contractId: input?.contractId,
portfolioId: input?.portfolioId,
procedureVendorId: input?.procedureVendorId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountCaseAccounts(userId: string, input?: UserListCaseAccountInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.caseAccount.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input?.legalCaseId,
locationId: input?.locationId,
vendorId: input?.vendorId,
accountStatusId: input?.accountStatusId,
procedureTypeId: input?.procedureTypeId,
agreementTypeId: input?.agreementTypeId,
claimProcedureId: input?.claimProcedureId,
invoiceDetailId: input?.invoiceDetailId,
contractId: input?.contractId,
portfolioId: input?.portfolioId,
procedureVendorId: input?.procedureVendorId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userCaseAccount(userId: string, caseAccountId) {

    return this.data.caseAccount.findUnique({ where: { id: caseAccountId } , include: {legalCase: true, location: true, vendor: true, accountStatus: true, 
      procedureType: true, agreementType: true, claimProcedure: true, invoiceDetail: true, contract: true, portfolio: true, procedureVendor: true, 
      caseAccountPayments: {
        include:{
          payment: true,
          caseAccount: true,
        }
      }, journalEntries: {
        include:{
          caseAccount: true,
        }
      }, writeOffs: {
        include: {
          account: true,
          writeOffStatus: true
        }
      }}  })
  }

  async checkCaseAccountExist(caseAccountName: string) {
    try {
      return this.data.caseAccount.findMany({ where: { name: caseAccountName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateCaseAccount(userId: string, input: UserCreateCaseAccountInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try { 


    await this.data.logEvent(sendingUser, true, 'CaseAccount', 'Create', input)

    let caseAccount = await this.data.caseAccount.create({
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

    await this.data.logEvent(sendingUser, false, 'CaseAccount', 'Create', caseAccount)

    return caseAccount

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Case Account')
    }

  }


  
  

  async userUpdateCaseAccount(userId: string, caseAccountId: string, input: UserUpdateCaseAccountInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!caseAccountId) {
        throw new BadRequestException('Case Account Id is required')
      } else { 



    await this.data.logEvent(sendingUser, true, 'CaseAccount', 'Update', input)

    let caseAccount = this.data.caseAccount.update({
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

    await this.data.logEvent(sendingUser, false, 'CaseAccount', 'Update', caseAccount)

    return caseAccount

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Case Account')
    }
  }

  async userUpdateCaseAccounts(userId: string, input: UserUpdateCaseAccountsInput): Promise<UpdateResult> {
    const total = input.caseAccounts.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.caseAccounts) {
      const inputData = input.caseAccounts[key]

      const data = {
        id: inputData.id, 
name: inputData.name, 
legalCaseId: inputData.legalCaseId, 
locationId: inputData.locationId, 
vendorId: inputData.vendorId, 
accountStatusId: inputData.accountStatusId, 
procedureTypeId: inputData.procedureTypeId, 
agreementTypeId: inputData.agreementTypeId, 
accountAgentId: inputData.accountAgentId, 
claimProcedureId: inputData.claimProcedureId, 
invoiceDetailId: inputData.invoiceDetailId, 
contractId: inputData.contractId, 
portfolioId: inputData.portfolioId, 
thirdPartyFunderName: inputData.thirdPartyFunderName, 
originalDueDate: inputData.originalDueDate, 
accountTerm: inputData.accountTerm, 
serviceDate: inputData.serviceDate, 
quantity: inputData.quantity, 
originalDebt: inputData.originalDebt, 
cost: inputData.cost, 
balance: inputData.balance, 
lastBalance: inputData.lastBalance, 
reduction: inputData.reduction, 
treatmentState: inputData.treatmentState, 
accountNumber: inputData.accountNumber, 
servicesPerformed: inputData.servicesPerformed, 
cptCodes: inputData.cptCodes, 
treatingPhysician: inputData.treatingPhysician, 
referringPhysician: inputData.referringPhysician, 
collectionsDate: inputData.collectionsDate, 
deemedWriteOffDate: inputData.deemedWriteOffDate, 
expensedBadDebtDate: inputData.expensedBadDebtDate, 
paidDate: inputData.paidDate, 
ghostAccount: inputData.ghostAccount, 
ghostedDate: inputData.ghostedDate, 
ghostedBy: inputData.ghostedBy, 
unGhostedDate: inputData.unGhostedDate, 
unGhostedBy: inputData.unGhostedBy, 
additionalPayment: inputData.additionalPayment, 
missingBill: inputData.missingBill, 
missingLien: inputData.missingLien, 
missingMedicalRecords: inputData.missingMedicalRecords, 
assignedTo: inputData.assignedTo, 
resubmitted: inputData.resubmitted, 
treatmentCity: inputData.treatmentCity, 
origination: inputData.origination, 
thresholdProviderRate: inputData.thresholdProviderRate, 
thresholdLocationRate: inputData.thresholdLocationRate, 
teamLeaderRateSource: inputData.teamLeaderRateSource, 
checkNumber: inputData.checkNumber, 
accountDateReceived: inputData.accountDateReceived, 
dateApplied: inputData.dateApplied, 
amountApplied: inputData.amountApplied, 
description: inputData.description, 
note: inputData.note, 
medicareRate: inputData.medicareRate, 
providerPercentOfMedicare: inputData.providerPercentOfMedicare, 
contractedAmount: inputData.contractedAmount, 
markupPercent: inputData.markupPercent, 
reimbursedTotal: inputData.reimbursedTotal, 
initialRevenue: inputData.initialRevenue, 
factor: inputData.factor, 
retailBill: inputData.retailBill, 
estMargin: inputData.estMargin, 
roi: inputData.roi, 
attorneyPaid: inputData.attorneyPaid, 
percentOfRetail: inputData.percentOfRetail, 
reimbursedFromPCR: inputData.reimbursedFromPCR, 
ingredientCost: inputData.ingredientCost, 
dispensingCost: inputData.dispensingCost, 
administrativeCost: inputData.administrativeCost, 
coPay: inputData.coPay, 
totalCost: inputData.totalCost, 
averageWholesalePrice: inputData.averageWholesalePrice, 
weightedAverageCost: inputData.weightedAverageCost, 
averageSalePrice: inputData.averageSalePrice, 
invoiceCost: inputData.invoiceCost, 
usualAndCustomary: inputData.usualAndCustomary, 
nationalDrugCode: inputData.nationalDrugCode, 
procedureVendorId: inputData.procedureVendorId, 

      }

      const caseAccountData = await this.checkCaseAccountExist(inputData.name)

      if (caseAccountData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.caseAccount.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteCaseAccount(userId: string, caseAccountId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))
    
    try {
      if (!caseAccountId) {
        throw new BadRequestException('Case Account Id is required')
      } else {


        const caseAccountPaymentCount = await this.data.caseAccountPayment.count({ where: { caseAccountId: caseAccountId }})
        if(caseAccountPaymentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account Payment')
        }


        const journalEntryCount = await this.data.journalEntry.count({ where: { caseAccountId: caseAccountId }})
        if(journalEntryCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Journal Entry')
        }


        const writeOffCount = await this.data.writeOff.count({ where: { accountId: caseAccountId }})
        if(writeOffCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Write off')
        }


        await this.data.logEvent(sendingUser, true, 'CaseAccount', 'Delete', caseAccountId)

        let caseAccount = this.data.caseAccount.delete({
          where: { id: caseAccountId }
        })

        await this.data.logEvent(sendingUser, false, 'CaseAccount', 'Delete', caseAccount)

        return caseAccount

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
        
        throw new InternalServerErrorException('Error in deleting Case Account')
    }
  }
}

