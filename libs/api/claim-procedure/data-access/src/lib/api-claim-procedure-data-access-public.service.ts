
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListClaimProcedureInput } from './dto/user-list-claim-procedure.input'

@Injectable()
export class ApiClaimProcedureDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicClaimProcedures(input?: UserListClaimProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,
claimStatusId: input.claimStatusId,
claimId: input.claimId,
appointmentId: input.appointmentId,
procedureCodeId: input.procedureId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true}
    })
  }

  async publicSelectClaimProcedures(input?: UserListClaimProcedureInput) {
    let name = input?.name ? input.name : undefined

    return this.data.claimProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,
claimStatusId: input.claimStatusId,
claimId: input.claimId,
appointmentId: input.appointmentId,
procedureCodeId: input.procedureId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountClaimProcedures(input?: UserListClaimProcedureInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.claimProcedure.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            placeOfServiceId: input.placeOfServiceId,
claimStatusId: input.claimStatusId,
claimId: input.claimId,
appointmentId: input.appointmentId,
procedureCodeId: input.procedureId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicClaimProcedure(claimProcedureId) {

    return this.data.claimProcedure.findUnique({ where: { id: claimProcedureId } , include: {placeOfService: true, claimStatus: true, claim: true, appointment: true, procedure: true, caseAccounts: true}  })
  }
}


