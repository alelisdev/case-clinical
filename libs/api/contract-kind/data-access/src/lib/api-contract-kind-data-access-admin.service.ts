
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateContractKindInput } from './dto/admin-create-contract-kind.input'
import { AdminListContractKindInput } from './dto/admin-list-contract-kind.input'

import { AdminUpdateContractKindInput } from './dto/admin-update-contract-kind.input'

@Injectable()
export class ApiContractKindDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminContractKinds(adminId: string, input?: AdminListContractKindInput) {
    await this.data.ensureAdminUser(adminId)

    const name = input?.name ? input.name : undefined

    return this.data.contractKind.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountContractKinds(adminId: string, input?: AdminListContractKindInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.contractKind.count(
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

  
  

  async adminContractKind(adminId: string, contractKindId) {
    await this.data.ensureAdminUser(adminId)
    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.contractKind.findUnique({ where: { id: contractKindId } , include: {contractedRates: true} })
  }

  async checkContractKindExist(contractKindName: string) {
    try {
      return this.data.contractKind.findMany({ where: { name: contractKindName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateContractKind(adminId: string, input: AdminCreateContractKindInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const contractKindData = await this.checkContractKindExist(input.name)

      if (contractKindData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.contractKind.create({
          data: { 
    name: input.name, 

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

  async adminUpdateContractKind(adminId: string, contractKindId, input: AdminUpdateContractKindInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractKind.update({
      where: { id: contractKindId },
      data: {
name: input.name, 

}
, include: {contractedRates: true} 
    })
  }

  async adminDeleteContractKind(adminId: string, contractKindId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.contractKind.delete({ where: { id: contractKindId } })
  }
}

