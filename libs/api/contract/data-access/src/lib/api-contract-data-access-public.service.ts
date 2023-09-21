
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContractInput } from './dto/user-list-contract.input'

@Injectable()
export class ApiContractDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContracts(input?: UserListContractInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contract.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
billingOrganizationId: input.billingOrganizationId,
templateId: input.templateId,
vendorId: input.vendorId,
reconciliationPeriodTypeId: input.reconciliationPeriodTypeId,
calculationBasisTypeId: input.calculationBasisTypeId,
processId: input.processId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true}
    })
  }

  async publicSelectContracts(input?: UserListContractInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contract.findMany({
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
billingOrganizationId: input.billingOrganizationId,
templateId: input.templateId,
vendorId: input.vendorId,
reconciliationPeriodTypeId: input.reconciliationPeriodTypeId,
calculationBasisTypeId: input.calculationBasisTypeId,
processId: input.processId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountContracts(input?: UserListContractInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contract.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            organizationId: input.organizationId,
billingOrganizationId: input.billingOrganizationId,
templateId: input.templateId,
vendorId: input.vendorId,
reconciliationPeriodTypeId: input.reconciliationPeriodTypeId,
calculationBasisTypeId: input.calculationBasisTypeId,
processId: input.processId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicContract(contractId) {

    return this.data.contract.findUnique({ where: { id: contractId } , include: {organization: true, billingOrganization: true, template: true, vendor: true, reconciliationPeriodType: true, calculationBasisType: true, process: true, caseAccounts: true, contractedRates: true, contractTerms: true, documents: true, procedureVendors: true}  })
  }
}


