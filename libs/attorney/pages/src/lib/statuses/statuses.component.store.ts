import { AttorneyBaseState, AttorneyBaseStore } from '../attorney-page.base.store'
import { Injectable, Injector } from '@angular/core'
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { ModalController } from '@case-clinical/web/ui/form'
export interface StatusesState extends AttorneyBaseState {
  loading: boolean
  query: string,
  selectedLegalCaseId: string,
}

@Injectable()
export class StatusesStore extends AttorneyBaseStore<StatusesState> {
  private subscriber: any
  editModalController?: ModalController
  constructor(
    private legalCasestore: WebLegalCaseFeatureStore,
    private caseStatusStore: WebCaseStatusFeatureStore,
    injector: Injector,
  ) {
    super(injector)
    this.legalCasestore.loadLegalCasesUpdatesEffect();
    this.caseStatusStore.loadCaseStatusesEffect();
  }

  readonly setSelectedLegalCaseId = this.updater((state, selectedLegalCaseId: string)=>({
    ...state,
    selectedLegalCaseId
  }) )
  caseStatuses$ = this.caseStatusStore.caseStatuses$;
  loading$ = this.select((s) => s.loading)
  legalCaseUpdates$ = this.legalCasestore.legalCaseUpdates$
  selectedLegalCaseId$ = this.select((s) => s.selectedLegalCaseId)


  $gridData = this.select(this.attorneyOptions$, this.selectedAttorneyId$, (attorneyOptions, selectedAttornyId) => {
    console.log(selectedAttornyId)
    console.log(attorneyOptions)
    const results: any[] = []
    JSON.parse(JSON.stringify(attorneyOptions)).forEach((option: any) => {
      if (option.id && option.id !== 'all' && option.id !== '' && selectedAttornyId === option.id) {
        option?.legalCases?.forEach((legalcase: any) => {
          results.push({
            name: legalcase?.name,
            callRecordData: legalcase?.caseProcedures?.map((caseprocedure: any) => {
              return {
                id: caseprocedure?.id,
                name: caseprocedure?.name,
              }
            }),
          })
        })
      }
    })
    return results
  })

  legalcaseItem$ = this.legalCasestore.item$;

  vm$ = this.select(this.loading$, this.user$, this.legalCaseUpdates$, this.caseStatuses$, this.selectedLegalCaseId$, (loading, user, legalCaseUpdates,caseStatuses, selectedLegalCaseId) => {
    return {
      loading,
      user,
      legalCaseUpdates,
      caseStatuses,
      selectedLegalCaseId
    }
  })
 

  setEditModalController(controller: ModalController) {
    this.editModalController = controller
  }

  openEditDialog() {
    setTimeout(()=>{
      this.editModalController?.open()
    },200);

  }

  onSave(model: any){
    const subscriber = this.legalcaseItem$.subscribe((item) => {
      if(item && typeof model?.caseStatusId == 'string'){
        const caseStatusId: string = model?.caseStatusId 
        const {id,name,accidentTypeId,patientId,medLevelId,firmId,attorneyId,agentId,caseTypeId,patientTreatmentStatusId,dateOfLoss,caseStatusDate,caseStatusOther,paralegal,paralegalContact,caseNoteSummary,policyLimit,attorneyFee,referringPhysician,noMoreTreatment,medpay,fileNumber,caseNumber,accidentState,assignedTo,attorneyPaid,attorneySentDate,writeOff,noMRI,noPT,noFirstAppointment,hot,documentsUploaded,attorneyReview,escalatedReview,inActive,criteria1712,documentUploadedDate,patientDischargedGatheringRecordsDate,resubmitted,caseProgressStatusId,firmCaseManager,adverseInsuranceStatusId,createdBy,renegotiatePayOffDate} = item ;
        this.legalCasestore.updateLegalCaseEffect({id,name,accidentTypeId,patientId,medLevelId,firmId,attorneyId,agentId, caseStatusId,caseTypeId,patientTreatmentStatusId,dateOfLoss,caseStatusDate,caseStatusOther,paralegal,paralegalContact,caseNoteSummary,policyLimit,attorneyFee,referringPhysician,noMoreTreatment,medpay,fileNumber,caseNumber,accidentState,assignedTo,attorneyPaid,attorneySentDate,writeOff,noMRI,noPT,noFirstAppointment,hot,documentsUploaded,attorneyReview,escalatedReview,inActive,criteria1712,documentUploadedDate,patientDischargedGatheringRecordsDate,resubmitted,caseProgressStatusId,firmCaseManager,adverseInsuranceStatusId,createdBy,renegotiatePayOffDate});
        setTimeout(()=>{
          this.legalCasestore.loadLegalCasesUpdatesEffect()
        },300);
      }
    }).unsubscribe()
  }

  setLegalCaseId(id: string){
    this.setSelectedLegalCaseId(id); this.legalCasestore.loadLegalCaseEffect(id);
  }
  override getInitialState(): StatusesState {
    return {
      query: '',
      loading: false,
      selectedLegalCaseId: ''
    }
  }
}
