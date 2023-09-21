

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorAuthorizationRequest, CorePaging, UserUpdatePriorAuthorizationRequestInput ,ProcedureSite, SurgicalPosition, User, Document, VisitKind, GuidelineUsed, AuthorizationKind, AuthorizationStatus, Patient, CaseProcedure } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorAuthorizationRequestService } from '@case-clinical/web/prior-authorization-request/shared'
import { EMPTY, of } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebProcedureSiteFeatureStore } from '@case-clinical/web/procedure-site/shared'
import { WebSurgicalPositionFeatureStore } from '@case-clinical/web/surgical-position/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'
import { WebGuidelineUsedFeatureStore } from '@case-clinical/web/guideline-used/shared'
import { WebAuthorizationKindFeatureStore } from '@case-clinical/web/authorization-kind/shared'
import { WebAuthorizationStatusFeatureStore } from '@case-clinical/web/authorization-status/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorAuthorizationRequestListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
procedureSiteId?: string,surgicalPositionId?: string,medicalProviderId?: string,referredToId?: string,prescriptionId?: string,visitKindId?: string,guidelineUsedId?: string,authorizationKindId?: string,authorizationStatusId?: string,billId?: string,medicalReportId?: string,patientId?: string,caseProcedureId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorAuthorizationRequest[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorAuthorizationRequestListStore extends ComponentStore<PriorAuthorizationRequestListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorAuthorizationRequestService: PriorAuthorizationRequestService,
        private readonly toast: WebUiToastService,
         private readonly procedureSiteStore: WebProcedureSiteFeatureStore,
 private readonly surgicalPositionStore: WebSurgicalPositionFeatureStore,
 private readonly userStore: WebUserFeatureStore,
 private readonly visitKindStore: WebVisitKindFeatureStore,
 private readonly guidelineUsedStore: WebGuidelineUsedFeatureStore,
 private readonly authorizationKindStore: WebAuthorizationKindFeatureStore,
 private readonly authorizationStatusStore: WebAuthorizationStatusFeatureStore,
 private readonly patientStore: WebPatientFeatureStore,
 private readonly caseProcedureStore: WebCaseProcedureFeatureStore
    ) {
    super({
      headerTitle: 'PriorAuthorizationRequests',
      searchFocused: false,
      searchQuery: '',
procedureSiteId: undefined,
surgicalPositionId: undefined,
medicalProviderId: undefined,
referredToId: undefined,
prescriptionId: undefined,
visitKindId: undefined,
guidelineUsedId: undefined,
authorizationKindId: undefined,
authorizationStatusId: undefined,
billId: undefined,
medicalReportId: undefined,
patientId: undefined,
caseProcedureId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("procedureSiteId")) {
      var procedureSiteId = this.router.snapshot.paramMap.get("procedureSiteId")
      this.setProcedureSiteId(procedureSiteId)
    }


    if(this.router.snapshot.paramMap.has("surgicalPositionId")) {
      var surgicalPositionId = this.router.snapshot.paramMap.get("surgicalPositionId")
      this.setSurgicalPositionId(surgicalPositionId)
    }


    if(this.router.snapshot.paramMap.has("medicalProviderId")) {
      var medicalProviderId = this.router.snapshot.paramMap.get("medicalProviderId")
      this.setMedicalProviderId(medicalProviderId)
    }


    if(this.router.snapshot.paramMap.has("referredToId")) {
      var referredToId = this.router.snapshot.paramMap.get("referredToId")
      this.setReferredToId(referredToId)
    }


    if(this.router.snapshot.paramMap.has("prescriptionId")) {
      var prescriptionId = this.router.snapshot.paramMap.get("prescriptionId")
      this.setPrescriptionId(prescriptionId)
    }


    if(this.router.snapshot.paramMap.has("visitKindId")) {
      var visitKindId = this.router.snapshot.paramMap.get("visitKindId")
      this.setVisitKindId(visitKindId)
    }


    if(this.router.snapshot.paramMap.has("guidelineUsedId")) {
      var guidelineUsedId = this.router.snapshot.paramMap.get("guidelineUsedId")
      this.setGuidelineUsedId(guidelineUsedId)
    }


    if(this.router.snapshot.paramMap.has("authorizationKindId")) {
      var authorizationKindId = this.router.snapshot.paramMap.get("authorizationKindId")
      this.setAuthorizationKindId(authorizationKindId)
    }


    if(this.router.snapshot.paramMap.has("authorizationStatusId")) {
      var authorizationStatusId = this.router.snapshot.paramMap.get("authorizationStatusId")
      this.setAuthorizationStatusId(authorizationStatusId)
    }


    if(this.router.snapshot.paramMap.has("billId")) {
      var billId = this.router.snapshot.paramMap.get("billId")
      this.setBillId(billId)
    }


    if(this.router.snapshot.paramMap.has("medicalReportId")) {
      var medicalReportId = this.router.snapshot.paramMap.get("medicalReportId")
      this.setMedicalReportId(medicalReportId)
    }


    if(this.router.snapshot.paramMap.has("patientId")) {
      var patientId = this.router.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }


    if(this.router.snapshot.paramMap.has("caseProcedureId")) {
      var caseProcedureId = this.router.snapshot.paramMap.get("caseProcedureId")
      this.setCaseProcedureId(caseProcedureId)
    }

    this.procedureSiteStore.loadProcedureSitesEffect()
this.surgicalPositionStore.loadSurgicalPositionsEffect()
this.userStore.loadUsersEffect()
this.visitKindStore.loadVisitKindsEffect()
this.guidelineUsedStore.loadGuidelineUsedsEffect()
this.authorizationKindStore.loadAuthorizationKindsEffect()
this.authorizationStatusStore.loadAuthorizationStatusesEffect()
this.patientStore.loadPatientsEffect()
this.caseProcedureStore.loadCaseProceduresEffect()
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


            readonly setProcedureSiteId = this.updater((state, procedureSiteId: string) => ({
                ...state,
    procedureSiteId,
  }))


            readonly setSurgicalPositionId = this.updater((state, surgicalPositionId: string) => ({
                ...state,
    surgicalPositionId,
  }))


            readonly setMedicalProviderId = this.updater((state, medicalProviderId: string) => ({
                ...state,
    medicalProviderId,
  }))


            readonly setReferredToId = this.updater((state, referredToId: string) => ({
                ...state,
    referredToId,
  }))


            readonly setPrescriptionId = this.updater((state, prescriptionId: string) => ({
                ...state,
    prescriptionId,
  }))


            readonly setVisitKindId = this.updater((state, visitKindId: string) => ({
                ...state,
    visitKindId,
  }))


            readonly setGuidelineUsedId = this.updater((state, guidelineUsedId: string) => ({
                ...state,
    guidelineUsedId,
  }))


            readonly setAuthorizationKindId = this.updater((state, authorizationKindId: string) => ({
                ...state,
    authorizationKindId,
  }))


            readonly setAuthorizationStatusId = this.updater((state, authorizationStatusId: string) => ({
                ...state,
    authorizationStatusId,
  }))


            readonly setBillId = this.updater((state, billId: string) => ({
                ...state,
    billId,
  }))


            readonly setMedicalReportId = this.updater((state, medicalReportId: string) => ({
                ...state,
    medicalReportId,
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


            readonly setCaseProcedureId = this.updater((state, caseProcedureId: string) => ({
                ...state,
    caseProcedureId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly procedureSiteId$ = this.select((s) => s.procedureSiteId)

readonly surgicalPositionId$ = this.select((s) => s.surgicalPositionId)

readonly medicalProviderId$ = this.select((s) => s.medicalProviderId)

readonly referredToId$ = this.select((s) => s.referredToId)

readonly prescriptionId$ = this.select((s) => s.prescriptionId)

readonly visitKindId$ = this.select((s) => s.visitKindId)

readonly guidelineUsedId$ = this.select((s) => s.guidelineUsedId)

readonly authorizationKindId$ = this.select((s) => s.authorizationKindId)

readonly authorizationStatusId$ = this.select((s) => s.authorizationStatusId)

readonly billId$ = this.select((s) => s.billId)

readonly medicalReportId$ = this.select((s) => s.medicalReportId)

readonly patientId$ = this.select((s) => s.patientId)

readonly caseProcedureId$ = this.select((s) => s.caseProcedureId)

procedureSites$ = this.procedureSiteStore.procedureSites$
surgicalPositions$ = this.surgicalPositionStore.surgicalPositions$
medicalProviders$ = this.userStore.users$
referredTos$ = this.userStore.users$
visitKinds$ = this.visitKindStore.visitKinds$
guidelineUseds$ = this.guidelineUsedStore.guidelineUseds$
authorizationKinds$ = this.authorizationKindStore.authorizationKinds$
authorizationStatuses$ = this.authorizationStatusStore.authorizationStatuses$
patients$ = this.patientStore.patients$
caseProcedures$ = this.caseProcedureStore.caseProcedures$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.procedureSiteId$,
this.surgicalPositionId$,
this.medicalProviderId$,
this.referredToId$,
this.prescriptionId$,
this.visitKindId$,
this.guidelineUsedId$,
this.authorizationKindId$,
this.authorizationStatusId$,
this.billId$,
this.medicalReportId$,
this.patientId$,
this.caseProcedureId$, this.searchQuery$, (paging, procedureSiteId,
surgicalPositionId,
medicalProviderId,
referredToId,
prescriptionId,
visitKindId,
guidelineUsedId,
authorizationKindId,
authorizationStatusId,
billId,
medicalReportId,
patientId,
caseProcedureId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    procedureSiteId: procedureSiteId,surgicalPositionId: surgicalPositionId,medicalProviderId: medicalProviderId,referredToId: referredToId,prescriptionId: prescriptionId,visitKindId: visitKindId,guidelineUsedId: guidelineUsedId,authorizationKindId: authorizationKindId,authorizationStatusId: authorizationStatusId,billId: billId,medicalReportId: medicalReportId,patientId: patientId,caseProcedureId: caseProcedureId,
    total: paging.total
  }))

  readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.procedureSiteId$,
this.surgicalPositionId$,
this.medicalProviderId$,
this.referredToId$,
this.prescriptionId$,
this.visitKindId$,
this.guidelineUsedId$,
this.authorizationKindId$,
this.authorizationStatusId$,
this.billId$,
this.medicalReportId$,
this.patientId$,
this.caseProcedureId$,
    this.data$,
    this.procedureSites$,
this.surgicalPositions$,
this.medicalProviders$,
this.referredTos$,
of([]),
this.visitKinds$,
this.guidelineUseds$,
this.authorizationKinds$,
this.authorizationStatuses$,
this.patients$,
this.caseProcedures$,
of([]),
of([]),
    (paging, errors, loading, searchFocused, searchQuery, procedureSiteId,
surgicalPositionId,
medicalProviderId,
referredToId,
prescriptionId,
visitKindId,
guidelineUsedId,
authorizationKindId,
authorizationStatusId,
billId,
medicalReportId,
patientId,
caseProcedureId, data ,procedureSites,surgicalPositions,medicalProviders, referredTos, prescriptions,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients,caseProcedures, bills,
medicalReports) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      procedureSiteId,
surgicalPositionId,
medicalProviderId,
referredToId,
prescriptionId,
visitKindId,
guidelineUsedId,
authorizationKindId,
authorizationStatusId,
billId,
medicalReportId,
patientId,
caseProcedureId,
      data,
      procedureSites,surgicalPositions,medicalProviders, referredTos, prescriptions,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,patients,caseProcedures, bills, medicalReports
    }),
  )

    addPriorAuthorizationRequests = this.updater((state, priorAuthorizationRequests: any[]) => ({...state, data: state.data.concat(priorAuthorizationRequests) }))
    updatePriorAuthorizationRequests = this.updater((state, priorAuthorizationRequests: any[]) => {
        return {
            ...state,
            data: state.data.map((priorAuthorizationRequest) => {
            const updated = priorAuthorizationRequests.find((el) => el.id === priorAuthorizationRequest.id);
            return updated ? updated : priorAuthorizationRequest;
            })
        }
    })

    validateImportData(excelData: any[]) {
      return this.vm$.pipe(
        switchMap((vm:any) => {
          const procedureSites = vm.procedureSites;
  const surgicalPositions = vm.surgicalPositions;
  const medicalProviders = vm.medicalProviders;
  const referredTos = vm.referredTos;
  const visitKinds = vm.visitKinds;
  const guidelineUseds = vm.guidelineUseds;
  const authorizationKinds = vm.authorizationKinds;
  const authorizationStatuses = vm.authorizationStatuses;
  const prescriptions = vm.prescriptions;
  const bills = vm.bills;
  const medicalReports = vm.medicalReports;
  
  const patients = vm.patients;
  const caseProcedures = vm.caseProcedures;
          return this.priorAuthorizationRequestService.validatePriorAuthorizationRequestExcelData(excelData,
            procedureSites,surgicalPositions, medicalProviders, referredTos, prescriptions,visitKinds,guidelineUseds,authorizationKinds,authorizationStatuses,bills,medicalReports,patients,caseProcedures);
        })
      )
    }
  

  readonly loadPriorAuthorizationRequestsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationRequests({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationRequestInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationRequestService.importPriorAuthorizationRequests(data).pipe(
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

            this.addPriorAuthorizationRequests(created);
            this.updatePriorAuthorizationRequests(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

