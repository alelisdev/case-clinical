
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListContractKindInput } from './dto/user-list-contract-kind.input'

@Injectable()
export class ApiContractKindDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicContractKinds(input?: UserListContractKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectContractKinds(input?: UserListContractKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.contractKind.findMany({
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

  async publicCountContractKinds(input?: UserListContractKindInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.contractKind.count(
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

  async publicContractKind(contractKindId) {

    return this.data.contractKind.findUnique({ where: { id: contractKindId } , include: {contractedRates: true}  })
  }
}


