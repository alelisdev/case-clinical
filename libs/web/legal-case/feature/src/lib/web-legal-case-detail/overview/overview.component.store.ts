import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable, OnDestroy } from "@angular/core";
import { of, pluck, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { ActivatedRoute, Router } from '@angular/router';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer'
import { UserUpdateProcedureVendorInput } from '@case-clinical/shared/util/sdk';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';

export interface OverviewState {
  loading: boolean,
  query: string,
}

@Injectable()
export class OverviewStore extends ComponentStore<OverviewState> implements OnDestroy {

  private legalCaseModalCtrl?: FormlyModalController;
  private patientModalCtrl?: FormlyModalController;

  private underWritingModalCtrl?: FormlyModalController;
  private accidentInformationModalCtrl?: FormlyModalController;
  private MVAModalCtrl?: FormlyModalController;
  private premiseAccidentModalCtrl?: FormlyModalController;
  private productLiabilityModalCtrl?: FormlyModalController;
  private workRelatedModalCtrl?: FormlyModalController;
  private functionalNeurologicalSymptomsCtrl?: FormlyModalController;
  private audiologicalSymptomsCtrl?: FormlyModalController;
  private bodilyInjurySymptomsCtrl?: FormlyModalController;
  private patientCallModalCtrl?: FormlyModalController;
  private currentLegalCaseItem:any;
  private subscriber?;

  constructor(
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private legalCaseStore: WebLegalCaseFeatureStore,
    private patientStore: WebPatientFeatureStore,

  ) {
    super({
      query: "",
      loading: false,
    })

    this.legalCaseStore.loadLegalCaseEffect(this.route.params.pipe(pluck('legalCaseId')))
    // this.subscriber = this.legalCaseStore.actionResult$.subscribe(({ done, item }) => {
    //   if(done) {
    //     //this.router.navigate(['./'], {relativeTo: this.route});
    //   }
    // })
  }

  loading$ = this.select(s => s.loading)
  item$ = this.legalCaseStore.item$;
  vm$ = this.legalCaseStore.vm$.pipe(tap(vm => console.log(vm)));


  updateFundingApproved(input:UserUpdateProcedureVendorInput) {
    const { id,name,procedureId,contractId,vendorId,statusId,estimate,fundingApproved } = input;
    this.legalCaseStore.updateFundingApproved({input:{ id,name,procedureId,contractId,vendorId,statusId,estimate,fundingApproved } });
  }

  deleteLegalCase() {
    this.legalCaseStore.deleteLegalCaseEffect();
  }
  ngOnDestroy(): void {
    //this.unsubscribe();
  }
  unsubscribe() {
    this.subscriber?.unsubscribe();
  }
  /* Patient Edit */
  setPatientModalCtrl(ctrl: FormlyModalController) {
    this.patientModalCtrl = ctrl;
  }

  openPatientModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      this.currentLegalCaseItem = item;
    this.patientModalCtrl?.open({...item?.patient}, {}, this);

    }).unsubscribe();
  }

  updatePatientEffect(formData:any) {
    console.log("patient-formData", formData)
    const { id,
      name,firstName,middleName,lastName,suffix,dateOfBirth,primaryPhoneNumber,
      primaryEmailAddress,primaryAddressLine1,primaryAddressLine2,primaryAddressCity,
      primaryAddressStateOrProvince,primaryAddressPostalCode,latitude,longitude,
      workAddressLine1,workAddressLine2,workAddressCity,workAddressStateOrProvince,workAddressPostalCode,workLatitude,workLongitude,
       } = formData;
    this.patientStore.updatePatientEffect({ id,name,firstName,middleName,lastName,suffix,dateOfBirth,primaryPhoneNumber,
      primaryEmailAddress,primaryAddressLine1,primaryAddressLine2,primaryAddressCity,
      primaryAddressStateOrProvince,primaryAddressPostalCode,latitude,longitude,
      workAddressLine1,workAddressLine2,workAddressCity,workAddressStateOrProvince,workAddressPostalCode,workLatitude,workLongitude,
       })
    this.patientModalCtrl?.close();
    this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)
  }

  /* Legal Case Edit */
  setLegalCaseModalCtrl(ctrl: FormlyModalController) {
    this.legalCaseModalCtrl = ctrl;
  }


  openLegalCaseModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      this.currentLegalCaseItem = item;
    this.legalCaseModalCtrl?.open({...item}, {}, this);

    }).unsubscribe();
  }


