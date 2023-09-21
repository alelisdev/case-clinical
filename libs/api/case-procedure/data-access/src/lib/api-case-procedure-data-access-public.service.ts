
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListCaseProcedureInput } from './dto/user-list-case-procedure.input'

@Injectable()
export class ApiCaseProcedureDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicCaseProcedures(input?: UserListCaseProcedureInput) {
    const name = input?.name ? input.name : undefined

    return this.data.caseProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureTypeId: input.procedureTypeId,
            procedureStatusId: input.procedureStatusId,
            legalCaseId: input.legalCaseId,
appointmentId: input.appointmentId,
locationId: input.locationId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, procedureStatus: true, appointment: true, location: true}
    })
  }

  async publicSelectCaseProcedures(input?: UserListCaseProcedureInput) {
    const name = input?.name ? input.name : undefined

    return this.data.caseProcedure.findMany({
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
            procedureStatusId: input.procedureStatusId,
appointmentId: input.appointmentId,
procedureTypeId: input.procedureTypeId,
locationId: input.locationId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountCaseProcedures(input?: UserListCaseProcedureInput): Promise<CorePaging> {

    const name = input?.name ? input.name : undefined

    const total = await this.data.caseProcedure.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            legalCaseId: input.legalCaseId,
            procedureTypeId: input.procedureTypeId,
            procedureStatusId: input.procedureStatusId,
appointmentId: input.appointmentId,
locationId: input.locationId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicCaseProcedure(caseProcedureId) {

    return this.data.caseProcedure.findUnique({ where: { id: caseProcedureId } , include: {legalCase: true, procedureType: true, procedureStatus: true, appointment: true, location: true, priorAuthorizationRequests: true, procedureVendors: true}  })
  }
}


