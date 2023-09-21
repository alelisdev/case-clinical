
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthorizationImplantInput } from './dto/user-list-prior-authorization-implant.input'

@Injectable()
export class ApiPriorAuthorizationImplantDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthorizationImplants(input?: UserListPriorAuthorizationImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationImplant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantId: input.implantId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {implant: true, priorAuthorizationRequest: true}
    })
  }

  async publicSelectPriorAuthorizationImplants(input?: UserListPriorAuthorizationImplantInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationImplant.findMany({
      where: {
            AND: [{
            name: { contains: name },
            implantId: input.implantId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorAuthorizationImplants(input?: UserListPriorAuthorizationImplantInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationImplant.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            implantId: input.implantId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorAuthorizationImplant(priorAuthorizationImplantId) {

    return this.data.priorAuthorizationImplant.findUnique({ where: { id: priorAuthorizationImplantId } , include: {implant: true, priorAuthorizationRequest: true}  })
  }
}


