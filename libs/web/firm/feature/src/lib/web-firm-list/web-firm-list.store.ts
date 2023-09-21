

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Firm, CorePaging, UserUpdateFirmInput ,FirmStatus, Document } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { FirmService } from '@case-clinical/web/firm/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebFirmStatusFeatureStore } from '@case-clinical/web/firm-status/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface FirmListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
firmStatusId?: string,eulaId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Firm[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebFirmListStore extends ComponentStore<FirmListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly firmService: FirmService,
        private readonly toast: WebUiToastService,
         private readonly firmStatusStore: WebFirmStatusFeatureStore,
    ) {
    super({
      headerTitle: 'Firms',
      searchFocused: false,
      searchQuery: '',
firmStatusId: undefined,
eulaId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("firmStatusId")) {
      var firmStatusId = this.router.snapshot.paramMap.get("firmStatusId")
      this.setFirmStatusId(firmStatusId)
    }


    if(this.router.snapshot.paramMap.has("eulaId")) {
      var eulaId = this.router.snapshot.paramMap.get("eulaId")
      this.setEulaId(eulaId)
    }

    this.firmStatusStore.loadFirmStatusesEffect()
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


            readonly setFirmStatusId = this.updater((state, firmStatusId: string) => ({
                ...state,
    firmStatusId,
  }))


            readonly setEulaId = this.updater((state, eulaId: string) => ({
                ...state,
    eulaId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly firmStatusId$ = this.select((s) => s.firmStatusId)

readonly eulaId$ = this.select((s) => s.eulaId)

firmStatuses$ = this.firmStatusStore.firmStatuses$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.firmStatusId$,
this.eulaId$, this.searchQuery$, (paging, firmStatusId,
eulaId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    firmStatusId: firmStatusId,eulaId: eulaId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.firmStatusId$,
this.eulaId$,
    this.data$,
    this.firmStatuses$,
    (paging, errors, loading, searchFocused, searchQuery, firmStatusId,
eulaId, data ,firmStatuses) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      firmStatusId,
eulaId,
      data,
      firmStatuses
    }),
  )

    addFirms = this.updater((state, firms: any[]) => ({...state, data: state.data.concat(firms) }))
    updateFirms = this.updater((state, firms: any[]) => {
        return {
            ...state,
            data: state.data.map((firm) => {
            const updated = firms.find((el) => el.id === firm.id);
            return updated ? updated : firm;
            })
        }
    })

  validateImportData(excelData: any[]) {
    //excelData = this.firmService.preprocessFirmExcelData(excelData)
    return this.vm$.pipe(
      switchMap((vm) => {
        const firmStatuses = vm.firmStatuses;
        return this.firmService.validateFirmExcelData(excelData,firmStatuses,[]);
      })
    )
  }


  readonly loadFirmsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userFirms({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateFirmInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.firmService.importFirms(data).pipe(
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

            this.addFirms(created);
            this.updateFirms(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

