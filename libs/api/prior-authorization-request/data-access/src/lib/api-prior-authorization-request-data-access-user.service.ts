
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreatePriorAuthorizationRequestInput } from './dto/user-create-prior-authorization-request.input'
import { UserListPriorAuthorizationRequestInput } from './dto/user-list-prior-authorization-request.input'
import { UserUpdatePriorAuthorizationRequestInput } from './dto/user-update-prior-authorization-request.input'
import { UserUpdatePriorAuthorizationRequestsInput } from './dto/user-update-prior-authorization-requests.input'

import { UserListProcedureSiteInput } from '@case-clinical/api/procedure-site/data-access'
import { UserListSurgicalPositionInput } from '@case-clinical/api/surgical-position/data-access'
import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'
import { UserListDocumentInput } from '@case-clinical/api/document/data-access'
import { UserListVisitKindInput } from '@case-clinical/api/visit-kind/data-access'
import { UserListGuidelineUsedInput } from '@case-clinical/api/guideline-used/data-access'
import { UserListAuthorizationKindInput } from '@case-clinical/api/authorization-kind/data-access'
import { UserListAuthorizationStatusInput } from '@case-clinical/api/authorization-status/data-access'
import { UserListPatientInput } from '@case-clinical/api/patient/data-access'
import { UserListCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access'

@Injectable()
export class ApiPriorAuthorizationRequestDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userPriorAuthorizationRequests(userId: string, input?: UserListPriorAuthorizationRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureSiteId: input?.procedureSiteId,
surgicalPositionId: input?.surgicalPositionId,
treatingProviderId: input?.treatingProviderId,
referredToId: input?.referredToId,
prescriptionId: input?.prescriptionId,
visitKindId: input?.visitKindId,
guidelineUsedId: input?.guidelineUsedId,
authorizationKindId: input?.authorizationKindId,
authorizationStatusId: input?.authorizationStatusId,
patientId: input?.patientId,
caseProcedureId: input?.caseProcedureId,}]
          },
      take: input?.limit,
      skip: input?.skip , include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true}
    })
  }

  async userSelectPriorAuthorizationRequests(userId: string, input?: UserListPriorAuthorizationRequestInput) {
    let name = input?.name ? input.name : undefined

    return this.data.priorAuthorizationRequest.findMany({
      where: {
            AND: [{
            name: { contains: name },
            procedureSiteId: input?.procedureSiteId,
surgicalPositionId: input?.surgicalPositionId,
treatingProviderId: input?.treatingProviderId,
referredToId: input?.referredToId,
prescriptionId: input?.prescriptionId,
visitKindId: input?.visitKindId,
guidelineUsedId: input?.guidelineUsedId,
authorizationKindId: input?.authorizationKindId,
authorizationStatusId: input?.authorizationStatusId,
billId: input?.billId,
medicalReportId: input?.medicalReportId,
patientId: input?.patientId,
caseProcedureId: input?.caseProcedureId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountPriorAuthorizationRequests(userId: string, input?: UserListPriorAuthorizationRequestInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.priorAuthorizationRequest.count(
    {
      where: {
            AND: [{
            name: { contains: name },
            procedureSiteId: input?.procedureSiteId,
surgicalPositionId: input?.surgicalPositionId,
treatingProviderId: input?.treatingProviderId,
referredToId: input?.referredToId,
prescriptionId: input?.prescriptionId,
visitKindId: input?.visitKindId,
guidelineUsedId: input?.guidelineUsedId,
authorizationKindId: input?.authorizationKindId,
authorizationStatusId: input?.authorizationStatusId,
billId: input?.billId,
medicalReportId: input?.medicalReportId,
patientId: input?.patientId,
caseProcedureId: input?.caseProcedureId,}]
          },
    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userPriorAuthorizationRequest(userId: string, priorAuthorizationRequestId) {

    return this.data.priorAuthorizationRequest.findUnique({ where: { id: priorAuthorizationRequestId } ,
      include: {
        procedureSite: true,
        surgicalPosition: true,
        treatingProvider: true, referredTo: true, prescription: true, visitKind: true, guidelineUsed: true,
        authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true,
        claims: {
          include:{
            priorAuthorizationRequest: true,
            claim: true,
            patient: true
          }
        },
        priorAuthDmes: {
          include:{
            priorAuthorizationRequest: true,
            durableMedicalEquipment: true,
          }
        },
        priorAuthorizationDiagnosisCodes: {
          include:{
            diagnosis: true,
            priorAuthorizationRequest: true,
          }
        },
        priorAuthorizationEquipments: {
          include:{
            equipment: true,
            priorAuthorizationRequest: true,
          }
        },
        priorAuthorizationImplants: {
          include:{
            implant: true,
            priorAuthorizationRequest: true,
          }
        },
        priorAuthorizationProcedureCodes: {
          include:{
            costCategory: true,
            procedure: true,
            priorAuthorizationRequest: true,
          }
        }}  })
  }

  async checkPriorAuthorizationRequestExist(priorAuthorizationRequestName: string) {
    try {
      return this.data.priorAuthorizationRequest.findMany({ where: { name: priorAuthorizationRequestName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreatePriorAuthorizationRequest(userId: string, input: UserCreatePriorAuthorizationRequestInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
        const priorAuthorizationRequestData = await this.checkPriorAuthorizationRequestExist(input.name)

        if (priorAuthorizationRequestData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }


    if(input.prescription){
      let prescriptionId = (await this.data.userCreateDocument(userId, input.prescription)).id
      if(prescriptionId){
        input.prescriptionId = prescriptionId
     }
    }


    if(input.bill){
      let billId = (await this.data.userCreateDocument(userId, input.bill)).id
      if(billId){
        input.billId = billId
     }
    }


    if(input.medicalReport){
      let medicalReportId = (await this.data.userCreateDocument(userId, input.medicalReport)).id
      if(medicalReportId){
        input.medicalReportId = medicalReportId
     }
    }


    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationRequest', 'Create', input)

    let priorAuthorizationRequest = await this.data.priorAuthorizationRequest.create({
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

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationRequest', 'Create', priorAuthorizationRequest)

    return priorAuthorizationRequest

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Prior Authorization Request')
    }

  }





  async userUpdatePriorAuthorizationRequest(userId: string, priorAuthorizationRequestId: string, input: UserUpdatePriorAuthorizationRequestInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthorizationRequestId) {
        throw new BadRequestException('Prior Authorization Request Id is required')
      } else {

      const priorAuthorizationRequestData = await this.checkPriorAuthorizationRequestExist(input.name)

      if (priorAuthorizationRequestData.length > 0) {
        if (priorAuthorizationRequestData[0].id != priorAuthorizationRequestId) {
          throw new ConflictException("Record must be unique.")
        }
      }

    if(!input.authorizationStatusId && input.authorizationStatus) {
      const authorizationStatus = await this.data.authorizationStatus.findFirst({
        where: {
          id: input.authorizationStatus.id,
          name: input.authorizationStatus.name,
        }
      })
      if(!authorizationStatus) throw new BadRequestException(`Cannot fine authroizationStatus named ${input.authorizationStatus.name}`);
      else input.authorizationStatusId = authorizationStatus.id;
    }

    if(input.prescription){
      let prescriptionId = (await this.data.userCreateDocument(userId, input.prescription)).id
      if(prescriptionId){
        input.prescriptionId = prescriptionId
     }
    }


    if(input.bill){
      let billId = (await this.data.userCreateDocument(userId, input.bill)).id
      if(billId){
        input.billId = billId
     }
    }


    if(input.medicalReport){
      let medicalReportId = (await this.data.userCreateDocument(userId, input.medicalReport)).id
      if(medicalReportId){
        input.medicalReportId = medicalReportId
     }
    }


    await this.data.logEvent(sendingUser, true, 'PriorAuthorizationRequest', 'Update', input)

    let priorAuthorizationRequest = this.data.priorAuthorizationRequest.update({
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
, include: {procedureSite: true, surgicalPosition: true, treatingProvider: true, referredTo: true, prescription: true, visitKind: true,
  guidelineUsed: true, authorizationKind: true, authorizationStatus: true, patient: true, caseProcedure: true, claims: true, priorAuthDmes: true,
 priorAuthorizationDiagnosisCodes: true, priorAuthorizationEquipments: true, priorAuthorizationImplants: true, priorAuthorizationProcedureCodes: true}
    })

    await this.data.logEvent(sendingUser, false, 'PriorAuthorizationRequest', 'Update', priorAuthorizationRequest)

    return priorAuthorizationRequest

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Prior Authorization Request')
    }
  }

  async userUpdatePriorAuthorizationRequests(userId: string, input: UserUpdatePriorAuthorizationRequestsInput): Promise<UpdateResult> {
    const total = input.priorAuthorizationRequests.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.priorAuthorizationRequests) {
      const inputData = input.priorAuthorizationRequests[key]

      const data = {
        id: inputData.id,
name: inputData.name,
referredOn: inputData.referredOn,
approvedOn: inputData.approvedOn,
effectiveAsOf: inputData.effectiveAsOf,
expiresOn: inputData.expiresOn,
duration: inputData.duration,
procedureSiteId: inputData.procedureSiteId,
surgicalPositionId: inputData.surgicalPositionId,
procedureDescription: inputData.procedureDescription,
remarks: inputData.remarks,
underwritingApproved: inputData.underwritingApproved,
tpaApproved: inputData.tpaApproved,
requiresMedicalDirector: inputData.requiresMedicalDirector,
reviewedOn: inputData.reviewedOn,
treatingProviderId: inputData.treatingProviderId,
referredToId: inputData.referredToId,
priorAuthorizationNumber: inputData.priorAuthorizationNumber,
caseManager: inputData.caseManager,
memberNumber: inputData.memberNumber,
medicalDirector: inputData.medicalDirector,
tpaApprover: inputData.tpaApprover,
underwriter: inputData.underwriter,
prescriptionId: inputData.prescriptionId,
visitKindId: inputData.visitKindId,
guidelineUsedId: inputData.guidelineUsedId,
guidelineRequires: inputData.guidelineRequires,
authorizationKindId: inputData.authorizationKindId,
authorizationStatusId: inputData.authorizationStatusId,
billId: inputData.billId,
medicalReportId: inputData.medicalReportId,
patientId: inputData.patientId,
caseProcedureId: inputData.caseProcedureId,

      }

      const priorAuthorizationRequestData = await this.checkPriorAuthorizationRequestExist(inputData.name)

      if (priorAuthorizationRequestData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.priorAuthorizationRequest.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeletePriorAuthorizationRequest(userId: string, priorAuthorizationRequestId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!priorAuthorizationRequestId) {
        throw new BadRequestException('Prior Authorization Request Id is required')
      } else {


        const claimCount = await this.data.claim.count({ where: { priorAuthorizationRequestId: priorAuthorizationRequestId }})
        if(claimCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Claim')
        }


        const priorAuthDmeCount = await this.data.priorAuthDme.count({ where: { priorAuthId: priorAuthorizationRequestId }})
        if(priorAuthDmeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Auth Dme')
        }


        const priorAuthGuidelineCount = await this.data.priorAuthGuideline.count({ where: { priorAuthorizationRequestId: priorAuthorizationRequestId }})
        if(priorAuthGuidelineCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Auth Guideline')
        }


        const priorAuthorizationDiagnosisCodeCount = await this.data.priorAuthorizationDiagnosisCode.count({ where: { priorAuthorizationRequestId: priorAuthorizationRequestId }})
        if(priorAuthorizationDiagnosisCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Diagnosis Code')
        }


        const priorAuthorizationEquipmentCount = await this.data.priorAuthorizationEquipment.count({ where: { priorAuthorizationRequestId: priorAuthorizationRequestId }})
        if(priorAuthorizationEquipmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Equipment')
        }


        const priorAuthorizationImplantCount = await this.data.priorAuthorizationImplant.count({ where: { priorAuthorizationRequestId: priorAuthorizationRequestId }})
        if(priorAuthorizationImplantCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Implant')
        }


        const priorAuthorizationProcedureCodeCount = await this.data.priorAuthorizationProcedureCode.count({ where: { priorAuthorizationRequestId: priorAuthorizationRequestId }})
        if(priorAuthorizationProcedureCodeCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Authorization Procedure Code')
        }


        await this.data.logEvent(sendingUser, true, 'PriorAuthorizationRequest', 'Delete', priorAuthorizationRequestId)

        let priorAuthorizationRequest = this.data.priorAuthorizationRequest.delete({
          where: { id: priorAuthorizationRequestId }
        })

        await this.data.logEvent(sendingUser, false, 'PriorAuthorizationRequest', 'Delete', priorAuthorizationRequest)

        return priorAuthorizationRequest

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Prior Authorization Request')
    }
  }
}

