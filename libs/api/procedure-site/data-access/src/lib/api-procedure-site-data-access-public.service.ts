
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureSiteInput } from './dto/user-list-procedure-site.input'

@Injectable()
export class ApiProcedureSiteDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureSites(input?: UserListProcedureSiteInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureSite.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectProcedureSites(input?: UserListProcedureSiteInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureSite.findMany({
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

  async publicCountProcedureSites(input?: UserListProcedureSiteInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureSite.count(
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

  async publicProcedureSite(procedureSiteId) {

    return this.data.procedureSite.findUnique({ where: { id: procedureSiteId } , include: {priorAuthorizationRequests: true}  })
  }
}


