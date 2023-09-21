
import { ApiCoreDataAccessService, CorePaging, CorePagingInput,  } from '@case-clinical/api/core/data-access'
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { AdminCreateLegalCaseInput } from './dto/admin-create-legal-case.input'
import { AdminListLegalCaseInput } from './dto/admin-list-legal-case.input'
import { AdminListAccidentTypeInput } from '@case-clinical/api/accident-type/data-access'
import { AdminListPatientInput } from '@case-clinical/api/patient/data-access'
import { AdminListMedLevelInput } from '@case-clinical/api/med-level/data-access'
import { AdminListFirmInput } from '@case-clinical/api/firm/data-access'
import { AdminListAttorneyInput } from '@case-clinical/api/attorney/data-access'
import { AdminListCaseStatusInput } from '@case-clinical/api/case-status/data-access'
import { AdminListCaseTypeInput } from '@case-clinical/api/case-type/data-access'
import { AdminListPatientTreatmentStatusInput } from '@case-clinical/api/patient-treatment-status/data-access'
import { AdminListCaseProgressStatusInput } from '@case-clinical/api/case-progress-status/data-access'
import { AdminListAdverseInsuranceStatusInput } from '@case-clinical/api/adverse-insurance-status/data-access'
import { AdminUpdateLegalCaseInput } from './dto/admin-update-legal-case.input'

@Injectable()
export class ApiLegalCaseDataAccessAdminService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async adminLegalCases(adminId: string, input?: AdminListLegalCaseInput) {
    await this.data.ensureAdminUser(adminId)

    let name = input?.name ? input.name : undefined

    return this.data.legalCase.findMany({
      where: { 
            name: { 
                contains: name
            }
          },
      take: input?.limit,
      skip: input?.skip , include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true}
    })
  }

  async adminCountLegalCases(adminId: string, input?: AdminListLegalCaseInput): Promise<CorePaging> {
    await this.data.ensureAdminUser(adminId)
    let name = input?.name ? input.name : undefined

    const total = await this.data.legalCase.count(
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

  
  

  async adminLegalCase(adminId: string, legalCaseId) {
    await this.data.ensureAdminUser(adminId)
    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    return this.data.legalCase.findUnique({ where: { id: legalCaseId } , include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, appointments: true, caseAccounts: true, casePreAccidents: true, casePreInjuries: true, casePreProblems: true, casePreProcedures: true, caseProcedures: true, insurances: true, priorMedsToDates: true} })
  }

  async checkLegalCaseExist(legalCaseName: string) {
    try {
      return this.data.legalCase.findMany({ where: { name: legalCaseName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async adminCreateLegalCase(adminId: string, input: AdminCreateLegalCaseInput) {
    await this.data.ensureAdminUser(adminId)

    let adminUser = (await this.data.user.findFirst({where: { id: adminId }}))

    try {
      const legalCaseData = await this.checkLegalCaseExist(input.name)

      if (legalCaseData.length > 0) {
          throw new ConflictException("Record must be unique.")
      }
        return this.data.legalCase.create({
          data: { 
      
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                medLevel: 
                input.medLevelId != null
                ? {
                        connect:  { 
                            id: input.medLevelId
                        }
                    }: undefined,  
                firm: 
                input.firmId != null
                ? {
                        connect:  { 
                            id: input.firmId
                        }
                    }: undefined,  
                attorney: 
                input.attorneyId != null
                ? {
                        connect:  { 
                            id: input.attorneyId
                        }
                    }: undefined,  
                caseStatus: 
                input.caseStatusId != null
                ? {
                        connect:  { 
                            id: input.caseStatusId
                        }
                    }: undefined,  
                caseType: 
                input.caseTypeId != null
                ? {
                        connect:  { 
                            id: input.caseTypeId
                        }
                    }: undefined,  
                patientTreatmentStatus: 
                input.patientTreatmentStatusId != null
                ? {
                        connect:  { 
                            id: input.patientTreatmentStatusId
                        }
                    }: undefined,  
                caseProgressStatus: 
                input.caseProgressStatusId != null
                ? {
                        connect:  { 
                            id: input.caseProgressStatusId
                        }
                    }: undefined,  
                adverseInsuranceStatus: 
                input.adverseInsuranceStatusId != null
                ? {
                        connect:  { 
                            id: input.adverseInsuranceStatusId
                        }
                    }: undefined,  appointments:  input.appointments != null
                    ? {
                    createMany: {
                        data: [
                            ...input.appointments,
                        ]
                    },
                }: undefined,  caseAccounts:  input.caseAccounts != null
                    ? {
                    createMany: {
                        data: [
                            ...input.caseAccounts,
                        ]
                    },
                }: undefined,  casePreAccidents:  input.casePreAccidents != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreAccidents,
                        ]
                    },
                }: undefined,  casePreInjuries:  input.casePreInjuries != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreInjuries,
                        ]
                    },
                }: undefined,  casePreProblems:  input.casePreProblems != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreProblems,
                        ]
                    },
                }: undefined,  casePreProcedures:  input.casePreProcedures != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreProcedures,
                        ]
                    },
                }: undefined,  caseProcedures:  input.caseProcedures != null
                    ? {
                    createMany: {
                        data: [
                            ...input.caseProcedures,
                        ]
                    },
                }: undefined,  insurances:  input.insurances != null
                    ? {
                    createMany: {
                        data: [
                            ...input.insurances,
                        ]
                    },
                }: undefined,  priorMedsToDates:  input.priorMedsToDates != null
                    ? {
                    createMany: {
                        data: [
                            ...input.priorMedsToDates,
                        ]
                    },
                }: undefined,name: input.name, 
