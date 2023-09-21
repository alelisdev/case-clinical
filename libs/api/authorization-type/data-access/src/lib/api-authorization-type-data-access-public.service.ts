
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAuthorizationTypeInput } from './dto/user-list-authorization-type.input'

@Injectable()
export class ApiAuthorizationTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAuthorizationTypes(input?: UserListAuthorizationTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectAuthorizationTypes(input?: UserListAuthorizationTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationType.findMany({
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

  async publicCountAuthorizationTypes(input?: UserListAuthorizationTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationType.count(
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

  async publicAuthorizationType(authorizationTypeId) {

    return this.data.authorizationType.findUnique({ where: { id: authorizationTypeId } , include: {authorizations: true}  })
  }
}


