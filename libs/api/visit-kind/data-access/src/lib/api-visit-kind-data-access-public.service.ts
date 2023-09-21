
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListVisitKindInput } from './dto/user-list-visit-kind.input'

@Injectable()
export class ApiVisitKindDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicVisitKinds(input?: UserListVisitKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.visitKind.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectVisitKinds(input?: UserListVisitKindInput) {
    let name = input?.name ? input.name : undefined

    return this.data.visitKind.findMany({
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

  async publicCountVisitKinds(input?: UserListVisitKindInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.visitKind.count(
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

  async publicVisitKind(visitKindId) {

    return this.data.visitKind.findUnique({ where: { id: visitKindId } , include: {priorAuthorizationRequests: true}  })
  }
}


