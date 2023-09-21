

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, UserFeature, CorePaging } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map,switchMap, tap, withLatestFrom } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'

export interface FilterState {
  [key: string]: unknown;
}

export interface UserFeatureListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
featureId?: string,userId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: UserFeature[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebUserFeatureListStore extends ComponentStore<UserFeatureListState> {
  constructor(private readonly data: WebCoreDataAccessService, private readonly router: ActivatedRoute) {
    super({
      headerTitle: 'UserFeatures',
      searchFocused: false,
      searchQuery: '',
featureId: undefined,
userId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })


    if(this.router.snapshot.paramMap.has("featureId")) {
      var featureId = this.router.snapshot.paramMap.get("featureId")
      this.setFeatureId(featureId)
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


            readonly setFeatureId = this.updater((state, featureId: string) => ({
                ...state,
    featureId,
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

readonly featureId$ = this.select((s) => s.featureId)

readonly userId$ = this.select((s) => s.userId)

  readonly data$ = this.select((s) => s.data)
  readonly items$ = this.select(this.data$, this.mapDataToItems)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.featureId$,
this.userId$, this.searchQuery$, (paging, featureId,
userId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    featureId: featureId,userId: userId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.featureId$,
this.userId$,
    this.data$,
    this.items$,
    (paging, errors, loading, searchFocused, searchQuery, featureId,
userId, data, items) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      featureId,
userId,
      data,
      items,
    }),
  )

  readonly loadUserFeaturesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userUserFeatures({input}).pipe(
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

  private mapDataToItems(data: UserFeature[]) {
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
    localStorage.setItem('sortStateUserFeaturesList', JSON.stringify(data))
  }

  public setFilterState(newFilterSettings: FilterState) {
    this.patchState({ filterSettings: newFilterSettings })
    localStorage.setItem('filterStateUserFeaturesList', JSON.stringify(newFilterSettings))
  }

  public restoreFilterAndSortState() {
    const sortSettings = localStorage.getItem('sortStateUserFeaturesList');
    const filterSettings = localStorage.getItem('filterStateUserFeaturesList');
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
