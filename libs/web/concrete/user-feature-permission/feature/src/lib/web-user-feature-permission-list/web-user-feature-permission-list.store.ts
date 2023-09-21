

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, UserFeaturePermission, CorePaging } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map,switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'

export interface FilterState {
  [key: string]: unknown;
}

export interface UserFeaturePermissionListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
featurePermissionId?: string,userId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: UserFeaturePermission[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebUserFeaturePermissionListStore extends ComponentStore<UserFeaturePermissionListState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: ActivatedRoute) {
    super({
      headerTitle: 'UserFeaturePermissions',
      searchFocused: false,
      searchQuery: '',
featurePermissionId: undefined,
userId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })


    if(this.router.snapshot.paramMap.has("featurePermissionId")) {
      var featurePermissionId = this.router.snapshot.paramMap.get("featurePermissionId")
      this.setFeaturePermissionId(featurePermissionId)
    }


    if(this.router.snapshot.paramMap.has("userId")) {
      var userId = this.router.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }

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


            readonly setFeaturePermissionId = this.updater((state, featurePermissionId: string) => ({
                ...state,
    featurePermissionId,
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

readonly featurePermissionId$ = this.select((s) => s.featurePermissionId)

readonly userId$ = this.select((s) => s.userId)

  readonly data$ = this.select((s) => s.data)
  readonly items$ = this.select(this.data$, this.mapDataToItems)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.featurePermissionId$,
this.userId$, this.searchQuery$, (paging, featurePermissionId,
userId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    featurePermissionId: featurePermissionId,userId: userId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.featurePermissionId$,
this.userId$,
    this.data$,
    this.items$,
    (paging, errors, loading, searchFocused, searchQuery, featurePermissionId,
userId, data, items) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      featurePermissionId,
userId,
      data,
      items,
    }),
  )

  readonly loadUserFeaturePermissionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userUserFeaturePermissions({input}).pipe(
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

  private mapDataToItems(data: UserFeaturePermission[]) {
    return (data || []).map(
      ({ name, id, createdAt }) =>
        ({
          title: name,
          path: id,
          leftMeta: {
            icon: 'calendar',
            text: createdAt,
          },
        } as StackedListItem),
    )
  }

  public setSortState(data: ColumnState[]) {
    this.patchState({
      sortSettings: data,
    })
    localStorage.setItem('sortStateUserFeaturePermissionsList', JSON.stringify(data))
  }

  public setFilterState(newFilterSettings: FilterState) {
    this.patchState({ filterSettings: newFilterSettings })
    localStorage.setItem('filterStateUserFeaturePermissionsList', JSON.stringify(newFilterSettings))
  }

  public restoreFilterAndSortState() {
    const sortSettings = localStorage.getItem('sortStateUserFeaturePermissionsList');
    const filterSettings = localStorage.getItem('filterStateUserFeaturePermissionsList');
    if (sortSettings) {
      this.patchState({
        sortSettings: JSON.parse(sortSettings),
      })
    }
    if (filterSettings) {
      this.patchState({
        filterSettings: JSON.parse(filterSettings),
      })
    }
  }
}
