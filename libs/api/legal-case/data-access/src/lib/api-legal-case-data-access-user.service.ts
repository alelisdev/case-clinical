
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult } from '@case-clinical/api/core/data-access'
import { UserCreateLegalCaseInput } from './dto/user-create-legal-case.input'
import { UserListLegalCaseInput } from './dto/user-list-legal-case.input'
import { UserUpdateLegalCaseInput } from './dto/user-update-legal-case.input'
import { UserUpdateLegalCasesInput } from './dto/user-update-legal-cases.input'

import { UserListAccidentTypeInput } from '@case-clinical/api/accident-type/data-access'
import { UserListPatientInput } from '@case-clinical/api/patient/data-access'
import { UserListMedLevelInput } from '@case-clinical/api/med-level/data-access'
import { UserListFirmInput } from '@case-clinical/api/firm/data-access'
import { UserListAttorneyInput } from '@case-clinical/api/attorney/data-access'
import { UserListCaseStatusInput } from '@case-clinical/api/case-status/data-access'
import { UserListCaseTypeInput } from '@case-clinical/api/case-type/data-access'
import { UserListPatientTreatmentStatusInput } from '@case-clinical/api/patient-treatment-status/data-access'
import { UserListCaseProgressStatusInput } from '@case-clinical/api/case-progress-status/data-access'
import { UserListAdverseInsuranceStatusInput } from '@case-clinical/api/adverse-insurance-status/data-access'
import { UserUpdateDocumentInput } from '@case-clinical/api/document/data-access'

@Injectable()
export class ApiLegalCaseDataAccessUserService {
  constructor(
    private readonly data: ApiCoreSharedService
  ) { }

  async userLegalCaseUpdates(userId: string) {
    const user = await this.data.user.findUnique({ where: { id: userId } });
    if (user.attorneyId) {
      const legalCases = await this.data.legalCase.findMany({ where: { attorneyId: user.attorneyId }, include: { caseStatus: true } });
      const legalCasesUpdateNeeded = legalCases.filter((legalCase) => {
        const limitDate = new Date(legalCase.caseStatusDate);
        limitDate.setDate(limitDate.getDate() + legalCase.caseStatus.tickerDate);
        return limitDate > new Date();
      });
      return legalCasesUpdateNeeded;
    } else {
      return [];
    }
  }

  async userLegalCases(userId: string, input?: UserListLegalCaseInput) {
    const name = input?.name ? input.name : undefined

    // If current user is attorney, then set firmId by default
    const user = await this.data.user.findUnique({ where: { id: userId } });
    if (user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      input.firmId = attorney.firmId;
    }

    let attorneyIds;
    if (input?.attorneyId) {
      attorneyIds = [input?.attorneyId]
    } else if (input?.firmId) {
      attorneyIds = (await this.data.attorney.findMany({ where: { firmId: input?.firmId } })).flatMap((attorney) => attorney.id);
    }

    return this.data.legalCase.findMany({
      where: {
        AND: [{
          name: { contains: name },
          accidentTypeId: input?.accidentTypeId,
          patientId: input?.patientId,
          medLevelId: input?.medLevelId,
          attorneyId: input?.attorneyId ? input?.attorneyId : (
            attorneyIds ? {
              in: attorneyIds
            } : undefined
          ),
          caseStatusId: input?.caseStatusId,
          caseTypeId: input?.caseTypeId,
          patientTreatmentStatusId: input?.patientTreatmentStatusId,
          caseProgressStatusId: input?.caseProgressStatusId,
          adverseInsuranceStatusId: input?.adverseInsuranceStatusId,
        }]
      },
      orderBy: [
        {
          dateOfLoss: 'desc',
        },
      ],
      take: input?.limit,
      skip: input?.skip, include: { accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, propertyDamages: true, miscellaneousDocuments: true, caseProcedures: true }
    })
  }

