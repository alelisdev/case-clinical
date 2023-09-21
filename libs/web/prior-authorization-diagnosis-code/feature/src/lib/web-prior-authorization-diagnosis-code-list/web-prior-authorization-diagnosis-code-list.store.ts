

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorAuthorizationDiagnosisCode, CorePaging, UserUpdatePriorAuthorizationDiagnosisCodeInput ,DiagnosisCode, PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorAuthorizationDiagnosisCodeService } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorAuthorizationDiagnosisCodeListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
diagnosisCodeId?: string,priorAuthorizationRequestId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorAuthorizationDiagnosisCode[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorAuthorizationDiagnosisCodeListStore extends ComponentStore<PriorAuthorizationDiagnosisCodeListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorAuthorizationDiagnosisCodeService: PriorAuthorizationDiagnosisCodeService,
        private readonly toast: WebUiToastService,
         private readonly diagnosisCodeStore: WebDiagnosisCodeFeatureStore,
 private readonly priorAuthorizationRequestStore: WebPriorAuthorizationRequestFeatureStore
    ) {
    super({
      headerTitle: 'PriorAuthorizationDiagnosisCodes',
      searchFocused: false,
      searchQuery: '',
diagnosisCodeId: undefined,
priorAuthorizationRequestId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.router.snapshot.paramMap.get("diagnosisCodeId")
      this.setDiagnosisCodeId(diagnosisCodeId)
    }


    if(this.router.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.router.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }

    this.diagnosisCodeStore.loadDiagnosisCodesEffect()
this.priorAuthorizationRequestStore.loadPriorAuthorizationRequestsEffect()
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


            readonly setDiagnosisCodeId = this.updater((state, diagnosisCodeId: string) => ({
                ...state,
    diagnosisCodeId,
  }))


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly diagnosisCodeId$ = this.select((s) => s.diagnosisCodeId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

diagnosisCodes$ = this.diagnosisCodeStore.diagnosisCodes$
priorAuthorizationRequests$ = this.priorAuthorizationRequestStore.priorAuthorizationRequests$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.diagnosisCodeId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, diagnosisCodeId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    diagnosisCodeId: diagnosisCodeId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.diagnosisCodeId$,
this.priorAuthorizationRequestId$,
    this.data$,
    this.diagnosisCodes$,
this.priorAuthorizationRequests$,
    (paging, errors, loading, searchFocused, searchQuery, diagnosisCodeId,
priorAuthorizationRequestId, data ,diagnosisCodes,priorAuthorizationRequests) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      diagnosisCodeId,
priorAuthorizationRequestId,
      data,
      diagnosisCodes,priorAuthorizationRequests
    }),
  )

    addPriorAuthorizationDiagnosisCodes = this.updater((state, priorAuthorizationDiagnosisCodes: any[]) => ({...state, data: state.data.concat(priorAuthorizationDiagnosisCodes) }))
    updatePriorAuthorizationDiagnosisCodes = this.updater((state, priorAuthorizationDiagnosisCodes: any[]) => {
        return {
            ...state,
            data: state.data.map((priorAuthorizationDiagnosisCode) => {
            const updated = priorAuthorizationDiagnosisCodes.find((el) => el.id === priorAuthorizationDiagnosisCode.id);
            return updated ? updated : priorAuthorizationDiagnosisCode;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const diagnosisCodes = vm.diagnosisCodes;
const priorAuthorizationRequests = vm.priorAuthorizationRequests;
        return this.priorAuthorizationDiagnosisCodeService.validatePriorAuthorizationDiagnosisCodeExcelData(excelData,diagnosisCodes,priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationDiagnosisCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationDiagnosisCodes({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationDiagnosisCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationDiagnosisCodeService.importPriorAuthorizationDiagnosisCodes(data).pipe(
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

            this.addPriorAuthorizationDiagnosisCodes(created);
            this.updatePriorAuthorizationDiagnosisCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

