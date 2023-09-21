
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/admin-create-procedure-or-treatment-request-diagnosis-code.input'
import { AdminListProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/admin-list-procedure-or-treatment-request-diagnosis-code.input'
import { AdminListDiagnosisCodeInput } from '@case-clinical/api/diagnosis-code/data-access'
import { AdminListProcedureOrTreatmentRequestInput } from '@case-clinical/api/procedure-or-treatment-request/data-access'
import { AdminUpdateProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/admin-update-procedure-or-treatment-request-diagnosis-code.input'

@Injectable()
export class ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminProcedureOrTreatmentRequestDiagnosisCodes(adminId: string, input?: AdminListProcedureOrTreatmentRequestDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, procedureOrTreatmentRequest: true}
    })
  }

  async adminCountProcedureOrTreatmentRequestDiagnosisCodes(adminId: string, input?: AdminListProcedureOrTreatmentRequestDiagnosisCodeInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequestDiagnosisCode.count(
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

  
  

  async adminProcedureOrTreatmentRequestDiagnosisCode(adminId: string, procedureOrTreatmentRequestDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findUnique({ where: { id: procedureOrTreatmentRequestDiagnosisCodeId } , include: {diagnosis: true, procedureOrTreatmentRequest: true} })
  }

  async checkProcedureOrTreatmentRequestDiagnosisCodeExist(procedureOrTreatmentRequestDiagnosisCodeName: string) {
    try {
      return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({ where: { name: procedureOrTreatmentRequestDiagnosisCodeName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateProcedureOrTreatmentRequestDiagnosisCode(adminId: string, input: AdminCreateProcedureOrTreatmentRequestDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const procedureOrTreatmentRequestDiagnosisCodeData = await this.checkProcedureOrTreatmentRequestDiagnosisCodeExist(input.name)

      if (procedureOrTreatmentRequestDiagnosisCodeData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.procedureOrTreatmentRequestDiagnosisCode.create({
          data: { 
      
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
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
    , include: {diagnosis: true, procedureOrTreatmentRequest: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateProcedureOrTreatmentRequestDiagnosisCode(adminId: string, procedureOrTreatmentRequestDiagnosisCodeId, input: AdminUpdateProcedureOrTreatmentRequestDiagnosisCodeInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureOrTreatmentRequestDiagnosisCode.update({
      where: { id: procedureOrTreatmentRequestDiagnosisCodeId },
      data: {
  
                diagnosis: 
                input.diagnosisCodeId != null
                ? {
                        connect:  { 
                            id: input.diagnosisCodeId
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
, include: {diagnosis: true, procedureOrTreatmentRequest: true} 
    })
  }

  async adminDeleteProcedureOrTreatmentRequestDiagnosisCode(adminId: string, procedureOrTreatmentRequestDiagnosisCodeId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.procedureOrTreatmentRequestDiagnosisCode.delete({ where: { id: procedureOrTreatmentRequestDiagnosisCodeId } })
  }
}

