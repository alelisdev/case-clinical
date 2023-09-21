
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListLegalCaseInput } from './dto/user-list-legal-case.input'

@Injectable()
export class ApiLegalCaseDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicLegalCases(input?: UserListLegalCaseInput) {
    let name = input?.name ? input.name : undefined

    return this.data.legalCase.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
patientId: input.patientId,
medLevelId: input.medLevelId,
firmId: input.firmId,
attorneyId: input.attorneyId,
caseStatusId: input.caseStatusId,
caseTypeId: input.caseTypeId,
patientTreatmentStatusId: input.patientTreatmentStatusId,
caseProgressStatusId: input.caseProgressStatusId,
adverseInsuranceStatusId: input.adverseInsuranceStatusId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}
    })
  }

  async publicSelectLegalCases(input?: UserListLegalCaseInput) {
    let name = input?.name ? input.name : undefined

    return this.data.legalCase.findMany({
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
patientId: input.patientId,
medLevelId: input.medLevelId,
firmId: input.firmId,
attorneyId: input.attorneyId,
caseStatusId: input.caseStatusId,
caseTypeId: input.caseTypeId,
patientTreatmentStatusId: input.patientTreatmentStatusId,
caseProgressStatusId: input.caseProgressStatusId,
adverseInsuranceStatusId: input.adverseInsuranceStatusId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountLegalCases(input?: UserListLegalCaseInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.legalCase.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            accidentTypeId: input.accidentTypeId,
patientId: input.patientId,
medLevelId: input.medLevelId,
firmId: input.firmId,
attorneyId: input.attorneyId,
caseStatusId: input.caseStatusId,
caseTypeId: input.caseTypeId,
patientTreatmentStatusId: input.patientTreatmentStatusId,
caseProgressStatusId: input.caseProgressStatusId,
adverseInsuranceStatusId: input.adverseInsuranceStatusId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicLegalCase(legalCaseId) {

    return this.data.legalCase.findUnique({ where: { id: legalCaseId } , include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, appointments: true, caseAccounts: true, casePreAccidents: true, casePreInjuries: true, casePreProblems: true, casePreProcedures: true, caseProcedures: true, insurances: true, priorMedsToDates: true}  })
  }
}


