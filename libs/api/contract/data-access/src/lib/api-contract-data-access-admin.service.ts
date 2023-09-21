
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContractInput } from './dto/admin-create-contract.input'
import { AdminListContractInput } from './dto/admin-list-contract.input'
import { AdminListOrganizationInput } from '@case-clinical/api/organization/data-access'
import { AdminListTemplateInput } from '@case-clinical/api/template/data-access'
import { AdminListVendorInput } from '@case-clinical/api/vendor/data-access'
import { AdminListReconciliationPeriodTypeInput } from '@case-clinical/api/reconciliation-period-type/data-access'
import { AdminListCalculationBasisTypeInput } from '@case-clinical/api/calculation-basis-type/data-access'
import { AdminListProcessInput } from '@case-clinical/api/process/data-access'
import { AdminUpdateContractInput } from './dto/admin-update-contract.input'

@Injectable()
export class ApiContractDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContracts(adminId: string, input?: AdminListContractInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contract.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}
    })
  }

  async adminCountContracts(adminId: string, input?: AdminListContractInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contract.count(
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

  
  

  async adminContract(adminId: string, contractId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contract.findUnique({ where: { id: contractId } , include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true, caseAccounts: true, contractedRates: true, contractTerms: true, documents: true, procedureVendors: true} })
  }

  async checkContractExist(contractName: string) {
    try {
      return this.data.contract.findMany({ where: { name: contractName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContract(adminId: string, input: AdminCreateContractInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contractData = await this.checkContractExist(input.name)

      if (contractData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contract.create({
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

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContract(adminId: string, contractId, input: AdminUpdateContractInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contract.update({
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
  }

  async adminDeleteContract(adminId: string, contractId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contract.delete({ where: { id: contractId } })
  }
}

