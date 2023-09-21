
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContractedRateKindInput } from './dto/user-list-contracted-rate-kind.input'

@Injectable()
export class ApiContractedRateKindDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContractedRateKinds(input?: UserListContractedRateKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRateKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectContractedRateKinds(input?: UserListContractedRateKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractedRateKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountContractedRateKinds(input?: UserListContractedRateKindInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contractedRateKind.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicContractedRateKind(contractedRateKindId) {

    return this.data.contractedRateKind.findUnique({ where: { id: contractedRateKindId } , include: {contractedRates: true}  })
  }
}


