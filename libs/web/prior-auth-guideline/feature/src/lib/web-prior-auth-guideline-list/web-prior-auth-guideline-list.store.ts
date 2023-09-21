

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorAuthGuideline, CorePaging, UserUpdatePriorAuthGuidelineInput ,Guideline, PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorAuthGuidelineService } from '@case-clinical/web/prior-auth-guideline/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebGuidelineFeatureStore } from '@case-clinical/web/guideline/shared'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface PriorAuthGuidelineListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
guidelineId?: string,priorAuthorizationRequestId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorAuthGuideline[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorAuthGuidelineListStore extends ComponentStore<PriorAuthGuidelineListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorAuthGuidelineService: PriorAuthGuidelineService,
        private readonly toast: WebUiToastService,
         private readonly guidelineStore: WebGuidelineFeatureStore,
 private readonly priorAuthorizationRequestStore: WebPriorAuthorizationRequestFeatureStore
    ) {
    super({
      headerTitle: 'PriorAuthGuidelines',
      searchFocused: false,
      searchQuery: '',
guidelineId: undefined,
priorAuthorizationRequestId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("guidelineId")) {
      var guidelineId = this.router.snapshot.paramMap.get("guidelineId")
      this.setGuidelineId(guidelineId)
    }


    if(this.router.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.router.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }

    this.guidelineStore.loadGuidelinesEffect()
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


            readonly setGuidelineId = this.updater((state, guidelineId: string) => ({
                ...state,
    guidelineId,
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

readonly guidelineId$ = this.select((s) => s.guidelineId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

guidelines$ = this.guidelineStore.guidelines$
priorAuthorizationRequests$ = this.priorAuthorizationRequestStore.priorAuthorizationRequests$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.guidelineId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, guidelineId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    guidelineId: guidelineId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.guidelineId$,
this.priorAuthorizationRequestId$,
    this.data$,
    this.guidelines$,
this.priorAuthorizationRequests$,
    (paging, errors, loading, searchFocused, searchQuery, guidelineId,
priorAuthorizationRequestId, data ,guidelines,priorAuthorizationRequests) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      guidelineId,
priorAuthorizationRequestId,
      data,
      guidelines,priorAuthorizationRequests
    }),
  )

    addPriorAuthGuidelines = this.updater((state, priorAuthGuidelines: any[]) => ({...state, data: state.data.concat(priorAuthGuidelines) }))
    updatePriorAuthGuidelines = this.updater((state, priorAuthGuidelines: any[]) => {
        return {
            ...state,
            data: state.data.map((priorAuthGuideline) => {
            const updated = priorAuthGuidelines.find((el) => el.id === priorAuthGuideline.id);
            return updated ? updated : priorAuthGuideline;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const guidelines = vm.guidelines;
const priorAuthorizationRequests = vm.priorAuthorizationRequests;
        return this.priorAuthGuidelineService.validatePriorAuthGuidelineExcelData(excelData,guidelines,priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthGuidelinesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthGuidelines({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorAuthGuidelineInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthGuidelineService.importPriorAuthGuidelines(data).pipe(
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

            this.addPriorAuthGuidelines(created);
            this.updatePriorAuthGuidelines(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

