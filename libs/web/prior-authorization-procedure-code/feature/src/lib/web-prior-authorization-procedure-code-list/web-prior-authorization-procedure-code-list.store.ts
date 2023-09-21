

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorAuthorizationProcedureCode, CorePaging, UserUpdatePriorAuthorizationProcedureCodeInput ,CostCategory, Procedure, PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorAuthorizationProcedureCodeService } from '@case-clinical/web/prior-authorization-procedure-code/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCostCategoryFeatureStore } from '@case-clinical/web/cost-category/shared'
import { WebProcedureFeatureStore } from '@case-clinical/web/procedure/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorAuthorizationProcedureCodeListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
costCategoryId?: string,procedureId?: string,priorAuthorizationRequestId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorAuthorizationProcedureCode[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorAuthorizationProcedureCodeListStore extends ComponentStore<PriorAuthorizationProcedureCodeListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorAuthorizationProcedureCodeService: PriorAuthorizationProcedureCodeService,
        private readonly toast: WebUiToastService,
         private readonly costCategoryStore: WebCostCategoryFeatureStore,
 private readonly procedureStore: WebProcedureFeatureStore,
 private readonly priorAuthorizationRequestStore: WebPriorAuthorizationRequestFeatureStore
    ) {
    super({
      headerTitle: 'PriorAuthorizationProcedureCodes',
      searchFocused: false,
      searchQuery: '',
costCategoryId: undefined,
procedureId: undefined,
priorAuthorizationRequestId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("costCategoryId")) {
      var costCategoryId = this.router.snapshot.paramMap.get("costCategoryId")
      this.setCostCategoryId(costCategoryId)
    }


    if(this.router.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.router.snapshot.paramMap.get("procedureId")
      this.setProcedureId(procedureId)
    }


    if(this.router.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.router.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }

    this.costCategoryStore.loadCostCategoriesEffect()
this.procedureStore.loadProceduresEffect()
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


            readonly setCostCategoryId = this.updater((state, costCategoryId: string) => ({
                ...state,
    costCategoryId,
  }))


            readonly setProcedureId = this.updater((state, procedureId: string) => ({
                ...state,
    procedureId,
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

readonly costCategoryId$ = this.select((s) => s.costCategoryId)

readonly procedureId$ = this.select((s) => s.procedureId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

costCategories$ = this.costCategoryStore.costCategories$
procedures$ = this.procedureStore.procedures$
priorAuthorizationRequests$ = this.priorAuthorizationRequestStore.priorAuthorizationRequests$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.costCategoryId$,
this.procedureId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, costCategoryId,
procedureId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    costCategoryId: costCategoryId,procedureId: procedureId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.costCategoryId$,
this.procedureId$,
this.priorAuthorizationRequestId$,
    this.data$,
    this.costCategories$,
this.procedures$,
this.priorAuthorizationRequests$,
    (paging, errors, loading, searchFocused, searchQuery, costCategoryId,
procedureId,
priorAuthorizationRequestId, data ,costCategories,procedures,priorAuthorizationRequests) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      costCategoryId,
procedureId,
priorAuthorizationRequestId,
      data,
      costCategories,procedures,priorAuthorizationRequests
    }),
  )

    addPriorAuthorizationProcedureCodes = this.updater((state, priorAuthorizationProcedureCodes: any[]) => ({...state, data: state.data.concat(priorAuthorizationProcedureCodes) }))
    updatePriorAuthorizationProcedureCodes = this.updater((state, priorAuthorizationProcedureCodes: any[]) => {
        return {
            ...state,
            data: state.data.map((priorAuthorizationProcedureCode) => {
            const updated = priorAuthorizationProcedureCodes.find((el) => el.id === priorAuthorizationProcedureCode.id);
            return updated ? updated : priorAuthorizationProcedureCode;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const costCategories = vm.costCategories;
const procedures = vm.procedures;
const priorAuthorizationRequests = vm.priorAuthorizationRequests;
        return this.priorAuthorizationProcedureCodeService.validatePriorAuthorizationProcedureCodeExcelData(excelData,costCategories,procedures,priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationProcedureCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationProcedureCodes({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationProcedureCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationProcedureCodeService.importPriorAuthorizationProcedureCodes(data).pipe(
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

            this.addPriorAuthorizationProcedureCodes(created);
            this.updatePriorAuthorizationProcedureCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