  async userSelectLegalCases(userId: string, input?: UserListLegalCaseInput) {
    const name = input?.name ? input.name : undefined

    return this.data.legalCase.findMany({
      where: {
        AND: [{
          name: { contains: name },
          accidentTypeId: input?.accidentTypeId,
          patientId: input?.patientId,
          medLevelId: input?.medLevelId,
          firmId: input?.firmId,
          attorneyId: input?.attorneyId,
          caseStatusId: input?.caseStatusId,
          caseTypeId: input?.caseTypeId,
          patientTreatmentStatusId: input?.patientTreatmentStatusId,
          caseProgressStatusId: input?.caseProgressStatusId,
          adverseInsuranceStatusId: input?.adverseInsuranceStatusId,
        }]
      },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountLegalCases(userId: string, input?: UserListLegalCaseInput): Promise<CorePaging> {
    const name = input?.name ? input.name : undefined

    // If current user is attorney, then set firmId by default
    const user = await this.data.user.findUnique({ where: { id: userId } });
    if (user.attorneyId) {
      const attorney = await this.data.attorney.findUnique({ where: { id: user.attorneyId } });
      input.firmId = attorney.firmId;
    }

    let attorneyIds;
    if (input?.attorneyId) {
      attorneyIds = [input?.attorneyId]
    } else if (input?.firmId) {
      attorneyIds = (await this.data.attorney.findMany({ where: { firmId: input?.firmId } })).flatMap((attorney) => attorney.id);
    }

    const total = await this.data.legalCase.count(
      {
        where: {
          AND: [{
            name: { contains: name },
            accidentTypeId: input?.accidentTypeId,
            patientId: input?.patientId,
            medLevelId: input?.medLevelId,
            attorneyId: input?.attorneyId ? input?.attorneyId : (
              attorneyIds ? {
                in: attorneyIds
              } : undefined
            ),
            caseStatusId: input?.caseStatusId,
            caseTypeId: input?.caseTypeId,
            patientTreatmentStatusId: input?.patientTreatmentStatusId,
            caseProgressStatusId: input?.caseProgressStatusId,
            adverseInsuranceStatusId: input?.adverseInsuranceStatusId,
          }]
        },
      }
    )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userLegalCase(userId: string, legalCaseId) {

    const legalCase = await this.data.legalCase.findUnique({
      where: { id: legalCaseId },
      include: {
        propertyDamages: true, miscellaneousDocuments: true, balanceRequests: true, accidentType: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true,
        appointments: {
          include: {
            location: true, patient: true,
            clinicalProvider: { include: { clinicalProviderSpecialties: true } }, legalCase: true, appointmentStatus: true
          }
        },
        caseAccounts: { include: { legalCase: true, location: true, vendor: true, accountStatus: true, procedureType: true, agreementType: true, contract: true, portfolio: true, procedureVendor: true, claimProcedure:true } },
        casePreAccidents: { include: { legalCase: true } },
        casePreInjuries: { include: { legalCase: true } },
        casePreProblems: { include: { legalCase: true } },
        casePreProcedures: { include: { legalCase: true } },
        caseProcedures: {
          include: {
            legalCase: true,
            procedureType: true,
            procedureVendors: {
              include: {
                vendor: {
                  include: {
                    vendorType: true,

                  }
                },
                contract: {
                  include: {
                    process: true
                  }
                }
              }
            }
          }
        },
        patient: {
          include: {
            gender: true,
          }
        },
        insurances: { include: { legalCase: true, insuranceType: true, insuranceSector: true } },
        priorMedsToDates: { include: { specialty: true, visitKind: true, legalCase: true, priorMedsToDateStatus: true } }
      }
    })
    legalCase.propertyDamages = await this.getPropertyDamages(userId, legalCase);
    legalCase.miscellaneousDocuments = await this.getMiscellaneousDocuments(userId, legalCase);

    return legalCase
  }

  async checkLegalCaseExist(legalCaseName: string, firmId: string, patientId: string) {
    try {
      return this.data.legalCase.findMany({ where: { name: legalCaseName, firmId: firmId, patientId: patientId } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateLegalCase(userId: string, input: UserCreateLegalCaseInput) {
    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      const legalCaseData = await this.checkLegalCaseExist(input.name, input.firmId, input.patientId)

      if (legalCaseData.length > 0) {
        throw new ConflictException("Record must be unique.")
      }



      await this.data.logEvent(sendingUser, true, 'LegalCase', 'Create', input)

      const legalCase = await this.data.legalCase.create({
        data: {

          accidentType:
            input.accidentTypeId != null
              ? {
                connect: {
                  id: input.accidentTypeId
                }
              } : undefined,
          patient:
            input.patientId != null
              ? {
                connect: {
                  id: input.patientId
                }
              } : undefined,
          medLevel:
            input.medLevelId != null
              ? {
                connect: {
                  id: input.medLevelId
                }
              } : undefined,
          firm:
            input.firmId != null
              ? {
                connect: {
                  id: input.firmId
                }
              } : undefined,
          attorney:
            input.attorneyId != null
              ? {
                connect: {
                  id: input.attorneyId
                }
              } : undefined,
          caseStatus:
            input.caseStatusId != null
              ? {
                connect: {
                  id: input.caseStatusId
                }
              } : undefined,
          caseType:
            input.caseTypeId != null
              ? {
                connect: {
                  id: input.caseTypeId
                }
              } : undefined,
          patientTreatmentStatus:
            input.patientTreatmentStatusId != null
              ? {
                connect: {
                  id: input.patientTreatmentStatusId
                }
              } : undefined,
          caseProgressStatus:
            input.caseProgressStatusId != null
              ? {
                connect: {
                  id: input.caseProgressStatusId
                }
              } : undefined,
          adverseInsuranceStatus:
            input.adverseInsuranceStatusId != null
              ? {
                connect: {
                  id: input.adverseInsuranceStatusId
                }
              } : undefined, appointments: input.appointments != null
                ? {
                  createMany: {
                    data: [
                      ...input.appointments,
                    ]
                  },
                } : undefined, caseAccounts: input.caseAccounts != null
                  ? {
                    createMany: {
                      data: [
                        ...input.caseAccounts,
                      ]
                    },
                  } : undefined, casePreAccidents: input.casePreAccidents != null
                    ? {
                      createMany: {
                        data: [
                          ...input.casePreAccidents,
                        ]
                      },
                    } : undefined, casePreInjuries: input.casePreInjuries != null
                      ? {
                        createMany: {
                          data: [
                            ...input.casePreInjuries,
                          ]
                        },
                      } : undefined, casePreProblems: input.casePreProblems != null
                        ? {
                          createMany: {
                            data: [
                              ...input.casePreProblems,
                            ]
                          },
                        } : undefined, casePreProcedures: input.casePreProcedures != null
                          ? {
                            createMany: {
                              data: [
                                ...input.casePreProcedures,
                              ]
                            },
                          } : undefined, caseProcedures: input.caseProcedures != null
                            ? {
                              createMany: {
                                data: [
                                  ...input.caseProcedures,
                                ]
                              },
                            } : undefined, insurances: input.insurances != null
                              ? {
                                createMany: {
                                  data: [
                                    ...input.insurances,
                                  ]
                                },
                              } : undefined, priorMedsToDates: input.priorMedsToDates != null
                                ? {
                                  createMany: {
                                    data: [
                                      ...input.priorMedsToDates,
                                    ]
                                  },
                                } : undefined, name: input.name,
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
        , include: { propertyDamages: true, miscellaneousDocuments: true, accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, appointments: true, caseAccounts: true, casePreAccidents: true, casePreInjuries: true, casePreProblems: true, casePreProcedures: true, caseProcedures: true, insurances: true, priorMedsToDates: true }
      })

      await this.data.logEvent(sendingUser, false, 'LegalCase', 'Create', legalCase)

      const propertyDamageDocuments = [];
      if (input.propertyDamages) {
        for (const propertyDamageImage of input.propertyDamages) {
          propertyDamageImage.propertyDamageId = legalCase.id;
          const propertyDamageDocument = await this.data.userCreateDocument(userId, propertyDamageImage);
          if (!propertyDamageDocument) throw new BadRequestException('Cannot access azure storage');

          propertyDamageDocuments.push(propertyDamageDocument);
        }
        legalCase.propertyDamages = propertyDamageDocuments;
      }


      const miscellaneousDocuments = [];
      if (input.miscellaneousDocuments) {
        for (const miscellaneousDocument of input.miscellaneousDocuments) {
          miscellaneousDocument.miscellaneousId = legalCase.id;
          const miscellaneous_Document = await this.data.userCreateDocument(userId, miscellaneousDocument);
          if (!miscellaneous_Document) throw new BadRequestException('Cannot access azure storage');

          miscellaneousDocuments.push(miscellaneous_Document);
        }
        legalCase.miscellaneousDocuments = miscellaneousDocuments;
      }

      return legalCase

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Legal Case')
    }

  }





  async userUpdateLegalCase(userId: string, legalCaseId: string, input: UserUpdateLegalCaseInput) {

    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      if (!legalCaseId) {
        throw new BadRequestException('Legal Case Id is required')
      } else {

        const legalCaseData = await this.checkLegalCaseExist(input.name, input.firmId, input.patientId)

        if (legalCaseData.length > 0) {
          if (legalCaseData[0].id != legalCaseId) {
            throw new ConflictException("Record must be unique.")
          }
        }



        await this.data.logEvent(sendingUser, true, 'LegalCase', 'Update', input)

        const legalCase = this.data.legalCase.update({
          where: { id: legalCaseId },
          data: {

            accidentType:
              input.accidentTypeId != null
                ? {
                  connect: {
                    id: input.accidentTypeId
                  }
                } : undefined,
            patient:
              input.patientId != null
                ? {
                  connect: {
                    id: input.patientId
                  }
                } : undefined,
            medLevel:
              input.medLevelId != null
                ? {
                  connect: {
                    id: input.medLevelId
                  }
                } : undefined,
            firm:
              input.firmId != null
                ? {
                  connect: {
                    id: input.firmId
                  }
                } : undefined,
            attorney:
              input.attorneyId != null
                ? {
                  connect: {
                    id: input.attorneyId
                  }
                } : undefined,
            caseStatus:
              input.caseStatusId != null
                ? {
                  connect: {
                    id: input.caseStatusId
                  }
                } : undefined,
            caseType:
              input.caseTypeId != null
                ? {
                  connect: {
                    id: input.caseTypeId
                  }
                } : undefined,
            patientTreatmentStatus:
              input.patientTreatmentStatusId != null
                ? {
                  connect: {
                    id: input.patientTreatmentStatusId
                  }
                } : undefined,
            caseProgressStatus:
              input.caseProgressStatusId != null
                ? {
                  connect: {
                    id: input.caseProgressStatusId
                  }
                } : undefined,
            adverseInsuranceStatus:
              input.adverseInsuranceStatusId != null
                ? {
                  connect: {
                    id: input.adverseInsuranceStatusId
                  }
                } : undefined, appointments: input.appointments != null
                  ? {
                    createMany: {
                      data: [
                        ...input.appointments,
                      ]
                    },
                  } : undefined, caseAccounts: input.caseAccounts != null
                    ? {
                      createMany: {
                        data: [
                          ...input.caseAccounts,
                        ]
                      },
                    } : undefined, casePreAccidents: input.casePreAccidents != null
                      ? {
                        createMany: {
                          data: [
                            ...input.casePreAccidents,
                          ]
                        },
                      } : undefined, casePreInjuries: input.casePreInjuries != null
                        ? {
                          createMany: {
                            data: [
                              ...input.casePreInjuries,
                            ]
                          },
                        } : undefined, casePreProblems: input.casePreProblems != null
                          ? {
                            createMany: {
                              data: [
                                ...input.casePreProblems,
                              ]
                            },
                          } : undefined, casePreProcedures: input.casePreProcedures != null
                            ? {
                              createMany: {
                                data: [
                                  ...input.casePreProcedures,
                                ]
                              },
                            } : undefined, caseProcedures: input.caseProcedures != null
                              ? {
                                createMany: {
                                  data: [
                                    ...input.caseProcedures,
                                  ]
                                },
                              } : undefined, insurances: input.insurances != null
                                ? {
                                  createMany: {
                                    data: [
                                      ...input.insurances,
                                    ]
                                  },
                                } : undefined, priorMedsToDates: input.priorMedsToDates != null
                                  ? {
                                    createMany: {
                                      data: [
                                        ...input.priorMedsToDates,
                                      ]
                                    },
                                  } : undefined, name: input.name,
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
          , include: { propertyDamages: true, miscellaneousDocuments: true, accidentType: true, patient: true, medLevel: true, firm: true, attorney: true, caseStatus: true, caseType: true, patientTreatmentStatus: true, caseProgressStatus: true, adverseInsuranceStatus: true, appointments: true, caseAccounts: true, casePreAccidents: true, casePreInjuries: true, casePreProblems: true, casePreProcedures: true, caseProcedures: true, insurances: true, priorMedsToDates: true }
        })

        await this.data.logEvent(sendingUser, false, 'LegalCase', 'Update', legalCase)
        if (input.propertyDamages) {
          (await this.mergeDocuments(input.propertyDamages, legalCase.propertyDamages, userId, legalCaseId, legalCase));
        }

        if (input.miscellaneousDocuments) {
          (await this.mergeMiscellaneousDocuments(input.miscellaneousDocuments, legalCase.miscellaneousDocuments, userId, legalCaseId, legalCase));
        }
        return legalCase

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Legal Case')
    }
  }
  async mergeDocuments(
    upsertImages: UserUpdateDocumentInput[],
    propertyDamages,
    userId: string,
    legalCaseId: string,
    legalCase: any
  ) {

    if (!upsertImages) return [];
    const propertyDamageDocuments = [];

    for (const propertyDamageUpsertImage of upsertImages) {
      propertyDamageUpsertImage.propertyDamageId = legalCaseId;
      let propertyDamageImageDocument: any;
      if (propertyDamageUpsertImage.id) {
        propertyDamageImageDocument = await this.data.userUpdateDocument(userId, propertyDamageUpsertImage.id, propertyDamageUpsertImage);
        if (!propertyDamageImageDocument) throw new BadRequestException('Cannot access azure storage');
        propertyDamageDocuments.push(propertyDamageImageDocument);

      } else {
        propertyDamageImageDocument = await this.data.userCreateDocument(userId, propertyDamageUpsertImage);
        if (!propertyDamageImageDocument) throw new BadRequestException('Cannot access azure storage');
        propertyDamageDocuments.push(propertyDamageImageDocument);

      }

    }
    legalCase.propertyDamages = propertyDamageDocuments
    return propertyDamageDocuments;


  }


  async mergeMiscellaneousDocuments(
    upsertImages: UserUpdateDocumentInput[],
    miscellaneousDocuments,
    userId: string,
    legalCaseId: string,
    legalCase: any
  ) {

    if (!upsertImages) return [];
    const miscellaneous_Documents = [];

    for (const mergeMiscellaneousUpsertImage of upsertImages) {
      mergeMiscellaneousUpsertImage.miscellaneousId = legalCaseId;
      let miscellaneousDocument: any;
      if (mergeMiscellaneousUpsertImage.id) {
        miscellaneousDocument = await this.data.userUpdateDocument(userId, mergeMiscellaneousUpsertImage.id, mergeMiscellaneousUpsertImage);
        if (!miscellaneousDocument) throw new BadRequestException('Cannot access azure storage');
        miscellaneous_Documents.push(miscellaneousDocument);

      } else {
        miscellaneousDocument = await this.data.userCreateDocument(userId, mergeMiscellaneousUpsertImage);
        if (!miscellaneousDocument) throw new BadRequestException('Cannot access azure storage');
        miscellaneous_Documents.push(miscellaneousDocument);

      }

    }
    legalCase.miscellaneousDocuments = miscellaneous_Documents
    return miscellaneous_Documents;


  }

  async userUpdateLegalCases(userId: string, input: UserUpdateLegalCasesInput): Promise<UpdateResult> {
    const total = input.legalCases.length
    const updated = []
    const created = []
    const failed = []

    for (const key in input.legalCases) {
      const inputData = input.legalCases[key]

      const data = {
        id: inputData.id,
        name: inputData.name,
        accidentTypeId: inputData.accidentTypeId,
        patientId: inputData.patientId,
        medLevelId: inputData.medLevelId,
        firmId: inputData.firmId,
        attorneyId: inputData.attorneyId,
        agentId: inputData.agentId,
        caseStatusId: inputData.caseStatusId,
        caseTypeId: inputData.caseTypeId,
        patientTreatmentStatusId: inputData.patientTreatmentStatusId,
        medicalRecordNumber: inputData.medicalRecordNumber,
        pharmacyControlNumber: inputData.pharmacyControlNumber,
        pchGroupNumber: inputData.pchGroupNumber,
        dateOfLoss: inputData.dateOfLoss,
        caseStatusDate: inputData.caseStatusDate,
        caseStatusOther: inputData.caseStatusOther,
        paralegal: inputData.paralegal,
        paralegalContact: inputData.paralegalContact,
        caseNoteSummary: inputData.caseNoteSummary,
        policyLimit: inputData.policyLimit,
        attorneyFee: inputData.attorneyFee,
        referringPhysician: inputData.referringPhysician,
        noMoreTreatment: inputData.noMoreTreatment,
        medpay: inputData.medpay,
        fileNumber: inputData.fileNumber,
        caseNumber: inputData.caseNumber,
        accidentState: inputData.accidentState,
        assignedTo: inputData.assignedTo,
        attorneyPaid: inputData.attorneyPaid,
        attorneySentDate: inputData.attorneySentDate,
        writeOff: inputData.writeOff,
        noMRI: inputData.noMRI,
        noPT: inputData.noPT,
        noFirstAppointment: inputData.noFirstAppointment,
        hot: inputData.hot,
        documentsUploaded: inputData.documentsUploaded,
        attorneyReview: inputData.attorneyReview,
        escalatedReview: inputData.escalatedReview,
        inActive: inputData.inActive,
        criteria1712: inputData.criteria1712,
        documentUploadedDate: inputData.documentUploadedDate,
        patientDischargedGatheringRecordsDate: inputData.patientDischargedGatheringRecordsDate,
        resubmitted: inputData.resubmitted,
        caseProgressStatusId: inputData.caseProgressStatusId,
        firmCaseManager: inputData.firmCaseManager,
        adverseInsuranceStatusId: inputData.adverseInsuranceStatusId,
        createdBy: inputData.createdBy,
        renegotiatePayOffDate: inputData.renegotiatePayOffDate,

      }

      const legalCaseData = await this.checkLegalCaseExist(inputData.name, inputData.firmId, inputData.patientId)

      if (legalCaseData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.legalCase.upsert({
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


  async applyForPCH(userId: string, legalCaseId: string) {
    try {
      // ! Handling the validations.
      if (!legalCaseId) {
        throw new BadRequestException('Legal Case Id is required')
      }
      // * Fetching the user data and the legal case data for the data sync.
      const user = await this.data.user.findFirst({ where: { id: userId } })


      // * Add new default membership for the data sync in the event.
      // * Fetching the membership status and level data.
      //   let memberShipStatusDetails = await this.membershipStatus.userSelectMembershipStatuses(userId, {
      //     name: 'Pending',
      //   })
      //   let memberShipLevelDetails = await this.membershipLevel.userMembershipLevels(userId, {
      //     name: 'Bronze',
      //   })

      //   let defaultMemberShip: UserCreateMembershipInput = {
      //     name: 'Basic',
      //     onHold: false,
      //     membershipStatusId: memberShipStatusDetails[0].id,
      //     membershipLevelId: memberShipLevelDetails[0].id,
      //     legalCaseId,
      //   }
      //   // ! Creating the default membership and updating the legal case.
      //   await this.membership.userCreateMembership(userId, defaultMemberShip)


      // * Fetching the legal case details.
      const legalCaseDetails = await this.userLegalCase(userId, legalCaseId)
      // ! Handling the empty data.
      if (!legalCaseDetails) {
        throw new NotFoundException('Legal Case not found')
      } else {
        // * Syncing the data with the Admin portal using the Inngest event sync.
        try {
          // * Creating the Inngest event and syncing the event data.
          await this.data.userLogEvent(user, 'User.Create.ApplyForPCH', legalCaseDetails)
          return legalCaseDetails
        } catch (error) {
          // * Logging the error event in case of failure.
          await this.data.userLogEvent(user, 'FAILURE.LOG.EVENT.UserCreateApplyForPCH', error)
        }
      }
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error
      } else {
        throw new InternalServerErrorException('Error while Applying for PCH')
      }
    }
  }

  async userDeleteLegalCase(userId: string, legalCaseId: string) {
    const sendingUser = (await this.data.user.findFirst({ where: { id: userId } }))

    try {
      if (!legalCaseId) {
        throw new BadRequestException('Legal Case Id is required')
      } else {


        const appointmentCount = await this.data.appointment.count({ where: { legalCaseId: legalCaseId } })
        if (appointmentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Appointment')
        }


        const caseAccountCount = await this.data.caseAccount.count({ where: { legalCaseId: legalCaseId } })
        if (caseAccountCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Account')
        }


        const casePreAccidentCount = await this.data.casePreAccident.count({ where: { legalCaseId: legalCaseId } })
        if (casePreAccidentCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Pre Accident')
        }


        const casePreInjuryCount = await this.data.casePreInjury.count({ where: { legalCaseId: legalCaseId } })
        if (casePreInjuryCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Pre Injury')
        }


        const casePreProblemCount = await this.data.casePreProblem.count({ where: { legalCaseId: legalCaseId } })
        if (casePreProblemCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Pre Problem')
        }


        const casePreProcedureCount = await this.data.casePreProcedure.count({ where: { legalCaseId: legalCaseId } })
        if (casePreProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Pre Procedure')
        }


        const caseProcedureCount = await this.data.caseProcedure.count({ where: { legalCaseId: legalCaseId } })
        if (caseProcedureCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Case Procedure')
        }


        const insuranceCount = await this.data.insurance.count({ where: { legalCaseId: legalCaseId } })
        if (insuranceCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on an Insurance')
        }


        const priorMedsToDateCount = await this.data.priorMedsToDate.count({ where: { legalCaseId: legalCaseId } })
        if (priorMedsToDateCount > 0) {
          throw new BadRequestException('Record cannot be deleted because it is referenced on a Prior Meds to Date')
        }


        await this.data.logEvent(sendingUser, true, 'LegalCase', 'Delete', legalCaseId)

        const legalCase = this.data.legalCase.delete({
          where: { id: legalCaseId }
        })

        await this.data.logEvent(sendingUser, false, 'LegalCase', 'Delete', legalCase)

        return legalCase

      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error
      }

      throw new InternalServerErrorException('Error in deleting Legal Case')
    }
  }
  async getPropertyDamages(userId, legalCase) {
    const propertyDamages = []

    for (const propertyDamageImage of legalCase.propertyDamages) {
      if (propertyDamageImage.id) {
        const propertyDamageDocument = await this.data.userDocument(userId, propertyDamageImage.id);
        console.log(propertyDamageDocument)

        propertyDamages.push(propertyDamageDocument);
      }
    }

    return propertyDamages;
  }

  async getMiscellaneousDocuments(userId, legalCase) {
    const miscellaneousDocuments = []

    for (const miscellaneousDocument of legalCase.miscellaneousDocuments) {
      if (miscellaneousDocument.id) {
        const miscellaneous_Document = await this.data.userDocument(userId, miscellaneousDocument.id);
        console.log(miscellaneous_Document)

        miscellaneousDocuments.push(miscellaneous_Document);
      }
    }

    return miscellaneousDocuments;
  }
}


