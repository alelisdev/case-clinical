

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Attorney, CorePaging, UserUpdateAttorneyInput ,Firm, AttorneyStatus, AttorneyType, User } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { AttorneyService } from '@case-clinical/web/attorney/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebFirmFeatureStore } from '@case-clinical/web/firm/shared'
import { WebAttorneyStatusFeatureStore } from '@case-clinical/web/attorney-status/shared'
import { WebAttorneyTypeFeatureStore } from '@case-clinical/web/attorney-type/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface AttorneyListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
firmId?: string,attorneyStatusId?: string,attorneyTypeId?: string,createdById?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Attorney[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebAttorneyListStore extends ComponentStore<AttorneyListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly attorneyService: AttorneyService,
        private readonly toast: WebUiToastService,
         private readonly firmStore: WebFirmFeatureStore,
 private readonly attorneyStatusStore: WebAttorneyStatusFeatureStore,
 private readonly attorneyTypeStore: WebAttorneyTypeFeatureStore,
 private readonly userStore: WebUserFeatureStore
    ) {
    super({
      headerTitle: 'Attorneys',
      searchFocused: false,
      searchQuery: '',
firmId: undefined,
attorneyStatusId: undefined,
attorneyTypeId: undefined,
createdById: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("firmId")) {
      var firmId = this.router.snapshot.paramMap.get("firmId")
      this.setFirmId(firmId)
    }


    if(this.router.snapshot.paramMap.has("attorneyStatusId")) {
      var attorneyStatusId = this.router.snapshot.paramMap.get("attorneyStatusId")
      this.setAttorneyStatusId(attorneyStatusId)
    }


    if(this.router.snapshot.paramMap.has("attorneyTypeId")) {
      var attorneyTypeId = this.router.snapshot.paramMap.get("attorneyTypeId")
      this.setAttorneyTypeId(attorneyTypeId)
    }


    if(this.router.snapshot.paramMap.has("createdById")) {
      var createdById = this.router.snapshot.paramMap.get("createdById")
      this.setCreatedById(createdById)
    }

    this.firmStore.loadFirmsEffect()
this.attorneyStatusStore.loadAttorneyStatusesEffect()
this.attorneyTypeStore.loadAttorneyTypesEffect()
this.userStore.loadUsersEffect()
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


            readonly setFirmId = this.updater((state, firmId: string) => ({
                ...state,
    firmId,
  }))


            readonly setAttorneyStatusId = this.updater((state, attorneyStatusId: string) => ({
                ...state,
    attorneyStatusId,
  }))


            readonly setAttorneyTypeId = this.updater((state, attorneyTypeId: string) => ({
                ...state,
    attorneyTypeId,
  }))


            readonly setCreatedById = this.updater((state, createdById: string) => ({
                ...state,
    createdById,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly firmId$ = this.select((s) => s.firmId)

readonly attorneyStatusId$ = this.select((s) => s.attorneyStatusId)

readonly attorneyTypeId$ = this.select((s) => s.attorneyTypeId)

readonly createdById$ = this.select((s) => s.createdById)

firms$ = this.firmStore.firms$
attorneyStatuses$ = this.attorneyStatusStore.attorneyStatuses$
attorneyTypes$ = this.attorneyTypeStore.attorneyTypes$
users$ = this.userStore.users$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.firmId$,
this.attorneyStatusId$,
this.attorneyTypeId$,
this.createdById$, this.searchQuery$, (paging, firmId,
attorneyStatusId,
attorneyTypeId,
createdById,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    firmId: firmId,attorneyStatusId: attorneyStatusId,attorneyTypeId: attorneyTypeId,createdById: createdById,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.firmId$,
this.attorneyStatusId$,
this.attorneyTypeId$,
this.createdById$,
    this.data$,
    this.firms$,
this.attorneyStatuses$,
this.attorneyTypes$,
this.users$,
    (paging, errors, loading, searchFocused, searchQuery, firmId,
attorneyStatusId,
attorneyTypeId,
createdById, data ,firms,attorneyStatuses,attorneyTypes,users) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      firmId,
attorneyStatusId,
attorneyTypeId,
createdById,
      data,
      firms,attorneyStatuses,attorneyTypes,users
    }),
  )

    addAttorneys = this.updater((state, attorneys: any[]) => ({...state, data: state.data.concat(attorneys) }))
    updateAttorneys = this.updater((state, attorneys: any[]) => {
        return {
            ...state,
            data: state.data.map((attorney) => {
            const updated = attorneys.find((el) => el.id === attorney.id);
            return updated ? updated : attorney;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const firms = vm.firms;
const attorneyStatuses = vm.attorneyStatuses;
const attorneyTypes = vm.attorneyTypes;
const users = vm.users;
        return this.attorneyService.validateAttorneyExcelData(excelData,firms,attorneyStatuses,attorneyTypes,users);
      })
    )
  }


  readonly loadAttorneysEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAttorneys({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateAttorneyInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.attorneyService.importAttorneys(data).pipe(
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

            this.addAttorneys(created);
            this.updateAttorneys(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

