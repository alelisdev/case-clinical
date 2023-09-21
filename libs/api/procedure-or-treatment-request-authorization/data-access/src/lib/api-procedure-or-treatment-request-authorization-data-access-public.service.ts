
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureOrTreatmentRequestAuthorizationInput } from './dto/user-list-procedure-or-treatment-request-authorization.input'

@Injectable()
export class ApiProcedureOrTreatmentRequestAuthorizationDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureOrTreatmentRequestAuthorizations(input?: UserListProcedureOrTreatmentRequestAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {authorization: true, procedureOrTreatmentRequest: true}
    })
  }

  async publicSelectProcedureOrTreatmentRequestAuthorizations(input?: UserListProcedureOrTreatmentRequestAuthorizationInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestAuthorization.findMany({
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountProcedureOrTreatmentRequestAuthorizations(input?: UserListProcedureOrTreatmentRequestAuthorizationInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequestAuthorization.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            authorizationId: input.authorizationId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicProcedureOrTreatmentRequestAuthorization(procedureOrTreatmentRequestAuthorizationId) {

    return this.data.procedureOrTreatmentRequestAuthorization.findUnique({ where: { id: procedureOrTreatmentRequestAuthorizationId } , include: {authorization: true, procedureOrTreatmentRequest: true}  })
  }
}