medicalRecordNumber: input.medicalRecordNumber, 
pharmacyControlNumber: input.pharmacyControlNumber, 
pchGroupNumber: input.pchGroupNumber, 
dateOfLoss: input.dateOfLoss, 
caseStatusDate: input.caseStatusDate, 
caseStatusOther: input.caseStatusOther, 
paralegal: input.paralegal, 
paralegalContact: input.paralegalContact, 
caseNoteSummary: input.caseNoteSummary, 
policyLimit: input.policyLimit, 
attorneyFee: input.attorneyFee, 
referringPhysician: input.referringPhysician, 
noMoreTreatment: input.noMoreTreatment, 
medpay: input.medpay, 
fileNumber: input.fileNumber, 
caseNumber: input.caseNumber, 
accidentState: input.accidentState, 
assignedTo: input.assignedTo, 
attorneyPaid: input.attorneyPaid, 
attorneySentDate: input.attorneySentDate, 
writeOff: input.writeOff, 
noMRI: input.noMRI, 
noPT: input.noPT, 
noFirstAppointment: input.noFirstAppointment, 
hot: input.hot, 
documentsUploaded: input.documentsUploaded, 
attorneyReview: input.attorneyReview, 
escalatedReview: input.escalatedReview, 
inActive: input.inActive, 
criteria1712: input.criteria1712, 
documentUploadedDate: input.documentUploadedDate, 
patientDischargedGatheringRecordsDate: input.patientDischargedGatheringRecordsDate, 
resubmitted: input.resubmitted, 
firmCaseManager: input.firmCaseManager, 
createdBy: input.createdBy, 
renegotiatePayOffDate: input.renegotiatePayOffDate, 
underwriting_dateCreated: input.underwriting_dateCreated, 
underwriting_lastUpdateDate: input.underwriting_lastUpdateDate, 
underwriting_timeSensitive: input.underwriting_timeSensitive, 
underwriting_needsMoreInfo: input.underwriting_needsMoreInfo, 
underwriting_billsAttached: input.underwriting_billsAttached, 
underwriting_completedMedRecs: input.underwriting_completedMedRecs, 
underwriting_balance: input.underwriting_balance, 
underwriting_signedLien: input.underwriting_signedLien, 
underwriting_procedureRequested: input.underwriting_procedureRequested, 
underwriting_medBills: input.underwriting_medBills, 
underwriting_estimate: input.underwriting_estimate, 
underwriting_plaintiff: input.underwriting_plaintiff, 
underwriting_covered: input.underwriting_covered, 
underwriting_remarks: input.underwriting_remarks, 
accidentInformation_accidentDescription: input.accidentInformation_accidentDescription, 
accidentInformation_dateOfLoss: input.accidentInformation_dateOfLoss, 
accidentInformation_review: input.accidentInformation_review, 
accidentInformation_initialEvaluation: input.accidentInformation_initialEvaluation, 
accidentInformation_evaluation: input.accidentInformation_evaluation, 
accidentInformation_evaluationAfterHowLong: input.accidentInformation_evaluationAfterHowLong, 
accidentInformation_evaluatedIn: input.accidentInformation_evaluatedIn, 
accidentInformation_complaints: input.accidentInformation_complaints, 
accidentInformation_previousHistory: input.accidentInformation_previousHistory, 
accidentInformation_gapInCare: input.accidentInformation_gapInCare, 
accidentInformation_gapInCareWhen: input.accidentInformation_gapInCareWhen, 
accidentInformation_preExistingProblems: input.accidentInformation_preExistingProblems, 
accidentInformation_priorInjuries: input.accidentInformation_priorInjuries, 
accidentInformation_otherInjuriesSince: input.accidentInformation_otherInjuriesSince, 
motorVehicleAccident_mvaDriver: input.motorVehicleAccident_mvaDriver, 
motorVehicleAccident_mvaPassenger: input.motorVehicleAccident_mvaPassenger, 
motorVehicleAccident_mvaVehicle: input.motorVehicleAccident_mvaVehicle, 
motorVehicleAccident_mvaClaimants: input.motorVehicleAccident_mvaClaimants, 
motorVehicleAccident_mvaOperable: input.motorVehicleAccident_mvaOperable, 
motorVehicleAccident_mvaTar: input.motorVehicleAccident_mvaTar, 
motorVehicleAccident_mvaDamage: input.motorVehicleAccident_mvaDamage, 
motorVehicleAccident_mvaLess: input.motorVehicleAccident_mvaLess, 
motorVehicleAccident_mvaGreater: input.motorVehicleAccident_mvaGreater, 
motorVehicleAccident_mvaAmount: input.motorVehicleAccident_mvaAmount, 
premiseAccident_clientHasObtainedPlaintiffAdvance: input.premiseAccident_clientHasObtainedPlaintiffAdvance, 
premiseAccident_advanceAmount: input.premiseAccident_advanceAmount, 
premiseAccident_lossOfEarningsIsBeingFiled: input.premiseAccident_lossOfEarningsIsBeingFiled, 
premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart: input.premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart, 
premiseAccident_explain: input.premiseAccident_explain, 
premiseAccident_clientHasCriminalHistory: input.premiseAccident_clientHasCriminalHistory, 
premiseAccident_criminalHistory: input.premiseAccident_criminalHistory, 
premiseAccident_locationOfIncident: input.premiseAccident_locationOfIncident, 
productLiability_product: input.productLiability_product, 
productLiability_whereDidItHappen: input.productLiability_whereDidItHappen, 
productLiability_proofOfLiability: input.productLiability_proofOfLiability, 
productLiability_productWasRecalled: input.productLiability_productWasRecalled, 
workRelated_selfInsuredWorkComp: input.workRelated_selfInsuredWorkComp, 
workRelated_workCompCaseIsOpenClosed: input.workRelated_workCompCaseIsOpenClosed, 
workRelated_workCompCaseSettledAmount: input.workRelated_workCompCaseSettledAmount, 
workRelated_workCompCaseSettlementIncludesFutureMedicals: input.workRelated_workCompCaseSettlementIncludesFutureMedicals, 
workRelated_reasonNotFiledUnderWorkComp: input.workRelated_reasonNotFiledUnderWorkComp, 

    }
    , include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, appointments: true, caseAccounts: true, casePreAccidents: true, casePreInjuries: true, casePreProblems: true, casePreProcedures: true, caseProcedures: true, insurances: true, priorMedsToDates: true} 
        })

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Language')
    }
  }

  async adminUpdateLegalCase(adminId: string, legalCaseId, input: AdminUpdateLegalCaseInput) {
    await this.data.ensureAdminUser(adminId)

    return this.data.legalCase.update({
      where: { id: legalCaseId },
      data: {
  
                accidentType: 
                input.accidentTypeId != null
                ? {
                        connect:  { 
                            id: input.accidentTypeId
                        }
                    }: undefined,  
                patient: 
                input.patientId != null
                ? {
                        connect:  { 
                            id: input.patientId
                        }
                    }: undefined,  
                medLevel: 
                input.medLevelId != null
                ? {
                        connect:  { 
                            id: input.medLevelId
                        }
                    }: undefined,  
                firm: 
                input.firmId != null
                ? {
                        connect:  { 
                            id: input.firmId
                        }
                    }: undefined,  
                attorney: 
                input.attorneyId != null
                ? {
                        connect:  { 
                            id: input.attorneyId
                        }
                    }: undefined,  
                caseStatus: 
                input.caseStatusId != null
                ? {
                        connect:  { 
                            id: input.caseStatusId
                        }
                    }: undefined,  
                caseType: 
                input.caseTypeId != null
                ? {
                        connect:  { 
                            id: input.caseTypeId
                        }
                    }: undefined,  
                patientTreatmentStatus: 
                input.patientTreatmentStatusId != null
                ? {
                        connect:  { 
                            id: input.patientTreatmentStatusId
                        }
                    }: undefined,  
                caseProgressStatus: 
                input.caseProgressStatusId != null
                ? {
                        connect:  { 
                            id: input.caseProgressStatusId
                        }
                    }: undefined,  
                adverseInsuranceStatus: 
                input.adverseInsuranceStatusId != null
                ? {
                        connect:  { 
                            id: input.adverseInsuranceStatusId
                        }
                    }: undefined,  appointments:  input.appointments != null
                    ? {
                    createMany: {
                        data: [
                            ...input.appointments,
                        ]
                    },
                }: undefined,  caseAccounts:  input.caseAccounts != null
                    ? {
                    createMany: {
                        data: [
                            ...input.caseAccounts,
                        ]
                    },
                }: undefined,  casePreAccidents:  input.casePreAccidents != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreAccidents,
                        ]
                    },
                }: undefined,  casePreInjuries:  input.casePreInjuries != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreInjuries,
                        ]
                    },
                }: undefined,  casePreProblems:  input.casePreProblems != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreProblems,
                        ]
                    },
                }: undefined,  casePreProcedures:  input.casePreProcedures != null
                    ? {
                    createMany: {
                        data: [
                            ...input.casePreProcedures,
                        ]
                    },
                }: undefined,  caseProcedures:  input.caseProcedures != null
                    ? {
                    createMany: {
                        data: [
                            ...input.caseProcedures,
                        ]
                    },
                }: undefined,  insurances:  input.insurances != null
                    ? {
                    createMany: {
                        data: [
                            ...input.insurances,
                        ]
                    },
                }: undefined,  priorMedsToDates:  input.priorMedsToDates != null
                    ? {
                    createMany: {
                        data: [
                            ...input.priorMedsToDates,
                        ]
                    },
                }: undefined,name: input.name, 
