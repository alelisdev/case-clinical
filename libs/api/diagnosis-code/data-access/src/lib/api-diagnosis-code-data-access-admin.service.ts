
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateDiagnosisCodeInput } from './dto/admin-create-diagnosis-code.input'
import { AdminListDiagnosisCodeInput } from './dto/admin-list-diagnosis-code.input'

import { AdminUpdateDiagnosisCodeInput } from './dto/admin-update-diagnosis-code.input'

@Injectable()
export class ApiDiagnosisCodeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminDiagnosisCodes(adminId: string, input?: AdminListDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.diagnosisCode.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip 
    })
  }

  async adminCountDiagnosisCodes(adminId: string, input?: AdminListDiagnosisCodeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.diagnosisCode.count(
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

  
  

  async adminDiagnosisCode(adminId: string, diagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.diagnosisCode.findUnique({ where: { id: diagnosisCodeId } , include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true} })
  }

  async checkDiagnosisCodeExist(diagnosisCodeName: string) {
    try {
      return this.data.diagnosisCode.findMany({ where: { name: diagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateDiagnosisCode(adminId: string, input: AdminCreateDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const diagnosisCodeData = await this.checkDiagnosisCodeExist(input.name)

      if (diagnosisCodeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.diagnosisCode.create({
          data: { 
    name: input.name, 

    }
    , include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateDiagnosisCode(adminId: string, diagnosisCodeId, input: AdminUpdateDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.diagnosisCode.update({
      where: { id: diagnosisCodeId },
      data: {
name: input.name, 

}
, include: {authorizationDiagnosisCodes: true, priorAuthorizationDiagnosisCodes: true, procedureOrTreatmentRequestDiagnosisCodes: true, recommendedOrderDiagnosisCodes: true} 
    })
  }

  async adminDeleteDiagnosisCode(adminId: string, diagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.diagnosisCode.delete({ where: { id: diagnosisCodeId } })
  }
}

