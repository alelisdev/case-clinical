
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListProcedureOrTreatmentRequestDiagnosisCodeInput } from './dto/user-list-procedure-or-treatment-request-diagnosis-code.input'

@Injectable()
export class ApiProcedureOrTreatmentRequestDiagnosisCodeDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicProcedureOrTreatmentRequestDiagnosisCodes(input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
procedureOrTreatmentRequestId: input.procedureOrTreatmentRequestId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {diagnosis: true, procedureOrTreatmentRequest: true}
    })
  }

  async publicSelectProcedureOrTreatmentRequestDiagnosisCodes(input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput) {
    let name = input?.name ? input.name : undefined

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findMany({
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
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

  async publicCountProcedureOrTreatmentRequestDiagnosisCodes(input?: UserListProcedureOrTreatmentRequestDiagnosisCodeInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.procedureOrTreatmentRequestDiagnosisCode.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            diagnosisCodeId: input.diagnosisCodeId,
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

  async publicProcedureOrTreatmentRequestDiagnosisCode(procedureOrTreatmentRequestDiagnosisCodeId) {

    return this.data.procedureOrTreatmentRequestDiagnosisCode.findUnique({ where: { id: procedureOrTreatmentRequestDiagnosisCodeId } , include: {diagnosis: true, procedureOrTreatmentRequest: true}  })
  }
}


