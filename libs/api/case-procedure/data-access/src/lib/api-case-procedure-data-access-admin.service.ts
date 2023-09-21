
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateCaseProcedureInput } from './dto/admin-create-case-procedure.input'
import { AdminListCaseProcedureInput } from './dto/admin-list-case-procedure.input'
import { AdminListLegalCaseInput } from '@case-clinical/api/legal-case/data-access'
import { AdminListAppointmentInput } from '@case-clinical/api/appointment/data-access'
import { AdminListLocationInput } from '@case-clinical/api/location/data-access'
import { AdminUpdateCaseProcedureInput } from './dto/admin-update-case-procedure.input'

@Injectable()
export class ApiCaseProcedureDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminCaseProcedures(adminId: string, input?: AdminListCaseProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    const name = input?.name ? input.name : undefined

    return this.data.caseProcedure.findMany({
      where: {
            name: {
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {legalCase: true, procedureType: true, appointment: true, procedureStatus: true, location: true}
    })
  }

  async adminCountCaseProcedures(adminId: string, input?: AdminListCaseProcedureInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    const name = input?.name ? input.name : undefined

    const total = await this.data.caseProcedure.count(
    {
      where: {
            name: {
                contains: name
            }
          }
        }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }




  async adminCaseProcedure(adminId: string, caseProcedureId) {
    await this.data.ensureAdminUser(adminId)
    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.caseProcedure.findUnique({ where: { id: caseProcedureId } , include: {legalCase: true, procedureType: true, procedureStatus: true, appointment: true, location: true, priorAuthorizationRequests: true, procedureVendors: true} })
  }

  async checkCaseProcedureExist(caseProcedureName: string) {
    try {
      return this.data.caseProcedure.findMany({ where: { name: caseProcedureName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateCaseProcedure(adminId: string, input: AdminCreateCaseProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    const adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const caseProcedureData = await this.checkCaseProcedureExist(input.name)

      if (caseProcedureData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.caseProcedure.create({
          data: {

                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,
                procedureType: input.procedureTypeId ? { connect: { id: input.procedureTypeId } } : undefined,
                procedureStatus: input.procedureStatusId ? { connect: { id: input.procedureStatusId } } : undefined,
                appointment:
                input.appointmentId != null
                ? {
                        connect:  {
                            id: input.appointmentId
                        }
                    }: undefined,
                location:
                input.locationId != null
                ? {
                        connect:  {
                            id: input.locationId
                        }
                    }: undefined,name: input.name,
procedureDate: input.procedureDate,
cost: input.cost,
notes: input.notes,
createdBy: input.createdBy,
dateCreated: input.dateCreated,
removed: input.removed,
approvedDate: input.approvedDate,
procedureReasonName: input.procedureReasonName,
decisionDate: input.decisionDate,
nextActionDate: input.nextActionDate,

    }
    , include: {legalCase: true, procedureType: true, appointment: true, location: true, procedureStatus: true, priorAuthorizationRequests: true, procedureVendors: true}
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateCaseProcedure(adminId: string, caseProcedureId, input: AdminUpdateCaseProcedureInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseProcedure.update({
      where: { id: caseProcedureId },
      data: {

                legalCase:
                input.legalCaseId != null
                ? {
                        connect:  {
                            id: input.legalCaseId
                        }
                    }: undefined,
                    procedureStatus: input.procedureStatusId ? { connect: { id: input.procedureStatusId } } : undefined,
                    procedureType: input.procedureTypeId ? { connect: { id: input.procedureTypeId } } : undefined,
                appointment:
                input.appointmentId != null
                ? {
                        connect:  {
                            id: input.appointmentId
                        }
                    }: undefined,
                location:
                input.locationId != null
                ? {
                        connect:  {
                            id: input.locationId
                        }
                    }: undefined,name: input.name,
procedureDate: input.procedureDate,
cost: input.cost,
notes: input.notes,
createdBy: input.createdBy,
dateCreated: input.dateCreated,
removed: input.removed,
approvedDate: input.approvedDate,
procedureReasonName: input.procedureReasonName,
decisionDate: input.decisionDate,
nextActionDate: input.nextActionDate,

}
, include: {legalCase: true, appointment: true, procedureType: true, procedureStatus: true, location: true, priorAuthorizationRequests: true, procedureVendors: true}
    })
  }

  async adminDeleteCaseProcedure(adminId: string, caseProcedureId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.caseProcedure.delete({ where: { id: caseProcedureId } })
  }
}

