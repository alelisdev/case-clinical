
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureOrTreatmentRequestAuthorizationInput } from './dto/admin-create-procedure-or-treatment-request-authorization.input'
import { AdminListProcedureOrTreatmentRequestAuthorizationInput } from './dto/admin-list-procedure-or-treatment-request-authorization.input'
import { AdminListAuthorizationInput } from '@case-clinical/api/authorization/data-access'
import { AdminListProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access'
import { AdminUpdateProcedureOrTreatmentRequestAuthorizationInput } from './dto/admin-update-procedure-or-treatment-request-authorization.input'

@Injectable()
export class ApiProcedureOrTreatmentRequestAuthorizationDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureOrTreatmentRequestAuthorizations(adminId: string, input?: AdminListProcedureOrTreatmentRequestAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestAuthorization.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {authorization: true, procedureOrTreatmentRequest: true}
    })
  }

  async adminCountProcedureOrTreatmentRequestAuthorizations(adminId: string, input?: AdminListProcedureOrTreatmentRequestAuthorizationInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequestAuthorization.count(
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

  
  

  async adminProcedureOrTreatmentRequestAuthorization(adminId: string, procedureOrTreatmentRequestAuthorizationId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureOrTreatmentRequestAuthorization.findUnique({ where: { id: procedureOrTreatmentRequestAuthorizationId } , include: {authorization: true, procedureOrTreatmentRequest: true} })
  }

  async checkProcedureOrTreatmentRequestAuthorizationExist(procedureOrTreatmentRequestAuthorizationName: string) {
    try {
      return this.data.procedureOrTreatmentRequestAuthorization.findMany({ where: { name: procedureOrTreatmentRequestAuthorizationName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureOrTreatmentRequestAuthorization(adminId: string, input: AdminCreateProcedureOrTreatmentRequestAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureOrTreatmentRequestAuthorizationData = await this.checkProcedureOrTreatmentRequestAuthorizationExist(input.name)

      if (procedureOrTreatmentRequestAuthorizationData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureOrTreatmentRequestAuthorization.create({
          data: { 
      
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,  
                procedureOrTreatmentRequest: 
                input.procedureOrTreatmentRequestId != null
                ? {
                        connect:  { 
                            id: input.procedureOrTreatmentRequestId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {authorization: true, procedureOrTreatmentRequest: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureOrTreatmentRequestAuthorization(adminId: string, procedureOrTreatmentRequestAuthorizationId, input: AdminUpdateProcedureOrTreatmentRequestAuthorizationInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureOrTreatmentRequestAuthorization.update({
      where: { id: procedureOrTreatmentRequestAuthorizationId },
      data: {
  
                authorization: 
                input.authorizationId != null
                ? {
                        connect:  { 
                            id: input.authorizationId
                        }
                    }: undefined,  
                procedureOrTreatmentRequest: 
                input.procedureOrTreatmentRequestId != null
                ? {
                        connect:  { 
                            id: input.procedureOrTreatmentRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {authorization: true, procedureOrTreatmentRequest: true} 
    })
  }

  async adminDeleteProcedureOrTreatmentRequestAuthorization(adminId: string, procedureOrTreatmentRequestAuthorizationId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureOrTreatmentRequestAuthorization.delete({ where: { id: procedureOrTreatmentRequestAuthorizationId } })
  }
}

