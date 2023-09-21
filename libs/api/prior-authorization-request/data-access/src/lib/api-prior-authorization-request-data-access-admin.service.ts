
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreatePriorAuthorizationRequestInput } from './dto/admin-create-prior-authorization-request.input'
import { AdminListPriorAuthorizationRequestInput } from './dto/admin-list-prior-authorization-request.input'
import { AdminListProcedureSiteInput } from '@case-clinical/api/procedure-site/data-access'
import { AdminListSurgicalPositionInput } from '@case-clinical/api/surgical-position/data-access'
import { AdminListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { AdminListDocumentInput } from '@case-clinical/api/document/data-access'
import { AdminListVisitKindInput } from '@case-clinical/api/visit-kind/data-access'
import { AdminListGuidelineUsedInput } from '@case-clinical/api/guideline-used/data-access'
import { AdminListAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access'
import { AdminListAuthorizationStatusInput } from '@case-clinical/api/authorization-status/data-access'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'
import { AdminUpdatePriorAuthorizationRequestInput } from './dto/admin-update-prior-authorization-request.input'

@Injectable()
export class ApiPriorAuthorizationRequestDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminPriorAuthorizationRequests(adminId: string, input?: AdminListPriorAuthorizationRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationRequest.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, 
        prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, 
        patient: true, caseProcedure: true}
    })
  }

  async adminCountPriorAuthorizationRequests(adminId: string, input?: AdminListPriorAuthorizationRequestInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationRequest.count(
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

  
  

  async adminPriorAuthorizationRequest(adminId: string, priorAuthorizationRequestId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.priorAuthorizationRequest.findUnique({ where: { id: priorAuthorizationRequestId } , include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, 
        authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true, claims: true, priorAuthDmes: true, 
        priorAuthorizationDiagnosisCodes: true, priorAuthorizationEquipments: true, 
        priorAuthorizationImplants: true, priorAuthorizationProcedureCodes: true} })
  }

  async checkPriorAuthorizationRequestExist(priorAuthorizationRequestName: string) {
    try {
      return this.data.priorAuthorizationRequest.findMany({ where: { name: priorAuthorizationRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreatePriorAuthorizationRequest(adminId: string, input: AdminCreatePriorAuthorizationRequestInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const priorAuthorizationRequestData = await this.checkPriorAuthorizationRequestExist(input.name)

      if (priorAuthorizationRequestData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.priorAuthorizationRequest.create({
          data: { 
      
                procedureSite: 
                input.procedureSiteId != null
                ? {
                        connect:  { 
                            id: input.procedureSiteId
                        }
                    }: undefined,  
                surgicalPosition: 
                input.surgicalPositionId != null
                ? {
                        connect:  { 
                            id: input.surgicalPositionId
                        }
                    }: undefined,  
                treatingProvider: 
                input.treatingProviderId != null
                ? {
                        connect:  { 
                            id: input.treatingProviderId
                        }
                    }: undefined,  
                referredTo: 
                input.referredToId != null
                ? {
                        connect:  { 
                            id: input.referredToId
                        }
                    }: undefined,  
                prescription: 
                input.prescriptionId != null
                ? {
                        connect:  { 
                            id: input.prescriptionId
                        }
                    }: undefined,  
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  
                guidelineUsed: 
                input.guidelineUsedId != null
                ? {
                        connect:  { 
                            id: input.guidelineUsedId
                        }
                    }: undefined,  
                authorizationKind: 
                input.authorizationKindId != null
                ? {
                        connect:  { 
                            id: input.authorizationKindId
                        }
                    }: undefined,  
                authorizationStatus: 
                input.authorizationStatusId != null
                ? {
                        connect:  { 
                            id: input.authorizationStatusId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                caseProcedure: 
                input.caseProcedureId != null
                ? {
                        connect:  { 
                            id: input.caseProcedureId
                        }
                    }: undefined,name: input.name, 
referredOn: input.referredOn, 
approvedOn: input.approvedOn, 
effectiveAsOf: input.effectiveAsOf, 
expiresOn: input.expiresOn, 
duration: input.duration, 
procedureDescription: input.procedureDescription, 
remarks: input.remarks, 
underwritingApproved: input.underwritingApproved, 
tpaApproved: input.tpaApproved, 
requiresMedicalDirector: input.requiresMedicalDirector, 
reviewedOn: input.reviewedOn, 
priorAuthorizationNumber: input.priorAuthorizationNumber, 
caseManager: input.caseManager, 
memberNumber: input.memberNumber, 
medicalDirector: input.medicalDirector, 
tpaApprover: input.tpaApprover, 
underwriter: input.underwriter, 
guidelineRequires: input.guidelineRequires, 

    }
    , include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true, claims: true, priorAuthDmes: true,  priorAuthorizationDiagnosisCodes: true, priorAuthorizationEquipments: true, priorAuthorizationImplants: true, priorAuthorizationProcedureCodes: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdatePriorAuthorizationRequest(adminId: string, priorAuthorizationRequestId, input: AdminUpdatePriorAuthorizationRequestInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationRequest.update({
      where: { id: priorAuthorizationRequestId },
      data: {
  
                procedureSite: 
                input.procedureSiteId != null
                ? {
                        connect:  { 
                            id: input.procedureSiteId
                        }
                    }: undefined,  
                surgicalPosition: 
                input.surgicalPositionId != null
                ? {
                        connect:  { 
                            id: input.surgicalPositionId
                        }
                    }: undefined,  
                treatingProvider: 
                input.treatingProviderId != null
                ? {
                        connect:  { 
                            id: input.treatingProviderId
                        }
                    }: undefined,  
                referredTo: 
                input.referredToId != null
                ? {
                        connect:  { 
                            id: input.referredToId
                        }
                    }: undefined,  
                prescription: 
                input.prescriptionId != null
                ? {
                        connect:  { 
                            id: input.prescriptionId
                        }
                    }: undefined,  
                visitKind: 
                input.visitKindId != null
                ? {
                        connect:  { 
                            id: input.visitKindId
                        }
                    }: undefined,  
                guidelineUsed: 
                input.guidelineUsedId != null
                ? {
                        connect:  { 
                            id: input.guidelineUsedId
                        }
                    }: undefined,  
                authorizationKind: 
                input.authorizationKindId != null
                ? {
                        connect:  { 
                            id: input.authorizationKindId
                        }
                    }: undefined,  
                authorizationStatus: 
                input.authorizationStatusId != null
                ? {
                        connect:  { 
                            id: input.authorizationStatusId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                caseProcedure: 
                input.caseProcedureId != null
                ? {
                        connect:  { 
                            id: input.caseProcedureId
                        }
                    }: undefined,name: input.name, 
referredOn: input.referredOn, 
approvedOn: input.approvedOn, 
effectiveAsOf: input.effectiveAsOf, 
expiresOn: input.expiresOn, 
duration: input.duration, 
procedureDescription: input.procedureDescription, 
remarks: input.remarks, 
underwritingApproved: input.underwritingApproved, 
tpaApproved: input.tpaApproved, 
requiresMedicalDirector: input.requiresMedicalDirector, 
reviewedOn: input.reviewedOn, 
priorAuthorizationNumber: input.priorAuthorizationNumber, 
caseManager: input.caseManager, 
memberNumber: input.memberNumber, 
medicalDirector: input.medicalDirector, 
tpaApprover: input.tpaApprover, 
underwriter: input.underwriter, 
guidelineRequires: input.guidelineRequires, 

}
, include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, 
    prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, 
    patient: true, caseProcedure: true, claims: true, priorAuthDmes: true,  priorAuthorizationDiagnosisCodes: true, priorAuthorizationEquipments: true, priorAuthorizationImplants: true, priorAuthorizationProcedureCodes: true} 
    })
  }

  async adminDeletePriorAuthorizationRequest(adminId: string, priorAuthorizationRequestId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.priorAuthorizationRequest.delete({ where: { id: priorAuthorizationRequestId } })
  }
}

