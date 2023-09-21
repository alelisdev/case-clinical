
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCasePreProcedureInput } from './dto/user-list-case-pre-procedure.input'

@Injectable()
export class ApiCasePreProcedureDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCasePreProcedures(input?: UserListCasePreProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true}
    })
  }

  async publicSelectCasePreProcedures(input?: UserListCasePreProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.casePreProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountCasePreProcedures(input?: UserListCasePreProcedureInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.casePreProcedure.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicCasePreProcedure(casePreProcedureId) {

    return this.data.casePreProcedure.findUnique({ where: { id: casePreProcedureId } , include: {legalCase: true}  })
  }
}


