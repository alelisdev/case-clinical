
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthorizationDiagnosisCodeInput } from './dto/admin-create-prior-authorization-diagnosis-code.input'
import { AdminListPriorAuthorizationDiagnosisCodeInput } from './dto/admin-list-prior-authorization-diagnosis-code.input'
import { AdminListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListPriorAuthorizationRequestInput } from '@case-clinical/api/prior-authorization-request/data-access'
import { AdminUpdatePriorAuthorizationDiagnosisCodeInput } from './dto/admin-update-prior-authorization-diagnosis-code.input'

@Injectable()
export class ApiPriorAuthorizationDiagnosisCodeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthorizationDiagnosisCodes(adminId: string, input?: AdminListPriorAuthorizationDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationDiagnosisCode.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, priorAuthorizationRequest: true}
    })
  }

  async adminCountPriorAuthorizationDiagnosisCodes(adminId: string, input?: AdminListPriorAuthorizationDiagnosisCodeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationDiagnosisCode.count(
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

  
  

  async adminPriorAuthorizationDiagnosisCode(adminId: string, priorAuthorizationDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthorizationDiagnosisCode.findUnique({ where: { id: priorAuthorizationDiagnosisCodeId } , include: {diagnosis: true, priorAuthorizationRequest: true} })
  }

  async checkPriorAuthorizationDiagnosisCodeExist(priorAuthorizationDiagnosisCodeName: string) {
    try {
      return this.data.priorAuthorizationDiagnosisCode.findMany({ where: { name: priorAuthorizationDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthorizationDiagnosisCode(adminId: string, input: AdminCreatePriorAuthorizationDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthorizationDiagnosisCodeData = await this.checkPriorAuthorizationDiagnosisCodeExist(input.name)

      if (priorAuthorizationDiagnosisCodeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthorizationDiagnosisCode.create({
          data: { 
      
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

    }
    , include: {diagnosis: true, priorAuthorizationRequest: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthorizationDiagnosisCode(adminId: string, priorAuthorizationDiagnosisCodeId, input: AdminUpdatePriorAuthorizationDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationDiagnosisCode.update({
      where: { id: priorAuthorizationDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
                        }
                    }: undefined,  
                priorAuthorizationRequest: 
                input.priorAuthorizationRequestId != null
                ? {
                        connect:  { 
                            id: input.priorAuthorizationRequestId
                        }
                    }: undefined,name: input.name, 

}
, include: {diagnosis: true, priorAuthorizationRequest: true} 
    })
  }

  async adminDeletePriorAuthorizationDiagnosisCode(adminId: string, priorAuthorizationDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationDiagnosisCode.delete({ where: { id: priorAuthorizationDiagnosisCodeId } })
  }
}

