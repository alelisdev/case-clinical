

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, UserRole, CorePaging, UserUpdateUserRoleInput ,Role, User } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { UserRoleService } from '@case-clinical/web/user-role/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebRoleFeatureStore } from '@case-clinical/web/role/shared'
import { WebUserFeatureStore } from '@case-clinical/web/user/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface UserRoleListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
roleId?: string,userId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: UserRole[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebUserRoleListStore extends ComponentStore<UserRoleListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly userRoleService: UserRoleService,
        private readonly toast: WebUiToastService,
         private readonly roleStore: WebRoleFeatureStore,
 private readonly userStore: WebUserFeatureStore
    ) {
    super({
      headerTitle: 'UserRoles',
      searchFocused: false,
      searchQuery: '',
roleId: undefined,
userId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("roleId")) {
      var roleId = this.router.snapshot.paramMap.get("roleId")
      this.setRoleId(roleId)
    }


    if(this.router.snapshot.paramMap.has("userId")) {
      var userId = this.router.snapshot.paramMap.get("userId")
      this.setUserId(userId)
    }

    this.roleStore.loadRolesEffect()
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


            readonly setRoleId = this.updater((state, roleId: string) => ({
                ...state,
    roleId,
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

readonly roleId$ = this.select((s) => s.roleId)

readonly userId$ = this.select((s) => s.userId)

roles$ = this.roleStore.roles$
users$ = this.userStore.users$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.roleId$,
this.userId$, this.searchQuery$, (paging, roleId,
userId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    roleId: roleId,userId: userId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.roleId$,
this.userId$,
    this.data$,
    this.roles$,
this.users$,
    (paging, errors, loading, searchFocused, searchQuery, roleId,
userId, data ,roles,users) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      roleId,
userId,
      data,
      roles,users
    }),
  )

    addUserRoles = this.updater((state, userRoles: any[]) => ({...state, data: state.data.concat(userRoles) }))
    updateUserRoles = this.updater((state, userRoles: any[]) => {
        return {
            ...state,
            data: state.data.map((userRole) => {
            const updated = userRoles.find((el) => el.id === userRole.id);
            return updated ? updated : userRole;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const roles = vm.roles;
const users = vm.users;
        return this.userRoleService.validateUserRoleExcelData(excelData,roles,users);
      })
    )
  }


  readonly loadUserRolesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userUserRoles({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateUserRoleInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.userRoleService.importUserRoles(data).pipe(
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

            this.addUserRoles(created);
            this.updateUserRoles(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

