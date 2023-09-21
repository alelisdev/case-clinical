
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAttorneyStatusInput } from './dto/user-list-attorney-status.input'

@Injectable()
export class ApiAttorneyStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAttorneyStatuses(input?: UserListAttorneyStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAttorneyStatuses(input?: UserListAttorneyStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.attorneyStatus.findMany({
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

  async publicCountAttorneyStatuses(input?: UserListAttorneyStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.attorneyStatus.count(
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

  async publicAttorneyStatus(attorneyStatusId) {

    return this.data.attorneyStatus.findUnique({ where: { id: attorneyStatusId } , include: {attorneys: true}  })
  }
}