medicalRecordNumber: input.medicalRecordNumber, 
pharmacyControlNumber: input.pharmacyControlNumber, 
pchGroupNumber: input.pchGroupNumber, 
dateOfLoss: input.dateOfLoss, 
caseStatusDate: input.caseStatusDate, 
caseStatusOther: input.caseStatusOther, 
paralegal: input.paralegal, 
paralegalContact: input.paralegalContact, 
caseNoteSummary: input.caseNoteSummary, 
policyLimit: input.policyLimit, 
attorneyFee: input.attorneyFee, 
referringPhysician: input.referringPhysician, 
noMoreTreatment: input.noMoreTreatment, 
medpay: input.medpay, 
fileNumber: input.fileNumber, 
caseNumber: input.caseNumber, 
accidentState: input.accidentState, 
assignedTo: input.assignedTo, 
attorneyPaid: input.attorneyPaid, 
attorneySentDate: input.attorneySentDate, 
writeOff: input.writeOff, 
noMRI: input.noMRI, 
noPT: input.noPT, 
noFirstAppointment: input.noFirstAppointment, 
hot: input.hot, 
documentsUploaded: input.documentsUploaded, 
attorneyReview: input.attorneyReview, 
escalatedReview: input.escalatedReview, 
inActive: input.inActive, 
criteria1712: input.criteria1712, 
documentUploadedDate: input.documentUploadedDate, 
patientDischargedGatheringRecordsDate: input.patientDischargedGatheringRecordsDate, 
resubmitted: input.resubmitted, 
firmCaseManager: input.firmCaseManager, 
createdBy: input.createdBy, 
renegotiatePayOffDate: input.renegotiatePayOffDate, 
underwriting_dateCreated: input.underwriting_dateCreated, 
underwriting_lastUpdateDate: input.underwriting_lastUpdateDate, 
underwriting_timeSensitive: input.underwriting_timeSensitive, 
underwriting_needsMoreInfo: input.underwriting_needsMoreInfo, 
underwriting_billsAttached: input.underwriting_billsAttached, 
underwriting_completedMedRecs: input.underwriting_completedMedRecs, 
underwriting_balance: input.underwriting_balance, 
underwriting_signedLien: input.underwriting_signedLien, 
underwriting_procedureRequested: input.underwriting_procedureRequested, 
underwriting_medBills: input.underwriting_medBills, 
underwriting_estimate: input.underwriting_estimate, 
underwriting_plaintiff: input.underwriting_plaintiff, 
underwriting_covered: input.underwriting_covered, 
underwriting_remarks: input.underwriting_remarks, 
accidentInformation_accidentDescription: input.accidentInformation_accidentDescription, 
accidentInformation_dateOfLoss: input.accidentInformation_dateOfLoss, 
accidentInformation_review: input.accidentInformation_review, 
accidentInformation_initialEvaluation: input.accidentInformation_initialEvaluation, 
accidentInformation_evaluation: input.accidentInformation_evaluation, 
accidentInformation_evaluationAfterHowLong: input.accidentInformation_evaluationAfterHowLong, 
accidentInformation_evaluatedIn: input.accidentInformation_evaluatedIn, 
accidentInformation_complaints: input.accidentInformation_complaints, 
accidentInformation_previousHistory: input.accidentInformation_previousHistory, 
accidentInformation_gapInCare: input.accidentInformation_gapInCare, 
accidentInformation_gapInCareWhen: input.accidentInformation_gapInCareWhen, 
accidentInformation_preExistingProblems: input.accidentInformation_preExistingProblems, 
accidentInformation_priorInjuries: input.accidentInformation_priorInjuries, 
accidentInformation_otherInjuriesSince: input.accidentInformation_otherInjuriesSince, 
motorVehicleAccident_mvaDriver: input.motorVehicleAccident_mvaDriver, 
motorVehicleAccident_mvaPassenger: input.motorVehicleAccident_mvaPassenger, 
motorVehicleAccident_mvaVehicle: input.motorVehicleAccident_mvaVehicle, 
motorVehicleAccident_mvaClaimants: input.motorVehicleAccident_mvaClaimants, 
motorVehicleAccident_mvaOperable: input.motorVehicleAccident_mvaOperable, 
motorVehicleAccident_mvaTar: input.motorVehicleAccident_mvaTar, 
motorVehicleAccident_mvaDamage: input.motorVehicleAccident_mvaDamage, 
motorVehicleAccident_mvaLess: input.motorVehicleAccident_mvaLess, 
motorVehicleAccident_mvaGreater: input.motorVehicleAccident_mvaGreater, 
motorVehicleAccident_mvaAmount: input.motorVehicleAccident_mvaAmount, 
premiseAccident_clientHasObtainedPlaintiffAdvance: input.premiseAccident_clientHasObtainedPlaintiffAdvance, 
premiseAccident_advanceAmount: input.premiseAccident_advanceAmount, 
premiseAccident_lossOfEarningsIsBeingFiled: input.premiseAccident_lossOfEarningsIsBeingFiled, 
premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart: input.premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart, 
premiseAccident_explain: input.premiseAccident_explain, 
premiseAccident_clientHasCriminalHistory: input.premiseAccident_clientHasCriminalHistory, 
premiseAccident_criminalHistory: input.premiseAccident_criminalHistory, 
premiseAccident_locationOfIncident: input.premiseAccident_locationOfIncident, 
productLiability_product: input.productLiability_product, 
productLiability_whereDidItHappen: input.productLiability_whereDidItHappen, 
productLiability_proofOfLiability: input.productLiability_proofOfLiability, 
productLiability_productWasRecalled: input.productLiability_productWasRecalled, 
workRelated_selfInsuredWorkComp: input.workRelated_selfInsuredWorkComp, 
workRelated_workCompCaseIsOpenClosed: input.workRelated_workCompCaseIsOpenClosed, 
workRelated_workCompCaseSettledAmount: input.workRelated_workCompCaseSettledAmount, 
workRelated_workCompCaseSettlementIncludesFutureMedicals: input.workRelated_workCompCaseSettlementIncludesFutureMedicals, 
workRelated_reasonNotFiledUnderWorkComp: input.workRelated_reasonNotFiledUnderWorkComp, 

}
, include: {accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, appointments: true, caseAccounts: true, casePreAccidents: true, casePreInjuries: true, casePreProblems: true, casePreProcedures: true, caseProcedures: true, insurances: true, priorMedsToDates: true} 
    })
  }

  async adminDeleteLegalCase(adminId: string, legalCaseId) {
    await this.data.ensureAdminUser(adminId)

    return this.data.legalCase.delete({ where: { id: legalCaseId } })
  }
}

