

import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, Role, CorePaging } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map,switchMap, tap, withLatestFrom } from 'rxjs/operators'

export interface RoleListState {
  headerTitle ?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
  userRoleId: string
  paging?: CorePaging
  loading?: boolean
  data?: Role[]
  menuItems?: MenuItem[]
}

@Injectable()
export class RoleListStore extends ComponentStore<RoleListState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      headerTitle: 'Roles',
      searchFocused: false,
      searchQuery: '',
      userRoleId: '',
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
  readonly userRoleId$ = this.select((s) => s.userRoleId)

  readonly input$ = this.select(this.paging$, this.searchQuery$, this.userRoleId$, (paging, searchQuery, userRoleId) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
     userRoleId: userRoleId
  }))

  readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.data$,
    this.items$,
    this.userRoleId$,
    (paging, errors, loading, searchFocused, searchQuery, data, items, userRoleId) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      data,
      items,
     userRoleId: userRoleId
    }),
  )

  readonly loadRolesEffect = this.effect<string>(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
        switchMap(([userRoleId, input]) =>{
        input.userRoleId = userRoleId
        this.patchState({userRoleId: userRoleId});

        return this.data.userUserRoleRoles({ input }).pipe(
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
        )
},
      ),
    ),
  )

  private mapDataToItems(data: Role[]) {
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


