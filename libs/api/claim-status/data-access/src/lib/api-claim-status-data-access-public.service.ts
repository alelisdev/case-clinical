
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClaimStatusInput } from './dto/user-list-claim-status.input'

@Injectable()
export class ApiClaimStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClaimStatuses(input?: UserListClaimStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectClaimStatuses(input?: UserListClaimStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimStatus.findMany({
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

  async publicCountClaimStatuses(input?: UserListClaimStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.claimStatus.count(
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

  async publicClaimStatus(claimStatusId) {

    return this.data.claimStatus.findUnique({ where: { id: claimStatusId } , include: {claimProcedures: true}  })
  }
}


