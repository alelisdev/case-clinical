
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureOrTreatmentRequestInput } from './dto/user-list-procedure-or-treatment-request.input'

@Injectable()
export class ApiProcedureOrTreatmentRequestDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureOrTreatmentRequests(input?: UserListProcedureOrTreatmentRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            }]
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async publicSelectProcedureOrTreatmentRequests(input?: UserListProcedureOrTreatmentRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequest.findMany({
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

  async publicCountProcedureOrTreatmentRequests(input?: UserListProcedureOrTreatmentRequestInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequest.count(
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

  async publicProcedureOrTreatmentRequest(procedureOrTreatmentRequestId) {

    return this.data.procedureOrTreatmentRequest.findUnique({ where: { id: procedureOrTreatmentRequestId } , include: {authorizations: true, diagnosisCodes: true}  })
  }
}


