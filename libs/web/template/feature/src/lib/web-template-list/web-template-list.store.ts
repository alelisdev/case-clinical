

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, Template, CorePaging, UserUpdateTemplateInput } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { TemplateService } from '../template.service'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface FilterState {
  [key: string]: unknown;
}

export interface TemplateListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string

  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: Template[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebTemplateListStore extends ComponentStore<TemplateListState> {
  constructor(
        private readonly data: WebCoreDataAccessService,
        private readonly router: ActivatedRoute,
        private readonly templateService: TemplateService,
        private readonly toast: WebUiToastService
    ) {
    super({
      headerTitle: 'Templates',
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
    (paging, errors, loading, searchFocused, searchQuery,  data) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,

      data,
    }),
  )

  readonly loadTemplatesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userTemplates({input}).pipe(
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

   readonly importExcelEffect = this.effect<UserUpdateTemplateInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.templateService.importTemplates(data).pipe(
        catchError(error => {console.log(error)
          this.toast.error(error.Message, { duration: 3000 })
          return EMPTY;
        }),
        tap(
          () => {this.toast.success(`Imported excel file`, { duration: 3000 })
            this.patchState({ loading: true, data: []})
          }
        ),
        withLatestFrom(this.input$),
        switchMap(([_, input]) =>
          this.data.userTemplates({input}).pipe(
            tapResponse(
              (res) =>
                this.patchState({paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                  data: res.data.items,
                  errors: res.errors,
                  loading: false,
                }),
              (errors: any) =>
                this.patchState({loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                }),
            ),
          ),
        ),
      ))
    )
  )
}

