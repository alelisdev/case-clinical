

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, PriorMedsToDateStatus, CorePaging, UserUpdatePriorMedsToDateStatusInput  } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { PriorMedsToDateStatusService } from '@case-clinical/web/prior-meds-to-date-status/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface FilterState {
  [key: string]: unknown;
}

export interface PriorMedsToDateStatusListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string

  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: PriorMedsToDateStatus[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebPriorMedsToDateStatusListStore extends ComponentStore<PriorMedsToDateStatusListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly priorMedsToDateStatusService: PriorMedsToDateStatusService,
        private readonly toast: WebUiToastService,
        
    ) {
    super({
      headerTitle: 'PriorMedsToDateStatuses',
      searchFocused: false,
      searchQuery: '',

      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    
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



  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)


  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    
    this.data$,
    
    (paging, errors, loading, searchFocused, searchQuery,  data ) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      
      data,
      
    }),
  )

    addPriorMedsToDateStatuses = this.updater((state, priorMedsToDateStatuses: any[]) => ({...state, data: state.data.concat(priorMedsToDateStatuses) }))
    updatePriorMedsToDateStatuses = this.updater((state, priorMedsToDateStatuses: any[]) => {
        return {
            ...state,
            data: state.data.map((priorMedsToDateStatus) => {
            const updated = priorMedsToDateStatuses.find((el) => el.id === priorMedsToDateStatus.id);
            return updated ? updated : priorMedsToDateStatus;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        
        return this.priorMedsToDateStatusService.validatePriorMedsToDateStatusExcelData(excelData);
      })
    )
  }


  readonly loadPriorMedsToDateStatusesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorMedsToDateStatuses({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdatePriorMedsToDateStatusInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorMedsToDateStatusService.importPriorMedsToDateStatuses(data).pipe(
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

            this.addPriorMedsToDateStatuses(created);
            this.updatePriorMedsToDateStatuses(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

