
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateContractInput } from './dto/user-create-contract.input'
import { UserListContractInput } from './dto/user-list-contract.input'
import { UserUpdateContractInput } from './dto/user-update-contract.input'
import { UserUpdateContractsInput } from './dto/user-update-contracts.input'

import { UserListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { UserListTemplateInput } from '@case-clinical/api/template/data-access'
import { UserListVendorInput } from '@case-clinical/api/vendor/data-access'
import { UserListReconciliationPeriodTypeInput } from '@case-clinical/api/reconciliation-period-type/data-access'
import { UserListCalculationBasisTypeInput } from '@case-clinical/api/calculation-basis-type/data-access'
import { UserListProcessInput } from '@case-clinical/api/process/data-access'

@Injectable()
export class ApiContractDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userContracts(userId: string, input?: UserListContractInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contract.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
billingOrganizationId: input?.billingOrganizationId,
templateId: input?.templateId,
vendorId: input?.vendorId,
reconciliationPeriodTypeId: input?.reconciliationPeriodTypeId,
calculationBasisTypeId: input?.calculationBasisTypeId,
processId: input?.processId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}
    })
  }

  async userSelectContracts(userId: string, input?: UserListContractInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contract.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
billingOrganizationId: input?.billingOrganizationId,
templateId: input?.templateId,
vendorId: input?.vendorId,
reconciliationPeriodTypeId: input?.reconciliationPeriodTypeId,
calculationBasisTypeId: input?.calculationBasisTypeId,
processId: input?.processId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountContracts(userId: string, input?: UserListContractInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.contract.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input?.organizationId,
billingOrganizationId: input?.billingOrganizationId,
templateId: input?.templateId,
vendorId: input?.vendorId,
reconciliationPeriodTypeId: input?.reconciliationPeriodTypeId,
calculationBasisTypeId: input?.calculationBasisTypeId,
processId: input?.processId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userContract(userId: string, contractId) {

    return this.data.contract.findUnique({ where: { id: contractId } , include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true, caseAccounts: {include: {legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true}}, contractedRates: {include: {contract: true, contractedRateKind: true, contractKind: true}}, contractTerms: {include: {contract: true}}, documents: true, procedureVendors: {include: {procedure: true, contract: true, vendor: true}}}  })
  }

  async checkContractExist(contractName: string, vendorId:string, organizationId:string) {
    try {
      return this.data.contract.findMany({ where: { name: contractName, vendorId:vendorId, organizationId:organizationId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateContract(userId: string, input: UserCreateContractInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const contractData = await this.checkContractExist(input.name, input.vendorId, input.organizationId)

        if (contractData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Contract', 'Create', input)

    let contract = await this.data.contract.create({
      data: {

                organization:
                input.organizationId != null
                ? {
                        connect:  {
                            id: input.organizationId
                        }
                    }: undefined,
                billingOrganization:
                input.billingOrganizationId != null
                ? {
                        connect:  {
                            id: input.billingOrganizationId
                        }
                    }: undefined,
                template:
                input.templateId != null
                ? {
                        connect:  {
                            id: input.templateId
                        }
                    }: undefined,
                vendor:
                input.vendorId != null
                ? {
                        connect:  {
                            id: input.vendorId
                        }
                    }: undefined,
                reconciliationPeriodType:
                input.reconciliationPeriodTypeId != null
                ? {
                        connect:  {
                            id: input.reconciliationPeriodTypeId
                        }
                    }: undefined,
                calculationBasisType:
                input.calculationBasisTypeId != null
                ? {
                        connect:  {
                            id: input.calculationBasisTypeId
                        }
                    }: undefined,
                process:
                input.processId != null
                ? {
                        connect:  {
                            id: input.processId
                        }
                    }: undefined,name: input.name,
billOnBehalf: input.billOnBehalf,
billRate: input.billRate,
contractDate: input.contractDate,
maturityDate: input.maturityDate,
requiresTpaMedicalNecessity: input.requiresTpaMedicalNecessity,
requiresTpaMedicareAllowable: input.requiresTpaMedicareAllowable,
signed: input.signed,

}
, include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true, caseAccounts: true, contractedRates: true, contractTerms: true, documents: true, procedureVendors: true}
    })

    await this.data.logEvent(sendingUser, false, 'Contract', 'Create', contract)

    return contract

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Contract')
    }

  }





  async userUpdateContract(userId: string, contractId: string, input: UserUpdateContractInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contractId) {
        throw new BadRequestException('Contract Id is required')
      } else {

      const contractData = await this.checkContractExist(input.name, input.vendorId, input.organizationId)

      if (contractData.length > 0) {
        if (contractData[0].id != contractId) {
          throw new ConflictException("Record must be unique.")
        }
      }

    await this.data.logEvent(sendingUser, true, 'Contract', 'Update', input)

    let contract = this.data.contract.update({
      where: { id: contractId },
      data: {

                organization:
                input.organizationId != null
                ? {
                        connect:  {
                            id: input.organizationId
                        }
                    }: undefined,
                billingOrganization:
                input.billingOrganizationId != null
                ? {
                        connect:  {
                            id: input.billingOrganizationId
                        }
                    }: undefined,
                template:
                input.templateId != null
                ? {
                        connect:  {
                            id: input.templateId
                        }
                    }: undefined,
                vendor:
                input.vendorId != null
                ? {
                        connect:  {
                            id: input.vendorId
                        }
                    }: undefined,
                reconciliationPeriodType:
                input.reconciliationPeriodTypeId != null
                ? {
                        connect:  {
                            id: input.reconciliationPeriodTypeId
                        }
                    }: undefined,
                calculationBasisType:
                input.calculationBasisTypeId != null
                ? {
                        connect:  {
                            id: input.calculationBasisTypeId
                        }
                    }: undefined,
                process:
                input.processId != null
                ? {
                        connect:  {
                            id: input.processId
                        }
                    }: undefined,name: input.name,
billOnBehalf: input.billOnBehalf,
billRate: input.billRate,
contractDate: input.contractDate,
maturityDate: input.maturityDate,
requiresTpaMedicalNecessity: input.requiresTpaMedicalNecessity,
requiresTpaMedicareAllowable: input.requiresTpaMedicareAllowable,
signed: input.signed,

}
, include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true, caseAccounts: true, contractedRates: true, contractTerms: true, documents: true, procedureVendors: true}
    })

    await this.data.logEvent(sendingUser, false, 'Contract', 'Update', contract)

    return contract

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Contract')
    }
  }

  async userUpdateContracts(userId: string, input: UserUpdateContractsInput): Promise<UpdateResult> {
    const total = input.contracts.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.contracts) {
      const inputData = input.contracts[key]

      const data = {
        id: inputData.id,
name: inputData.name,
organizationId: inputData.organization?.id,
billingOrganizationId: inputData.billingOrganization?.id,
templateId: inputData.template?.id,
billOnBehalf: inputData.billOnBehalf,
billRate: inputData.billRate,
vendorId: inputData.vendor?.id,
contractDate: inputData.contractDate,
maturityDate: inputData.maturityDate,
requiresTpaMedicalNecessity: inputData.requiresTpaMedicalNecessity,
requiresTpaMedicareAllowable: inputData.requiresTpaMedicareAllowable,
reconciliationPeriodTypeId: inputData.reconciliationPeriodType?.id,
calculationBasisTypeId: inputData.calculationBasisType?.id,
signed: inputData.signed,
processId: inputData.process?.id,

      }

      const contractData = await this.checkContractExist(inputData.name, inputData.vendorId, inputData.organizationId)

      if (contractData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.contract.upsert({
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


  async userDeleteContract(userId: string, contractId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!contractId) {
        throw new BadRequestException('Contract Id is required')
      } else {

        const caseAccountCount = await this.data.caseAccount.count({ where: { contractId: contractId }})
        if(caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }


        const contractedRateCount = await this.data.contractedRate.count({ where: { contractId: contractId }})
        if(contractedRateCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Contracted Rate')
        }


        const documentCount = await this.data.document.count({ where: { contractId: contractId }})
        if(documentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Document')
        }


        const procedureVendorCount = await this.data.procedureVendor.count({ where: { contractId: contractId }})
        if(procedureVendorCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Procedure Vendor')
        }


        await this.data.logEvent(sendingUser, true, 'Contract', 'Delete', contractId)

        let contract = this.data.contract.delete({
          where: { id: contractId }
        })

        await this.data.logEvent(sendingUser, false, 'Contract', 'Delete', contract)

        return contract

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }
            throw new InternalServerErrorException('Error in deleting Contract')
    }
  }
}

