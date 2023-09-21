
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureInput } from './dto/user-list-procedure.input'

@Injectable()
export class ApiProcedureDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedures(input?: UserListProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectProcedures(input?: UserListProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedure.findMany({
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

  async publicCountProcedures(input?: UserListProcedureInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedure.count(
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

  async publicProcedure(procedureId) {

    return this.data.procedure.findUnique({ where: { id: procedureId } , include: {priorAuthorizationProcedureCodes: true}  })
  }
}


