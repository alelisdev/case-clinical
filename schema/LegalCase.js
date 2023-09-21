cube(`LegalCase`, {
  sql: `SELECT * FROM dbo."LegalCase"`,
  preAggregations: {// Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started

    main: {
      measures: [LegalCase.count]
    }
  },
  joins: {},
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, name, patientid, medlevelid, accidenttypeid, firmid, attorneyid, agentid, casestatusid, casetypeid, patienttreatmentstatusid, accidentstate, attorneypaid, caseprogressstatusid, adverseinsurancestatusid, createdby, accidentinformationAccidenttypeid, accidentinformationAccidentdescription, accidentinformationReview, accidentinformationInitialevaluation, accidentinformationEvaluation, accidentinformationEvaluationafterhowlong, accidentinformationEvaluatedin, accidentinformationComplaints, accidentinformationPrevioushistory, accidentinformationGapincare, accidentinformationGapincarewhen, accidentinformationPreexistingproblems, accidentinformationPriorinjuries, accidentinformationOtherinjuriessince, motorvehicleaccidentMvadriver, motorvehicleaccidentMvapassenger, motorvehicleaccidentMvavehicle, motorvehicleaccidentMvaclaimants, motorvehicleaccidentMvaoperable, motorvehicleaccidentMvatar, motorvehicleaccidentMvadamage, motorvehicleaccidentMvaless, motorvehicleaccidentMvagreater, motorvehicleaccidentMvaamount, premiseaccidentClienthasobtainedplaintiffadvance, premiseaccidentAdvanceamount, premiseaccidentLossofearningsisbeingfiled, premiseaccidentDoyouanticipateadditionalmedicaltreatmentondifferentbodypart, premiseaccidentExplain, premiseaccidentClienthascriminalhistory, premiseaccidentCriminalhistory, premiseaccidentLocationofincident, productliabilityWheredidithappen, createdat, underwritingDatecreated, updatedat, underwritingLastupdatedate, dateofloss, casestatusdate, attorneysentdate, documentuploadeddate, patientdischargedgatheringrecordsdate, renegotiatepayoffdate, accidentinformationDateofloss]
    }
  },
  dimensions: {
    id: {
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    name: {
      sql: `name`,
      type: `string`
    },
    patientid: {
      sql: `${CUBE}."patientId"`,
      type: `string`
    },
    medlevelid: {
      sql: `${CUBE}."medLevelId"`,
      type: `string`
    },
    accidenttypeid: {
      sql: `${CUBE}."accidentTypeId"`,
      type: `string`
    },
    firmid: {
      sql: `${CUBE}."firmId"`,
      type: `string`
    },
    firm: {
      sql: `${CUBE}."Firm"`,
      type: `string`
    },
    attorneyid: {
      sql: `${CUBE}."attorneyId"`,
      type: `string`
    },
    agentid: {
      sql: `${CUBE}."agentId"`,
      type: `string`
    },
    casestatusid: {
      sql: `${CUBE}."caseStatusId"`,
      type: `string`
    },
    casetypeid: {
      sql: `${CUBE}."caseTypeId"`,
      type: `string`
    },
    patienttreatmentstatusid: {
      sql: `${CUBE}."patientTreatmentStatusId"`,
      type: `string`
    },
    casestatusother: {
      sql: `${CUBE}."caseStatusOther"`,
      type: `string`
    },
    paralegal: {
      sql: `paralegal`,
      type: `string`
    },
    paralegalcontact: {
      sql: `${CUBE}."paralegalContact"`,
      type: `string`
    },
    casenotesummary: {
      sql: `${CUBE}."caseNoteSummary"`,
      type: `string`
    },
    policylimit: {
      sql: `${CUBE}."policyLimit"`,
      type: `string`
    },
    attorneyfee: {
      sql: `${CUBE}."attorneyFee"`,
      type: `string`
    },
    referringphysician: {
      sql: `${CUBE}."referringPhysician"`,
      type: `string`
    },
    nomoretreatment: {
      sql: `${CUBE}."noMoreTreatment"`,
      type: `string`
    },
    medpay: {
      sql: `medpay`,
      type: `string`
    },
    filenumber: {
      sql: `${CUBE}."fileNumber"`,
      type: `string`
    },
    casenumber: {
      sql: `${CUBE}."caseNumber"`,
      type: `string`
    },
    accidentstate: {
      sql: `${CUBE}."accidentState"`,
      type: `string`
    },
    assignedto: {
      sql: `${CUBE}."assignedTo"`,
      type: `string`
    },
    attorneypaid: {
      sql: `${CUBE}."attorneyPaid"`,
      type: `string`
    },
    writeoff: {
      sql: `${CUBE}."writeOff"`,
      type: `string`
    },
    nomri: {
      sql: `${CUBE}."noMRI"`,
      type: `string`
    },
    nopt: {
      sql: `${CUBE}."noPT"`,
      type: `string`
    },
    nofirstappointment: {
      sql: `${CUBE}."noFirstAppointment"`,
      type: `string`
    },
    hot: {
      sql: `hot`,
      type: `string`
    },
    documentsuploaded: {
      sql: `${CUBE}."documentsUploaded"`,
      type: `string`
    },
    attorneyreview: {
      sql: `${CUBE}."attorneyReview"`,
      type: `string`
    },
    escalatedreview: {
      sql: `${CUBE}."escalatedReview"`,
      type: `string`
    },
    inactive: {
      sql: `${CUBE}."inActive"`,
      type: `string`
    },
    criteria1712: {
      sql: `criteria1712`,
      type: `string`
    },
    caseprogressstatusid: {
      sql: `${CUBE}."caseProgressStatusId"`,
      type: `string`
    },
    firmcasemanager: {
      sql: `${CUBE}."firmCaseManager"`,
      type: `string`
    },
    adverseinsurancestatusid: {
      sql: `${CUBE}."adverseInsuranceStatusId"`,
      type: `string`
    },
    createdby: {
      sql: `${CUBE}."createdBy"`,
      type: `string`
    },
    underwritingTimesensitive: {
      sql: `${CUBE}."underwriting_timeSensitive"`,
      type: `string`
    },
    underwritingBillsattached: {
      sql: `${CUBE}."underwriting_billsAttached"`,
      type: `string`
    },
    underwritingCompletedmedrecs: {
      sql: `${CUBE}."underwriting_completedMedRecs"`,
      type: `string`
    },
    underwritingBalance: {
      sql: `underwriting_balance`,
      type: `string`
    },
    underwritingSignedlien: {
      sql: `${CUBE}."underwriting_signedLien"`,
      type: `string`
    },
    underwritingProcedurerequested: {
      sql: `${CUBE}."underwriting_procedureRequested"`,
      type: `string`
    },
    underwritingMedbills: {
      sql: `${CUBE}."underwriting_medBills"`,
      type: `string`
    },
    underwritingEstimate: {
      sql: `underwriting_estimate`,
      type: `string`
    },
    underwritingPlaintiff: {
      sql: `underwriting_plaintiff`,
      type: `string`
    },
    underwritingCovered: {
      sql: `underwriting_covered`,
      type: `string`
    },
    underwritingRemarks: {
      sql: `underwriting_remarks`,
      type: `string`
    },
    accidentinformationAccidenttypeid: {
      sql: `${CUBE}."accidentInformation_accidentTypeId"`,
      type: `string`
    },
    accidentinformationAccidentdescription: {
      sql: `${CUBE}."accidentInformation_accidentDescription"`,
      type: `string`
    },
    accidentinformationReview: {
      sql: `${CUBE}."accidentInformation_review"`,
      type: `string`
    },
    accidentinformationInitialevaluation: {
      sql: `${CUBE}."accidentInformation_initialEvaluation"`,
      type: `string`
    },
    accidentinformationEvaluation: {
      sql: `${CUBE}."accidentInformation_evaluation"`,
      type: `string`
    },
    accidentinformationEvaluationafterhowlong: {
      sql: `${CUBE}."accidentInformation_evaluationAfterHowLong"`,
      type: `string`
    },
    accidentinformationEvaluatedin: {
      sql: `${CUBE}."accidentInformation_evaluatedIn"`,
      type: `string`
    },
    accidentinformationComplaints: {
      sql: `${CUBE}."accidentInformation_complaints"`,
      type: `string`
    },
    accidentinformationPrevioushistory: {
      sql: `${CUBE}."accidentInformation_previousHistory"`,
      type: `string`
    },
    accidentinformationGapincare: {
      sql: `${CUBE}."accidentInformation_gapInCare"`,
      type: `string`
    },
    accidentinformationGapincarewhen: {
      sql: `${CUBE}."accidentInformation_gapInCareWhen"`,
      type: `string`
    },
    accidentinformationPreexistingproblems: {
      sql: `${CUBE}."accidentInformation_preExistingProblems"`,
      type: `string`
    },
    accidentinformationPriorinjuries: {
      sql: `${CUBE}."accidentInformation_priorInjuries"`,
      type: `string`
    },
    accidentinformationOtherinjuriessince: {
      sql: `${CUBE}."accidentInformation_otherInjuriesSince"`,
      type: `string`
    },
    motorvehicleaccidentMvadriver: {
      sql: `${CUBE}."motorVehicleAccident_mvaDriver"`,
      type: `string`
    },
    motorvehicleaccidentMvapassenger: {
      sql: `${CUBE}."motorVehicleAccident_mvaPassenger"`,
      type: `string`
    },
    motorvehicleaccidentMvavehicle: {
      sql: `${CUBE}."motorVehicleAccident_mvaVehicle"`,
      type: `string`
    },
    motorvehicleaccidentMvaclaimants: {
      sql: `${CUBE}."motorVehicleAccident_mvaClaimants"`,
      type: `string`
    },
    motorvehicleaccidentMvaoperable: {
      sql: `${CUBE}."motorVehicleAccident_mvaOperable"`,
      type: `string`
    },
    motorvehicleaccidentMvatar: {
      sql: `${CUBE}."motorVehicleAccident_mvaTar"`,
      type: `string`
    },
    motorvehicleaccidentMvadamage: {
      sql: `${CUBE}."motorVehicleAccident_mvaDamage"`,
      type: `string`
    },
    motorvehicleaccidentMvaless: {
      sql: `${CUBE}."motorVehicleAccident_mvaLess"`,
      type: `string`
    },
    motorvehicleaccidentMvagreater: {
      sql: `${CUBE}."motorVehicleAccident_mvaGreater"`,
      type: `string`
    },
    motorvehicleaccidentMvaamount: {
      sql: `${CUBE}."motorVehicleAccident_mvaAmount"`,
      type: `string`
    },
    premiseaccidentClienthasobtainedplaintiffadvance: {
      sql: `${CUBE}."premiseAccident_clientHasObtainedPlaintiffAdvance"`,
      type: `string`
    },
    premiseaccidentAdvanceamount: {
      sql: `${CUBE}."premiseAccident_advanceAmount"`,
      type: `string`
    },
    premiseaccidentLossofearningsisbeingfiled: {
      sql: `${CUBE}."premiseAccident_LossOfEarningsIsBeingFiled"`,
      type: `string`
    },
    premiseaccidentDoyouanticipateadditionalmedicaltreatmentondifferentbodypart: {
      sql: `${CUBE}."premiseAccident_DoYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart"`,
      type: `string`
    },
    premiseaccidentExplain: {
      sql: `${CUBE}."premiseAccident_explain"`,
      type: `string`
    },
    premiseaccidentClienthascriminalhistory: {
      sql: `${CUBE}."premiseAccident_clientHasCriminalHistory"`,
      type: `string`
    },
    premiseaccidentCriminalhistory: {
      sql: `${CUBE}."premiseAccident_criminalHistory"`,
      type: `string`
    },
    premiseaccidentLocationofincident: {
      sql: `${CUBE}."premiseAccident_locationOfIncident"`,
      type: `string`
    },
    productliabilityProduct: {
      sql: `${CUBE}."productLiability_product"`,
      type: `string`
    },
    productliabilityWheredidithappen: {
      sql: `${CUBE}."productLiability_whereDidItHappen"`,
      type: `string`
    },
    productliabilityProofofliability: {
      sql: `${CUBE}."productLiability_proofOfLiability"`,
      type: `string`
    },
    productliabilityProductwasrecalled: {
      sql: `${CUBE}."productLiability_productWasRecalled"`,
      type: `string`
    },
    workrelatedSelfinsuredworkcomp: {
      sql: `${CUBE}."workRelated_selfInsuredWorkComp"`,
      type: `string`
    },
    workrelatedWorkcompcaseisopenclosed: {
      sql: `${CUBE}."workRelated_workCompCaseIsOpenClosed"`,
      type: `string`
    },
    workrelatedWorkcompcasesettledamount: {
      sql: `${CUBE}."workRelated_workCompCaseSettledAmount"`,
      type: `string`
    },
    workrelatedWorkcompcasesettlementincludesfuturemedicals: {
      sql: `${CUBE}."workRelated_workCompCaseSettlementIncludesFutureMedicals"`,
      type: `string`
    },
    workrelatedReasonnotfiledunderworkcomp: {
      sql: `${CUBE}."workRelated_reasonNotFiledUnderWorkComp"`,
      type: `string`
    },
    createdat: {
      sql: `${CUBE}."createdAt"`,
      type: `time`
    },
    underwritingDatecreated: {
      sql: `${CUBE}."underwriting_dateCreated"`,
      type: `time`
    },
    updatedat: {
      sql: `${CUBE}."updatedAt"`,
      type: `time`
    },
    underwritingLastupdatedate: {
      sql: `${CUBE}."underwriting_lastUpdateDate"`,
      type: `time`
    },
    dateofloss: {
      sql: `${CUBE}."dateOfLoss"`,
      type: `time`
    },
    casestatusdate: {
      sql: `${CUBE}."caseStatusDate"`,
      type: `time`
    },
    attorneysentdate: {
      sql: `${CUBE}."attorneySentDate"`,
      type: `time`
    },
    documentuploadeddate: {
      sql: `${CUBE}."documentUploadedDate"`,
      type: `time`
    },
    patientdischargedgatheringrecordsdate: {
      sql: `${CUBE}."patientDischargedGatheringRecordsDate"`,
      type: `time`
    },
    resubmitted: {
      sql: `resubmitted`,
      type: `time`
    },
    renegotiatepayoffdate: {
      sql: `${CUBE}."renegotiatePayOffDate"`,
      type: `time`
    },
    accidentinformationDateofloss: {
      sql: `${CUBE}."accidentInformation_dateOfLoss"`,
      type: `time`
    }
  },
  dataSource: `default`
});