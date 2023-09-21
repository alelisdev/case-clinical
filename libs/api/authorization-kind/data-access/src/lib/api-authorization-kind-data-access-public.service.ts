
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListAuthorizationKindInput } from './dto/user-list-authorization-kind.input'

@Injectable()
export class ApiAuthorizationKindDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicAuthorizationKinds(input?: UserListAuthorizationKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            categoryId: input.categoryId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {category: true}
    })
  }

  async publicSelectAuthorizationKinds(input?: UserListAuthorizationKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.authorizationKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            categoryId: input.categoryId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountAuthorizationKinds(input?: UserListAuthorizationKindInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.authorizationKind.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            categoryId: input.categoryId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicAuthorizationKind(authorizationKindId) {

    return this.data.authorizationKind.findUnique({ where: { id: authorizationKindId } , include: {category: true, priorAuthorizationRequests: true}  })
  }
}


