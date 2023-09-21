

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, AuthorizationKind, CorePaging, UserUpdateAuthorizationKindInput ,Category } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { AuthorizationKindService } from '@case-clinical/web/authorization-kind/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebCategoryFeatureStore } from '@case-clinical/web/category/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface AuthorizationKindListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
categoryId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: AuthorizationKind[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebAuthorizationKindListStore extends ComponentStore<AuthorizationKindListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly authorizationKindService: AuthorizationKindService,
        private readonly toast: WebUiToastService,
         private readonly categoryStore: WebCategoryFeatureStore
    ) {
    super({
      headerTitle: 'AuthorizationKinds',
      searchFocused: false,
      searchQuery: '',
categoryId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("categoryId")) {
      var categoryId = this.router.snapshot.paramMap.get("categoryId")
      this.setCategoryId(categoryId)
    }

    this.categoryStore.loadCategoriesEffect()
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


            readonly setCategoryId = this.updater((state, categoryId: string) => ({
                ...state,
    categoryId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly categoryId$ = this.select((s) => s.categoryId)

categories$ = this.categoryStore.categories$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.categoryId$, this.searchQuery$, (paging, categoryId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    categoryId: categoryId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.categoryId$,
    this.data$,
    this.categories$,
    (paging, errors, loading, searchFocused, searchQuery, categoryId, data ,categories) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      categoryId,
      data,
      categories
    }),
  )

    addAuthorizationKinds = this.updater((state, authorizationKinds: any[]) => ({...state, data: state.data.concat(authorizationKinds) }))
    updateAuthorizationKinds = this.updater((state, authorizationKinds: any[]) => {
        return {
            ...state,
            data: state.data.map((authorizationKind) => {
            const updated = authorizationKinds.find((el) => el.id === authorizationKind.id);
            return updated ? updated : authorizationKind;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const categories = vm.categories;
        return this.authorizationKindService.validateAuthorizationKindExcelData(excelData,categories);
      })
    )
  }


  readonly loadAuthorizationKindsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizationKinds({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateAuthorizationKindInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationKindService.importAuthorizationKinds(data).pipe(
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
            this.addAuthorizationKinds(created);
            this.updateAuthorizationKinds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