updateLegalCaseEffect(formData:any) {
    const { id,name,accidentTypeId,patientId,medLevelId,firmId,attorneyId,agentId,caseStatusId,medicalRecordNumber,
      pchGroupNumber, propertyDamages,pharmacyControlNumber,caseTypeId,patientTreatmentStatusId,dateOfLoss,caseStatusDate,
      caseStatusOther,paralegal,paralegalContact,caseNoteSummary,policyLimit,attorneyFee,referringPhysician,noMoreTreatment,
      medpay,fileNumber,caseNumber,accidentState,assignedTo,attorneyPaid,attorneySentDate,writeOff,noMRI,noPT,noFirstAppointment,
      hot,documentsUploaded,attorneyReview,escalatedReview,inActive,criteria1712,documentUploadedDate,patientDischargedGatheringRecordsDate,
      resubmitted,caseProgressStatusId,firmCaseManager,adverseInsuranceStatusId,createdBy,renegotiatePayOffDate } = formData
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,


      name,accidentTypeId,patientId,medLevelId,firmId,attorneyId,agentId,caseStatusId,medicalRecordNumber,
      pchGroupNumber, propertyDamages,pharmacyControlNumber,caseTypeId,patientTreatmentStatusId,dateOfLoss,caseStatusDate,
      caseStatusOther,paralegal,paralegalContact,caseNoteSummary,policyLimit,attorneyFee,referringPhysician,noMoreTreatment,
      medpay,fileNumber,caseNumber,accidentState,assignedTo,attorneyPaid,attorneySentDate,writeOff,noMRI,noPT,noFirstAppointment,
      hot,documentsUploaded,attorneyReview,escalatedReview,inActive,criteria1712,documentUploadedDate,patientDischargedGatheringRecordsDate,
      resubmitted,caseProgressStatusId,firmCaseManager,adverseInsuranceStatusId,createdBy,renegotiatePayOffDate});
      this.legalCaseModalCtrl?.close();
      this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

      //
  }
  /* Legal Case Edit */

  /* Under Writing Edit */
  setUnderWritingModalCtrl(ctrl: FormlyModalController) {
    this.underWritingModalCtrl = ctrl;
  }

  openUnderWritingModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      console.log('legalCaseStore-detail', item);
      const {
        underwriting_dateCreated,
        underwriting_lastUpdateDate,
        underwriting_timeSensitive,
        underwriting_needsMoreInfo,
        underwriting_billsAttached,
        underwriting_completedMedRecs,
        underwriting_balance,
        underwriting_signedLien,
        underwriting_procedureRequested,
        underwriting_medBills,
        underwriting_estimate,
        underwriting_plaintiff,
        underwriting_covered,
        underwriting_remarks} = item;
    this.currentLegalCaseItem = item;
    this.underWritingModalCtrl?.open({
        underwriting_dateCreated,
        underwriting_lastUpdateDate,
        underwriting_timeSensitive,
        underwriting_needsMoreInfo,
        underwriting_billsAttached,
        underwriting_completedMedRecs,
        underwriting_balance,
        underwriting_signedLien,
        underwriting_procedureRequested,
        underwriting_medBills,
        underwriting_estimate,
        underwriting_plaintiff,
        underwriting_covered,
        underwriting_remarks
    }, {}, this);

    }).unsubscribe()
  }

  updateUnderWritingModal(formData:any){
    const {
      underwriting_dateCreated,
      underwriting_lastUpdateDate,
      underwriting_timeSensitive,
      underwriting_needsMoreInfo,
      underwriting_billsAttached,
      underwriting_completedMedRecs,
      underwriting_balance,
      underwriting_signedLien,
      underwriting_procedureRequested,
      underwriting_medBills,
      underwriting_estimate,
      underwriting_plaintiff,
      underwriting_covered,
      underwriting_remarks} = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,

      name:this.currentLegalCaseItem?.name,
      firmId:this.currentLegalCaseItem?.firmId,
      patientId:this.currentLegalCaseItem?.patientId,

      underwriting_dateCreated,
      underwriting_lastUpdateDate,
      underwriting_timeSensitive,
      underwriting_needsMoreInfo,
      underwriting_billsAttached,
      underwriting_completedMedRecs,
      underwriting_balance,
      underwriting_signedLien,
      underwriting_procedureRequested,
      underwriting_medBills,
      underwriting_estimate,
      underwriting_plaintiff,
      underwriting_covered,
      underwriting_remarks});
      this.underWritingModalCtrl?.close();
      //
      this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

  }
  /* Under Writing Edit */

  /* Accident Information Edit */
  setAccidentInformationModalCtrl(ctrl: FormlyModalController) {
    this.accidentInformationModalCtrl = ctrl;
  }

  openAccidentInformationModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      console.log('legalCaseStore-detail', item);
      const {
        accidentInformation_accidentDescription,
        accidentInformation_dateOfLoss,
        accidentInformation_review,
        accidentInformation_initialEvaluation,
        accidentInformation_evaluation,
        accidentInformation_evaluationAfterHowLong,
        accidentInformation_evaluatedIn,
        accidentInformation_complaints,
        accidentInformation_previousHistory,
        accidentInformation_gapInCare,
        accidentInformation_gapInCareWhen,
        accidentInformation_preExistingProblems,
        accidentInformation_priorInjuries,
        accidentInformation_otherInjuriesSince
      } = item;
    this.currentLegalCaseItem = item;
    this.accidentInformationModalCtrl?.open({
      accidentInformation_accidentDescription,
      accidentInformation_dateOfLoss,
      accidentInformation_review,
      accidentInformation_initialEvaluation,
      accidentInformation_evaluation,
      accidentInformation_evaluationAfterHowLong,
      accidentInformation_evaluatedIn,
      accidentInformation_complaints,
      accidentInformation_previousHistory,
      accidentInformation_gapInCare,
      accidentInformation_gapInCareWhen,
      accidentInformation_preExistingProblems,
      accidentInformation_priorInjuries,
      accidentInformation_otherInjuriesSince
    }, {}, this);

    }).unsubscribe()
  }

  updateAccidentInformationModal(formData:any){
    const {
      accidentInformation_accidentDescription,
      accidentInformation_dateOfLoss,
      accidentInformation_review,
      accidentInformation_initialEvaluation,
      accidentInformation_evaluation,
      accidentInformation_evaluationAfterHowLong,
      accidentInformation_evaluatedIn,
      accidentInformation_complaints,
      accidentInformation_previousHistory,
      accidentInformation_gapInCare,
      accidentInformation_gapInCareWhen,
      accidentInformation_preExistingProblems,
      accidentInformation_priorInjuries,
      accidentInformation_otherInjuriesSince} = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,

      name:this.currentLegalCaseItem?.name,
      firmId:this.currentLegalCaseItem?.firmId,
      patientId:this.currentLegalCaseItem?.patientId,

      accidentInformation_accidentDescription,
      accidentInformation_dateOfLoss,
      accidentInformation_review,
      accidentInformation_initialEvaluation,
      accidentInformation_evaluation,
      accidentInformation_evaluationAfterHowLong,
      accidentInformation_evaluatedIn,
      accidentInformation_complaints,
      accidentInformation_previousHistory,
      accidentInformation_gapInCare,
      accidentInformation_gapInCareWhen,
      accidentInformation_preExistingProblems,
      accidentInformation_priorInjuries,
      accidentInformation_otherInjuriesSince});
      this.accidentInformationModalCtrl?.close();
      
      this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

  }
  /* Accident Information Edit */

  /* MVA Edit */
  setMVAModalCtrl(ctrl: FormlyModalController) {
    this.MVAModalCtrl = ctrl;
  }

  openMVAModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      console.log('legalCaseStore-detail', item);
      const {
        motorVehicleAccident_mvaDriver,
        motorVehicleAccident_mvaPassenger,
        motorVehicleAccident_mvaVehicle,
        motorVehicleAccident_mvaClaimants,
        motorVehicleAccident_mvaOperable,
        motorVehicleAccident_mvaTar,
        motorVehicleAccident_mvaDamage,
        motorVehicleAccident_mvaLess,
        motorVehicleAccident_mvaGreater,
        motorVehicleAccident_mvaAmount
      } = item;
    this.currentLegalCaseItem = item;
    this.MVAModalCtrl?.open({
        motorVehicleAccident_mvaDriver,
        motorVehicleAccident_mvaPassenger,
        motorVehicleAccident_mvaVehicle,
        motorVehicleAccident_mvaClaimants,
        motorVehicleAccident_mvaOperable,
        motorVehicleAccident_mvaTar,
        motorVehicleAccident_mvaDamage,
        motorVehicleAccident_mvaLess,
        motorVehicleAccident_mvaGreater,
        motorVehicleAccident_mvaAmount
    }, {}, this);

    }).unsubscribe()
  }

  updateMVAModal(formData:any){
    const {
      motorVehicleAccident_mvaDriver,
      motorVehicleAccident_mvaPassenger,
      motorVehicleAccident_mvaVehicle,
      motorVehicleAccident_mvaClaimants,
      motorVehicleAccident_mvaOperable,
      motorVehicleAccident_mvaTar,
      motorVehicleAccident_mvaDamage,
      motorVehicleAccident_mvaLess,
      motorVehicleAccident_mvaGreater,
      motorVehicleAccident_mvaAmount} = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,

      name:this.currentLegalCaseItem?.name,
      firmId:this.currentLegalCaseItem?.firmId,
      patientId:this.currentLegalCaseItem?.patientId,

      motorVehicleAccident_mvaDriver,
      motorVehicleAccident_mvaPassenger,
      motorVehicleAccident_mvaVehicle,
      motorVehicleAccident_mvaClaimants,
      motorVehicleAccident_mvaOperable,
      motorVehicleAccident_mvaTar,
      motorVehicleAccident_mvaDamage,
      motorVehicleAccident_mvaLess,
      motorVehicleAccident_mvaGreater,
      motorVehicleAccident_mvaAmount});
      
    this.MVAModalCtrl?.close();
    this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

  }
  /* MVA Edit */

  /* Premise Accident Edit */
  setPremiseAccidentModalCtrl(ctrl: FormlyModalController) {
    this.premiseAccidentModalCtrl = ctrl;
  }

  openPremiseAccidentModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      console.log('legalCaseStore-detail', item);
      const {
        premiseAccident_clientHasObtainedPlaintiffAdvance,
        premiseAccident_advanceAmount,
        premiseAccident_lossOfEarningsIsBeingFiled,
        premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
        premiseAccident_explain,
        premiseAccident_clientHasCriminalHistory,
        premiseAccident_criminalHistory,
        premiseAccident_locationOfIncident
      } = item;
      this.currentLegalCaseItem = item;
      this.premiseAccidentModalCtrl?.open({
        premiseAccident_clientHasObtainedPlaintiffAdvance,
        premiseAccident_advanceAmount,
        premiseAccident_lossOfEarningsIsBeingFiled,
        premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
        premiseAccident_explain,
        premiseAccident_clientHasCriminalHistory,
        premiseAccident_criminalHistory,
        premiseAccident_locationOfIncident
      }, {}, this);
    }).unsubscribe()
  }
  updatePremiseAccidentModal(formData:any){
    const {
      premiseAccident_clientHasObtainedPlaintiffAdvance,
      premiseAccident_advanceAmount,
      premiseAccident_lossOfEarningsIsBeingFiled,
      premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
      premiseAccident_explain,
      premiseAccident_clientHasCriminalHistory,
      premiseAccident_criminalHistory,
      premiseAccident_locationOfIncident} = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,

      name:this.currentLegalCaseItem?.name,
      firmId:this.currentLegalCaseItem?.firmId,
      patientId:this.currentLegalCaseItem?.patientId,

      premiseAccident_clientHasObtainedPlaintiffAdvance,
      premiseAccident_advanceAmount,
      premiseAccident_lossOfEarningsIsBeingFiled,
      premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart,
      premiseAccident_explain,
      premiseAccident_clientHasCriminalHistory,
      premiseAccident_criminalHistory,
      premiseAccident_locationOfIncident});
    
    this.premiseAccidentModalCtrl?.close();
    this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

  }
  /* Premise Accident Edit */

  /* Product Liability Edit */
  setProductLiabilityModalCtrl(ctrl: FormlyModalController) {
    this.productLiabilityModalCtrl = ctrl;
  }

  openProductLiabilityModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      console.log('legalCaseStore-detail', item);
      const {
        productLiability_product,
        productLiability_whereDidItHappen,
        productLiability_proofOfLiability,
        productLiability_productWasRecalled
      } = item;
      this.currentLegalCaseItem = item;
      this.productLiabilityModalCtrl?.open({
        productLiability_product,
        productLiability_whereDidItHappen,
        productLiability_proofOfLiability,
        productLiability_productWasRecalled
      }, {}, this);
    }).unsubscribe()
  }

  updateProductLiabilityModal(formData:any){
    const {
      productLiability_product,
      productLiability_whereDidItHappen,
      productLiability_proofOfLiability,
      productLiability_productWasRecalled} = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,

      name:this.currentLegalCaseItem?.name,
      firmId:this.currentLegalCaseItem?.firmId,
      patientId:this.currentLegalCaseItem?.patientId,

      productLiability_product,
      productLiability_whereDidItHappen,
      productLiability_proofOfLiability,
      productLiability_productWasRecalled});
    
    this.productLiabilityModalCtrl?.close();
    this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

  }
  /* Product Liability Edit */

  /* Work Related Edit */
  setWorkRelatedModalCtrl(ctrl: FormlyModalController) {
    this.workRelatedModalCtrl = ctrl;
  }

  openWorkRelatedModal() {
    this.legalCaseStore.item$.subscribe((item)=>{
      console.log('legalCaseStore-detail', item);
      const {
        workRelated_selfInsuredWorkComp,
        workRelated_workCompCaseIsOpenClosed,
        workRelated_workCompCaseSettledAmount,
        workRelated_workCompCaseSettlementIncludesFutureMedicals,
        workRelated_reasonNotFiledUnderWorkComp
      } = item;
      this.currentLegalCaseItem = item;
      this.workRelatedModalCtrl?.open({
        workRelated_selfInsuredWorkComp,
        workRelated_workCompCaseIsOpenClosed,
        workRelated_workCompCaseSettledAmount,
        workRelated_workCompCaseSettlementIncludesFutureMedicals,
        workRelated_reasonNotFiledUnderWorkComp
      }, {}, this);
    }).unsubscribe()
  }

  updateWorkRelatedModal(formData:any){
    const {
      workRelated_selfInsuredWorkComp,
      workRelated_workCompCaseIsOpenClosed,
      workRelated_workCompCaseSettledAmount,
      workRelated_workCompCaseSettlementIncludesFutureMedicals,
      workRelated_reasonNotFiledUnderWorkComp} = formData;
    this.legalCaseStore.updateLegalCaseEffect({
      id:this.currentLegalCaseItem?.id,

      name:this.currentLegalCaseItem?.name,
      firmId:this.currentLegalCaseItem?.firmId,
      patientId:this.currentLegalCaseItem?.patientId,

      workRelated_selfInsuredWorkComp,
      workRelated_workCompCaseIsOpenClosed,
      workRelated_workCompCaseSettledAmount,
      workRelated_workCompCaseSettlementIncludesFutureMedicals,
      workRelated_reasonNotFiledUnderWorkComp});
    
    this.workRelatedModalCtrl?.close();
    this.legalCaseStore.loadLegalCaseEffect(this.currentLegalCaseItem?.id)

  }
  /* Work Related Edit */

  /* Functioinal Neurological Symptoms Edit */
  setFunctionalNeurologicalSymptomsModalCtrl(ctrl: FormlyModalController) {
    this.functionalNeurologicalSymptomsCtrl = ctrl;
  }

  openFunctionalNeurologicalSymptomsModal() {
    this.functionalNeurologicalSymptomsCtrl?.open({}, {}, this);
  }
  /* Functioinal Neurological Symptoms Edit */

  /* Audiologial Symptoms Edit */
  setAudiologicalSymptomsModalCtrl(ctrl: FormlyModalController) {
    this.audiologicalSymptomsCtrl = ctrl;
  }

  openAudiologicalSymptomsModal() {
    this.audiologicalSymptomsCtrl?.open({}, {}, this);
  }
  /* Audiologial Symptoms Edit */

  /* Bodily Injury Symptoms Edit */
  setBodilyInjurySymptomsModalCtrl(ctrl: FormlyModalController) {
    this.bodilyInjurySymptomsCtrl = ctrl;
  }

  openBodilyInjurySymptomsModal() {
    this.bodilyInjurySymptomsCtrl?.open({}, {}, this);
  }
  /* Bodily Injury Symptoms Edit */

  /** Call Patient */
  setPatientCallModalCtrl(ctrl: FormlyModalController) {
    this.patientCallModalCtrl = ctrl;
  }

  openPatientCallModal(phoneNumber: string) {
    this.patientCallModalCtrl?.open({}, {}, this);
  }
  /** Call Patient */
}
