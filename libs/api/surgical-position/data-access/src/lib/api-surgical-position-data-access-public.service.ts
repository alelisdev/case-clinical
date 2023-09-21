
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListSurgicalPositionInput } from './dto/user-list-surgical-position.input'

@Injectable()
export class ApiSurgicalPositionDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicSurgicalPositions(input?: UserListSurgicalPositionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.surgicalPosition.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectSurgicalPositions(input?: UserListSurgicalPositionInput) {
    let name = input?.name ? input.name : undefined

    return this.data.surgicalPosition.findMany({
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

  async publicCountSurgicalPositions(input?: UserListSurgicalPositionInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.surgicalPosition.count(
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

  async publicSurgicalPosition(surgicalPositionId) {

    return this.data.surgicalPosition.findUnique({ where: { id: surgicalPositionId } , include: {priorAuthorizationRequests: true}  })
  }
}


