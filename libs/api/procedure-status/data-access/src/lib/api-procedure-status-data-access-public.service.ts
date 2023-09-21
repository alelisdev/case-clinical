
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureStatusInput } from './dto/user-list-procedure-status.input'

@Injectable()
export class ApiProcedureStatusDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureStatuses(input?: UserListProcedureStatusInput) {
    const name = input?.name ? input.name : undefined

    return this.data.procedureStatus.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicSelectProcedureStatuses(input?: UserListProcedureStatusInput) {
    const name = input?.name ? input.name : undefined

    return this.data.procedureStatus.findMany({
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

  async publicCountProcedureStatuses(input?: UserListProcedureStatusInput): Promise<CorePaging> {

    const name = input?.name ? input.name : undefined

    const total = await this.data.procedureStatus.count(
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

  async publicProcedureStatus(procedureStatusId) {

    return this.data.procedureStatus.findUnique({ where: { id: procedureStatusId } , include: {caseProcedures: true}  })
  }
}


