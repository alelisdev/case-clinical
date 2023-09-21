

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Setting, CorePaging, UserUpdateSettingInput ,User } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { SettingService } from '@case-clinical/web/setting/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface SettingListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
userId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Setting[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebSettingListStore extends ComponentStore<SettingListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly settingService: SettingService,
        private readonly toast: WebUiToastService,
         private readonly userStore: WebUserFeatureStore
    ) {
    super({
      headerTitle: 'Settings',
      searchFocused: false,
      searchQuery: '',
userId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("userId")) {
      var userId = this.router.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }

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


            readonly setUserId = this.updater((state, userId: string) => ({
                ...state,
    userId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly userId$ = this.select((s) => s.userId)

users$ = this.userStore.users$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.userId$, this.searchQuery$, (paging, userId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    userId: userId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.userId$,
    this.data$,
    this.users$,
    (paging, errors, loading, searchFocused, searchQuery, userId, data ,users) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      userId,
      data,
      users
    }),
  )

    addSettings = this.updater((state, settings: any[]) => ({...state, data: state.data.concat(settings) }))
    updateSettings = this.updater((state, settings: any[]) => {
        return {
            ...state,
            data: state.data.map((setting) => {
            const updated = settings.find((el) => el.id === setting.id);
            return updated ? updated : setting;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const users = vm.users;
        return this.settingService.validateSettingExcelData(excelData,users);
      })
    )
  }


  readonly loadSettingsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userSettings({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateSettingInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.settingService.importSettings(data).pipe(
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

            this.addSettings(created);
            this.updateSettings(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

