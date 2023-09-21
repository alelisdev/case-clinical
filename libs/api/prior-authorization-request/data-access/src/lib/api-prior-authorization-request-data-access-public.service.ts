
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserListPriorAuthorizationRequestInput } from './dto/user-list-prior-authorization-request.input'

@Injectable()
export class ApiPriorAuthorizationRequestDataAccessPublicService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async publicPriorAuthorizationRequests(input?: UserListPriorAuthorizationRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureSiteId: input.procedureSiteId,
surgicalPositionId: input.surgicalPositionId,
treatingProviderId: input.treatingProviderId,
referredToId: input.referredToId,
prescriptionId: input.prescriptionId,
visitKindId: input.visitKindId,
guidelineUsedId: input.guidelineUsedId,
authorizationKindId: input.authorizationKindId,
authorizationStatusId: input.authorizationStatusId,
billId: input.billId,
medicalReportId: input.medicalReportId,
patientId: input.patientId,
caseProcedureId: input.caseProcedureId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true}
    })
  }

  async publicSelectPriorAuthorizationRequests(input?: UserListPriorAuthorizationRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureSiteId: input.procedureSiteId,
surgicalPositionId: input.surgicalPositionId,
treatingProviderId: input.treatingProviderId,
referredToId: input.referredToId,
prescriptionId: input.prescriptionId,
visitKindId: input.visitKindId,
guidelineUsedId: input.guidelineUsedId,
authorizationKindId: input.authorizationKindId,
authorizationStatusId: input.authorizationStatusId,
billId: input.billId,
medicalReportId: input.medicalReportId,
patientId: input.patientId,
caseProcedureId: input.caseProcedureId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async publicCountPriorAuthorizationRequests(input?: UserListPriorAuthorizationRequestInput): Promise<CorePaging> {

    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            procedureSiteId: input.procedureSiteId,
surgicalPositionId: input.surgicalPositionId,
treatingProviderId: input.treatingProviderId,
referredToId: input.referredToId,
prescriptionId: input.prescriptionId,
visitKindId: input.visitKindId,
guidelineUsedId: input.guidelineUsedId,
authorizationKindId: input.authorizationKindId,
authorizationStatusId: input.authorizationStatusId,
billId: input.billId,
medicalReportId: input.medicalReportId,
patientId: input.patientId,
caseProcedureId: input.caseProcedureId,}]
          },
    }
        )
    
    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async publicPriorAuthorizationRequest(priorAuthorizationRequestId) {

    return this.data.priorAuthorizationRequest.findUnique({ where: { id: priorAuthorizationRequestId } , include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true, claims: true, priorAuthDmes: true,  priorAuthorizationDiagnosisCodes: true, priorAuthorizationEquipments: true, priorAuthorizationImplants: true, priorAuthorizationProcedureCodes: true}  })
  }
}


