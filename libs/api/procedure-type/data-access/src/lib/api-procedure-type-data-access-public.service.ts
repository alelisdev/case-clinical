
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureTypeInput } from './dto/user-list-procedure-type.input'

@Injectable()
export class ApiProcedureTypeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureTypes(input?: UserListProcedureTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureType.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectProcedureTypes(input?: UserListProcedureTypeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureType.findMany({
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

  async publicCountProcedureTypes(input?: UserListProcedureTypeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureType.count(
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

  async publicProcedureType(procedureTypeId) {

    return this.data.procedureType.findUnique({ where: { id: procedureTypeId } , include: {caseAccounts: true}  })
  }
}


