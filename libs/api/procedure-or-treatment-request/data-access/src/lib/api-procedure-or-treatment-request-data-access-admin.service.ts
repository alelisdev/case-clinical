
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureOrTreatmentRequestInput } from './dto/admin-create-procedure-or-treatment-request.input'
import { AdminListProcedureOrTreatmentRequestInput } from './dto/admin-list-procedure-or-treatment-request.input'

import { AdminUpdateProcedureOrTreatmentRequestInput } from './dto/admin-update-procedure-or-treatment-request.input'

@Injectable()
export class ApiProcedureOrTreatmentRequestDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureOrTreatmentRequests(adminId: string, input?: AdminListProcedureOrTreatmentRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequest.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountProcedureOrTreatmentRequests(adminId: string, input?: AdminListProcedureOrTreatmentRequestInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequest.count(
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

  
  

  async adminProcedureOrTreatmentRequest(adminId: string, procedureOrTreatmentRequestId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureOrTreatmentRequest.findUnique({ where: { id: procedureOrTreatmentRequestId } , include: {authorizations: true, diagnosisCodes: true} })
  }

  async checkProcedureOrTreatmentRequestExist(procedureOrTreatmentRequestName: string) {
    try {
      return this.data.procedureOrTreatmentRequest.findMany({ where: { name: procedureOrTreatmentRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureOrTreatmentRequest(adminId: string, input: AdminCreateProcedureOrTreatmentRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureOrTreatmentRequestData = await this.checkProcedureOrTreatmentRequestExist(input.name)

      if (procedureOrTreatmentRequestData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureOrTreatmentRequest.create({
          data: { 
    name: input.name, 
status: input.status, 

    }
    , include: {authorizations: true, diagnosisCodes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureOrTreatmentRequest(adminId: string, procedureOrTreatmentRequestId, input: AdminUpdateProcedureOrTreatmentRequestInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureOrTreatmentRequest.update({
      where: { id: procedureOrTreatmentRequestId },
      data: {
name: input.name, 
status: input.status, 

}
, include: {authorizations: true, diagnosisCodes: true} 
    })
  }

  async adminDeleteProcedureOrTreatmentRequest(adminId: string, procedureOrTreatmentRequestId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureOrTreatmentRequest.delete({ where: { id: procedureOrTreatmentRequestId } })
  }
}

