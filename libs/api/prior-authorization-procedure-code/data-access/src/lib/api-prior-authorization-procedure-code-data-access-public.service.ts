
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthorizationProcedureCodeInput } from './dto/user-list-prior-authorization-procedure-code.input'

@Injectable()
export class ApiPriorAuthorizationProcedureCodeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthorizationProcedureCodes(input?: UserListPriorAuthorizationProcedureCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationProcedureCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            costCategoryId: input.costCategoryId,
procedureId: input.procedureId,
priorAuthorizationRequestId: input.priorAuthorizationRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}
    })
  }

  async publicSelectPriorAuthorizationProcedureCodes(input?: UserListPriorAuthorizationProcedureCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationProcedureCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            costCategoryId: input.costCategoryId,
procedureId: input.procedureId,
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

  async publicCountPriorAuthorizationProcedureCodes(input?: UserListPriorAuthorizationProcedureCodeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationProcedureCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            costCategoryId: input.costCategoryId,
procedureId: input.procedureId,
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

  async publicPriorAuthorizationProcedureCode(priorAuthorizationProcedureCodeId) {

    return this.data.priorAuthorizationProcedureCode.findUnique({ where: { id: priorAuthorizationProcedureCodeId } , include: {costCategory: true, procedure: true, priorAuthorizationRequest: true}  })
  }
}


