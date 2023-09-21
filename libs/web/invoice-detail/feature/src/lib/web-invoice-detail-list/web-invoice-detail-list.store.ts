

import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, InvoiceDetail, CorePaging } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map,switchMap, tap, withLatestFrom } from 'rxjs/operators'

export interface InvoiceDetailListState {
  headerTitle ?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
  paging?: CorePaging
  loading?: boolean
  data?: InvoiceDetail[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebInvoiceDetailListStore extends ComponentStore<InvoiceDetailListState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      headerTitle: 'InvoiceDetails',
      searchFocused: false,
      searchQuery: '',
      paging: {
        limit: 10000,
        skip: 0,
      },
    })
  }

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: { ...state.paging, skip },
  }))

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  readonly setSearchBarInFocus = this.updater((state, searchFocused: boolean) => ({
    ...state,
    searchFocused,
  }))

  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly data$ = this.select((s) => s.data)
  readonly items$ = this.select(this.data$, this.mapDataToItems)

  readonly input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
  }))

  readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.data$,
    this.items$,
    (paging, errors, loading, searchFocused, searchQuery, data, items) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      data,
      items,
    }),
  )

  readonly loadInvoiceDetailsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userInvoiceDetails({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: res.data.count,
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

  private mapDataToItems(data: InvoiceDetail[]) {
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
}


