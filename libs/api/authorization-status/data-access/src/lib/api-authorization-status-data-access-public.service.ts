
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAuthorizationStatusInput } from './dto/user-list-authorization-status.input'

@Injectable()
export class ApiAuthorizationStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAuthorizationStatuses(input?: UserListAuthorizationStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAuthorizationStatuses(input?: UserListAuthorizationStatusInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationStatus.findMany({
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

  async publicCountAuthorizationStatuses(input?: UserListAuthorizationStatusInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationStatus.count(
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

  async publicAuthorizationStatus(authorizationStatusId) {

    return this.data.authorizationStatus.findUnique({ where: { id: authorizationStatusId } , include: {priorAuthorizationRequests: true}  })
  }
}


