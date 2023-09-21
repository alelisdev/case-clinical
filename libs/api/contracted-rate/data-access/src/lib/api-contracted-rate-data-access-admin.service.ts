
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContractedRateInput } from './dto/admin-create-contracted-rate.input'
import { AdminListContractedRateInput } from './dto/admin-list-contracted-rate.input'
import { AdminListContractInput } from '@case-clinical/api/contract/data-access'
import { AdminListContractedRateKindInput } from '@case-clinical/api/contracted-rate-kind/data-access'
import { AdminListContractKindInput } from '@case-clinical/api/contract-kind/data-access'
import { AdminListVisitKindInput } from '@case-clinical/api/visit-kind/data-access'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListSpecialtyInput } from '@case-clinical/api/specialty/data-access'
import { AdminUpdateContractedRateInput } from './dto/admin-update-contracted-rate.input'

@Injectable()
export class ApiContractedRateDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContractedRates(adminId: string, input?: AdminListContractedRateInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contractedRate.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true}
    })
  }

  async adminCountContractedRates(adminId: string, input?: AdminListContractedRateInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractedRate.count(
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

  
  

  async adminContractedRate(adminId: string, contractedRateId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contractedRate.findUnique({ where: { id: contractedRateId } , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true} })
  }

  async checkContractedRateExist(contractedRateName: string) {
    try {
      return this.data.contractedRate.findMany({ where: { name: contractedRateName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContractedRate(adminId: string, input: AdminCreateContractedRateInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contractedRateData = await this.checkContractedRateExist(input.name)

      if (contractedRateData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contractedRate.create({
          data: { 
      
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                contractedRateKind: 
                input.contractedRateKindId != null
                ? {
                        connect:  { 
                            id: input.contractedRateKindId
                        }
                    }: undefined,  
                contractKind: 
                input.contractKindId != null
                ? {
                        connect:  { 
                            id: input.contractKindId
                        }
                    }: undefined,  
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
percentage: input.percentage, 
reimbursedRate: input.reimbursedRate, 
billOnBehalf: input.billOnBehalf, 

    }
    , include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContractedRate(adminId: string, contractedRateId, input: AdminUpdateContractedRateInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractedRate.update({
      where: { id: contractedRateId },
      data: {
  
                contract: 
                input.contractId != null
                ? {
                        connect:  { 
                            id: input.contractId
                        }
                    }: undefined,  
                contractedRateKind: 
                input.contractedRateKindId != null
                ? {
                        connect:  { 
                            id: input.contractedRateKindId
                        }
                    }: undefined,  
                contractKind: 
                input.contractKindId != null
                ? {
                        connect:  { 
                            id: input.contractKindId
                        }
                    }: undefined,  
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  
                clinicalProvider: 
                input.clinicalProviderId != null
                ? {
                        connect:  { 
                            id: input.clinicalProviderId
                        }
                    }: undefined,  
                specialty: 
                input.specialtyId != null
                ? {
                        connect:  { 
                            id: input.specialtyId
                        }
                    }: undefined,name: input.name, 
amount: input.amount, 
percentage: input.percentage, 
reimbursedRate: input.reimbursedRate, 
billOnBehalf: input.billOnBehalf, 

}
, include: {contract: true, contractedRateKind: true, contractKind: true, visitKind: true, clinicalProvider: true, specialty: true} 
    })
  }

  async adminDeleteContractedRate(adminId: string, contractedRateId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractedRate.delete({ where: { id: contractedRateId } })
  }
}

