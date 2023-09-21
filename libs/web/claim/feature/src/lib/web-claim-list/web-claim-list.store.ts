

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Claim, CorePaging, UserUpdateClaimInput ,PriorAuthorizationRequest, Patient } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { ClaimService } from '@case-clinical/web/claim/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface ClaimListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
priorAuthorizationRequestId?: string,patientId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Claim[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebClaimListStore extends ComponentStore<ClaimListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly claimService: ClaimService,
        private readonly toast: WebUiToastService,
         private readonly priorAuthorizationRequestStore: WebPriorAuthorizationRequestFeatureStore,
 private readonly patientStore: WebPatientFeatureStore
    ) {
    super({
      headerTitle: 'Claims',
      searchFocused: false,
      searchQuery: '',
priorAuthorizationRequestId: undefined,
patientId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.router.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }


    if(this.router.snapshot.paramMap.has("patientId")) {
      var patientId = this.router.snapshot.paramMap.get("patientId")
      this.setPatientId(patientId)
    }

    this.priorAuthorizationRequestStore.loadPriorAuthorizationRequestsEffect()
this.patientStore.loadPatientsEffect()
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


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))


            readonly setPatientId = this.updater((state, patientId: string) => ({
                ...state,
    patientId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

readonly patientId$ = this.select((s) => s.patientId)

priorAuthorizationRequests$ = this.priorAuthorizationRequestStore.priorAuthorizationRequests$
patients$ = this.patientStore.patients$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.priorAuthorizationRequestId$,
this.patientId$, this.searchQuery$, (paging, priorAuthorizationRequestId,
patientId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    priorAuthorizationRequestId: priorAuthorizationRequestId,patientId: patientId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.priorAuthorizationRequestId$,
this.patientId$,
    this.data$,
    this.priorAuthorizationRequests$,
this.patients$,
    (paging, errors, loading, searchFocused, searchQuery, priorAuthorizationRequestId,
patientId, data ,priorAuthorizationRequests,patients) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      priorAuthorizationRequestId,
patientId,
      data,
      priorAuthorizationRequests,patients
    }),
  )

    addClaims = this.updater((state, claims: any[]) => ({...state, data: state.data.concat(claims) }))
    updateClaims = this.updater((state, claims: any[]) => {
        return {
            ...state,
            data: state.data.map((claim) => {
            const updated = claims.find((el) => el.id === claim.id);
            return updated ? updated : claim;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const priorAuthorizationRequests = vm.priorAuthorizationRequests;
const patients = vm.patients;
        return this.claimService.validateClaimExcelData(excelData,priorAuthorizationRequests,patients);
      })
    )
  }


  readonly loadClaimsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userClaims({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateClaimInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.claimService.importClaims(data).pipe(
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

            this.addClaims(created);
            this.updateClaims(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

