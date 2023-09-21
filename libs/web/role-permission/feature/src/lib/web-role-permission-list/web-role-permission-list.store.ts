

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, RolePermission, CorePaging, UserUpdateRolePermissionInput ,Permission } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { RolePermissionService } from '@case-clinical/web/role-permission/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebPermissionFeatureStore } from '@case-clinical/web/permission/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface RolePermissionListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
permissionId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: RolePermission[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebRolePermissionListStore extends ComponentStore<RolePermissionListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly rolePermissionService: RolePermissionService,
        private readonly toast: WebUiToastService,
         private readonly permissionStore: WebPermissionFeatureStore
    ) {
    super({
      headerTitle: 'RolePermissions',
      searchFocused: false,
      searchQuery: '',
permissionId: undefined,
      sortSettings: [],
      filterSettings: {},
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    
    if(this.router.snapshot.paramMap.has("permissionId")) {
      var permissionId = this.router.snapshot.paramMap.get("permissionId")
      this.setPermissionId(permissionId)
    }

    this.permissionStore.loadPermissionsEffect()
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


            readonly setPermissionId = this.updater((state, permissionId: string) => ({
                ...state,
    permissionId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly permissionId$ = this.select((s) => s.permissionId)

permissions$ = this.permissionStore.permissions$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.permissionId$, this.searchQuery$, (paging, permissionId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    permissionId: permissionId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.permissionId$,
    this.data$,
    this.permissions$,
    (paging, errors, loading, searchFocused, searchQuery, permissionId, data ,permissions) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      permissionId,
      data,
      permissions
    }),
  )

    addRolePermissions = this.updater((state, rolePermissions: any[]) => ({...state, data: state.data.concat(rolePermissions) }))
    updateRolePermissions = this.updater((state, rolePermissions: any[]) => {
        return {
            ...state,
            data: state.data.map((rolePermission) => {
            const updated = rolePermissions.find((el) => el.id === rolePermission.id);
            return updated ? updated : rolePermission;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const permissions = vm.permissions;
        return this.rolePermissionService.validateRolePermissionExcelData(excelData,permissions);
      })
    )
  }


  readonly loadRolePermissionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRolePermissions({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateRolePermissionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.rolePermissionService.importRolePermissions(data).pipe(
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

            this.addRolePermissions(created);
            this.updateRolePermissions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

