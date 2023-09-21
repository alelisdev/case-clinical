
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContractedRateKindInput } from './dto/admin-create-contracted-rate-kind.input'
import { AdminListContractedRateKindInput } from './dto/admin-list-contracted-rate-kind.input'

import { AdminUpdateContractedRateKindInput } from './dto/admin-update-contracted-rate-kind.input'

@Injectable()
export class ApiContractedRateKindDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContractedRateKinds(adminId: string, input?: AdminListContractedRateKindInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.contractedRateKind.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountContractedRateKinds(adminId: string, input?: AdminListContractedRateKindInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractedRateKind.count(
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

  
  

  async adminContractedRateKind(adminId: string, contractedRateKindId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contractedRateKind.findUnique({ where: { id: contractedRateKindId } , include: {contractedRates: true} })
  }

  async checkContractedRateKindExist(contractedRateKindName: string) {
    try {
      return this.data.contractedRateKind.findMany({ where: { name: contractedRateKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContractedRateKind(adminId: string, input: AdminCreateContractedRateKindInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contractedRateKindData = await this.checkContractedRateKindExist(input.name)

      if (contractedRateKindData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contractedRateKind.create({
          data: { 
    name: input.name, 
code: input.code, 
value: input.value, 

    }
    , include: {contractedRates: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateContractedRateKind(adminId: string, contractedRateKindId, input: AdminUpdateContractedRateKindInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractedRateKind.update({
      where: { id: contractedRateKindId },
      data: {
name: input.name, 
code: input.code, 
value: input.value, 

}
, include: {contractedRates: true} 
    })
  }

  async adminDeleteContractedRateKind(adminId: string, contractedRateKindId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractedRateKind.delete({ where: { id: contractedRateKindId } })
  }
}

