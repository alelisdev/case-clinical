

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, LegalCase, CorePaging, UserUpdateLegalCaseInput ,AccidentType, Patient, MedLevel, Firm, Attorney, User, CaseStatus, CaseType, PatientTreatmentStatus, CaseProgressStatus, AdverseInsuranceStatus } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { LegalCaseService } from '@case-clinical/web/legal-case/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebMedLevelFeatureStore } from '@case-clinical/web/med-level/shared'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { WebAttorneyFeatureStore } from '@case-clinical/web/attorney/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebCaseStatusFeatureStore } from '@case-clinical/web/case-status/shared'
import { WebCaseTypeFeatureStore } from '@case-clinical/web/case-type/shared'
import { WebPatientTreatmentStatusFeatureStore } from '@case-clinical/web/patient-treatment-status/shared'
import { WebCaseProgressStatusFeatureStore } from '@case-clinical/web/case-progress-status/shared'
import { WebAdverseInsuranceStatusFeatureStore } from '@case-clinical/web/adverse-insurance-status/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface LegalCaseListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
accidentTypeId?: string,patientId?: string,medLevelId?: string,firmId?: string,attorneyId?: string,agentId?: string,caseStatusId?: string,caseTypeId?: string,patientTreatmentStatusId?: string,caseProgressStatusId?: string,adverseInsuranceStatusId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: LegalCase[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebLegalCaseListStore extends ComponentStore<LegalCaseListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly legalCaseService: LegalCaseService,
        private readonly toast: WebUiToastService,
         private readonly accidentTypeStore: WebAccidentTypeFeatureStore,
 private readonly patientStore: WebPatientFeatureStore,
 private readonly medLevelStore: WebMedLevelFeatureStore,
 private readonly firmStore: WebFirmFeatureStore,
 private readonly attorneyStore: WebAttorneyFeatureStore,
 private readonly userStore: WebUserFeatureStore,
 private readonly caseStatusStore: WebCaseStatusFeatureStore,
 private readonly caseTypeStore: WebCaseTypeFeatureStore,
 private readonly patientTreatmentStatusStore: WebPatientTreatmentStatusFeatureStore,
 private readonly caseProgressStatusStore: WebCaseProgressStatusFeatureStore,
 private readonly adverseInsuranceStatusStore: WebAdverseInsuranceStatusFeatureStore
    ) {
    super({
      headerTitle: 'LegalCases',
      searchFocused: false,
      searchQuery: '',
accidentTypeId: undefined,
patientId: undefined,
medLevelId: undefined,
firmId: undefined,
attorneyId: undefined,
agentId: undefined,
caseStatusId: undefined,
caseTypeId: undefined,
patientTreatmentStatusId: undefined,
caseProgressStatusId: undefined,
adverseInsuranceStatusId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("accidentTypeId")) {
      var accidentTypeId = this.router.snapshot.paramMap.get("accidentTypeId")
      this.setAccidentTypeId(accidentTypeId)
    }


    if(this.router.snapshot.paramMap.has("patientId")) {
      var patientId = this.router.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.router.snapshot.paramMap.has("medLevelId")) {
      var medLevelId = this.router.snapshot.paramMap.get("medLevelId")
      this.setMedLevelId(medLevelId)
    }


    if(this.router.snapshot.paramMap.has("firmId")) {
      var firmId = this.router.snapshot.paramMap.get("firmId")
      this.setFirmId(firmId)
    }


    if(this.router.snapshot.paramMap.has("attorneyId")) {
      var attorneyId = this.router.snapshot.paramMap.get("attorneyId")
      this.setAttorneyId(attorneyId)
    }


    if(this.router.snapshot.paramMap.has("agentId")) {
      var agentId = this.router.snapshot.paramMap.get("agentId")
      this.setAgentId(agentId)
    }


    if(this.router.snapshot.paramMap.has("caseStatusId")) {
      var caseStatusId = this.router.snapshot.paramMap.get("caseStatusId")
      this.setCaseStatusId(caseStatusId)
    }


    if(this.router.snapshot.paramMap.has("caseTypeId")) {
      var caseTypeId = this.router.snapshot.paramMap.get("caseTypeId")
      this.setCaseTypeId(caseTypeId)
    }


    if(this.router.snapshot.paramMap.has("patientTreatmentStatusId")) {
      var patientTreatmentStatusId = this.router.snapshot.paramMap.get("patientTreatmentStatusId")
      this.setPatientTreatmentStatusId(patientTreatmentStatusId)
    }


    if(this.router.snapshot.paramMap.has("caseProgressStatusId")) {
      var caseProgressStatusId = this.router.snapshot.paramMap.get("caseProgressStatusId")
      this.setCaseProgressStatusId(caseProgressStatusId)
    }


    if(this.router.snapshot.paramMap.has("adverseInsuranceStatusId")) {
      var adverseInsuranceStatusId = this.router.snapshot.paramMap.get("adverseInsuranceStatusId")
      this.setAdverseInsuranceStatusId(adverseInsuranceStatusId)
    }

    this.accidentTypeStore.loadAccidentTypesEffect()
this.patientStore.loadPatientsEffect()
this.medLevelStore.loadMedLevelsEffect()
this.firmStore.loadFirmsEffect()
this.attorneyStore.loadAttorneysEffect()
this.userStore.loadUsersEffect()
this.caseStatusStore.loadCaseStatusesEffect()
this.caseTypeStore.loadCaseTypesEffect()
this.patientTreatmentStatusStore.loadPatientTreatmentStatusesEffect()
this.caseProgressStatusStore.loadCaseProgressStatusesEffect()
this.adverseInsuranceStatusStore.loadAdverseInsuranceStatusesEffect()
  }

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: { ...state.paging, skip }
  }))

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  readonly setSearchBarInFocus = this.updater((state, searchFocused: boolean) => ({
    ...state,
    searchFocused
  }))


            readonly setAccidentTypeId = this.updater((state, accidentTypeId: string) => ({
                ...state,
    accidentTypeId,
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


            readonly setMedLevelId = this.updater((state, medLevelId: string) => ({
                ...state,
    medLevelId,
  }))


            readonly setFirmId = this.updater((state, firmId: string) => ({
                ...state,
    firmId,
  }))


            readonly setAttorneyId = this.updater((state, attorneyId: string) => ({
                ...state,
    attorneyId,
  }))


            readonly setAgentId = this.updater((state, agentId: string) => ({
                ...state,
    agentId,
  }))


            readonly setCaseStatusId = this.updater((state, caseStatusId: string) => ({
                ...state,
    caseStatusId,
  }))


            readonly setCaseTypeId = this.updater((state, caseTypeId: string) => ({
                ...state,
    caseTypeId,
  }))


            readonly setPatientTreatmentStatusId = this.updater((state, patientTreatmentStatusId: string) => ({
                ...state,
    patientTreatmentStatusId,
  }))


            readonly setCaseProgressStatusId = this.updater((state, caseProgressStatusId: string) => ({
                ...state,
    caseProgressStatusId,
  }))


            readonly setAdverseInsuranceStatusId = this.updater((state, adverseInsuranceStatusId: string) => ({
                ...state,
    adverseInsuranceStatusId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly accidentTypeId$ = this.select((s) => s.accidentTypeId)

readonly patientId$ = this.select((s) => s.patientId)

readonly medLevelId$ = this.select((s) => s.medLevelId)

readonly firmId$ = this.select((s) => s.firmId)

readonly attorneyId$ = this.select((s) => s.attorneyId)

readonly agentId$ = this.select((s) => s.agentId)

readonly caseStatusId$ = this.select((s) => s.caseStatusId)

readonly caseTypeId$ = this.select((s) => s.caseTypeId)

readonly patientTreatmentStatusId$ = this.select((s) => s.patientTreatmentStatusId)

readonly caseProgressStatusId$ = this.select((s) => s.caseProgressStatusId)

readonly adverseInsuranceStatusId$ = this.select((s) => s.adverseInsuranceStatusId)

accidentTypes$ = this.accidentTypeStore.accidentTypes$
patients$ = this.patientStore.patients$
medLevels$ = this.medLevelStore.medLevels$
firms$ = this.firmStore.firms$
attorneys$ = this.attorneyStore.attorneys$
users$ = this.userStore.users$
caseStatuses$ = this.caseStatusStore.caseStatuses$
caseTypes$ = this.caseTypeStore.caseTypes$
patientTreatmentStatuses$ = this.patientTreatmentStatusStore.patientTreatmentStatuses$
caseProgressStatuses$ = this.caseProgressStatusStore.caseProgressStatuses$
adverseInsuranceStatuses$ = this.adverseInsuranceStatusStore.adverseInsuranceStatuses$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.accidentTypeId$,
this.patientId$,
this.medLevelId$,
this.firmId$,
this.attorneyId$,
this.agentId$,
this.caseStatusId$,
this.caseTypeId$,
this.patientTreatmentStatusId$,
this.caseProgressStatusId$,
this.adverseInsuranceStatusId$, this.searchQuery$, (paging, accidentTypeId,
patientId,
medLevelId,
firmId,
attorneyId,
agentId,
caseStatusId,
caseTypeId,
patientTreatmentStatusId,
caseProgressStatusId,
adverseInsuranceStatusId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    accidentTypeId: accidentTypeId,patientId: patientId,medLevelId: medLevelId,firmId: firmId,attorneyId: attorneyId,agentId: agentId,caseStatusId: caseStatusId,caseTypeId: caseTypeId,patientTreatmentStatusId: patientTreatmentStatusId,caseProgressStatusId: caseProgressStatusId,adverseInsuranceStatusId: adverseInsuranceStatusId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.accidentTypeId$,
this.patientId$,
this.medLevelId$,
this.firmId$,
this.attorneyId$,
this.agentId$,
this.caseStatusId$,
this.caseTypeId$,
this.patientTreatmentStatusId$,
this.caseProgressStatusId$,
this.adverseInsuranceStatusId$,
    this.data$,
    this.accidentTypes$,
this.patients$,
this.medLevels$,
this.firms$,
this.attorneys$,
this.users$,
this.caseStatuses$,
this.caseTypes$,
this.patientTreatmentStatuses$,
this.caseProgressStatuses$,
this.adverseInsuranceStatuses$,
    (paging, errors, loading, searchFocused, searchQuery, accidentTypeId,
patientId,
medLevelId,
firmId,
attorneyId,
agentId,
caseStatusId,
caseTypeId,
patientTreatmentStatusId,
caseProgressStatusId,
adverseInsuranceStatusId, data ,accidentTypes,patients,medLevels,firms,attorneys,users,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      accidentTypeId,
patientId,
medLevelId,
firmId,
attorneyId,
agentId,
caseStatusId,
caseTypeId,
patientTreatmentStatusId,
caseProgressStatusId,
adverseInsuranceStatusId,
      data,
      accidentTypes,patients,medLevels,firms,attorneys,users,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses
    }),
  )

    addLegalCases = this.updater((state, legalCases: any[]) => ({...state, data: state.data.concat(legalCases) }))
    updateLegalCases = this.updater((state, legalCases: any[]) => {
        return {
            ...state,
            data: state.data.map((legalCase) => {
            const updated = legalCases.find((el) => el.id === legalCase.id);
            return updated ? updated : legalCase;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const accidentTypes = vm.accidentTypes;
const patients = vm.patients;
const medLevels = vm.medLevels;
const firms = vm.firms;
const attorneys = vm.attorneys;
const users = vm.users;
const caseStatuses = vm.caseStatuses;
const caseTypes = vm.caseTypes;
const patientTreatmentStatuses = vm.patientTreatmentStatuses;
const caseProgressStatuses = vm.caseProgressStatuses;
const adverseInsuranceStatuses = vm.adverseInsuranceStatuses;
        return this.legalCaseService.validateLegalCaseExcelData(excelData,accidentTypes,patients,medLevels,firms,attorneys,caseStatuses,caseTypes,patientTreatmentStatuses,caseProgressStatuses,adverseInsuranceStatuses);
      })
    )
  }


  readonly loadLegalCasesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userLegalCases({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                data: res.data.items,
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

readonly importExcelEffect = this.effect<UserUpdateLegalCaseInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.legalCaseService.importLegalCases(data).pipe(
        catchError(error => {
          console.log(error)
          this.toast.error(error.Message ?? 'Failed to save', {duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addLegalCases(created);
            this.updateLegalCases(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

