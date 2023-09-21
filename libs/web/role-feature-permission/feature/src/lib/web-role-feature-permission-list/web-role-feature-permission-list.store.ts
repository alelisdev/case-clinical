

import { Injectable } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { WebCoreDataAccessService, RoleFeaturePermission, CorePaging, UserUpdateRoleFeaturePermissionInput ,FeaturePermission, Role } from '@case-clinical/web/core/data-access'
import { MenuItem } from '@case-clinical/web/ui/dropdown'
import { StackedListItem } from '@case-clinical/web/ui/stacked-list'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { map, switchMap, tap, withLatestFrom, catchError } from 'rxjs/operators'
import { ColumnState, SortModelItem } from '@ag-grid-community/core'
import { RoleFeaturePermissionService } from '@case-clinical/web/role-feature-permission/shared'
import { EMPTY } from 'rxjs'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { WebRoleFeatureStore } from '@case-clinical/web/role/shared'

export interface FilterState {
  [key: string]: unknown;
}

export interface RoleFeaturePermissionListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
featurePermissionId?: string,roleId?: string,
  sortSettings: ColumnState[]
  filterSettings: FilterState
  paging?: CorePaging
  loading?: boolean
  data?: RoleFeaturePermission[]
  menuItems?: MenuItem[]
}

@Injectable()
export class WebRoleFeaturePermissionListStore extends ComponentStore<RoleFeaturePermissionListState> {
  constructor(
        private readonly data: WebCoreDataAccessService, 
        private readonly router: ActivatedRoute,
        private readonly roleFeaturePermissionService: RoleFeaturePermissionService,
        private readonly toast: WebUiToastService,
 private readonly roleStore: WebRoleFeatureStore
    ) {
    super({
      headerTitle: 'RoleFeaturePermissions',
      searchFocused: false,
      searchQuery: '',
featurePermissionId: undefined,
roleId: undefined,
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


    if(this.router.snapshot.paramMap.has("roleId")) {
      var roleId = this.router.snapshot.paramMap.get("roleId")
      this.setRoleId(roleId)
    }

    this.roleStore.loadRolesEffect()
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


            readonly setRoleId = this.updater((state, roleId: string) => ({
                ...state,
    roleId,
  }))


  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

readonly featurePermissionId$ = this.select((s) => s.featurePermissionId)

readonly roleId$ = this.select((s) => s.roleId)

roles$ = this.roleStore.roles$
  readonly data$ = this.select((s) => s.data)

  readonly sortSettings$ = this.select((s) => s.sortSettings)
  readonly filterSettings$ = this.select((s) => s.filterSettings)

  readonly input$ = this.select(this.paging$, this.featurePermissionId$,
this.roleId$, this.searchQuery$, (paging, featurePermissionId,
roleId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    featurePermissionId: featurePermissionId,roleId: roleId,
    total: paging.total
  }))

readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.featurePermissionId$,
this.roleId$,
    this.data$,
this.roles$,
    (paging, errors, loading, searchFocused, searchQuery, featurePermissionId,
roleId, data ,roles) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      featurePermissionId,
roleId,
      data,
      roles
    }),
  )

    addRoleFeaturePermissions = this.updater((state, roleFeaturePermissions: any[]) => ({...state, data: state.data.concat(roleFeaturePermissions) }))
    updateRoleFeaturePermissions = this.updater((state, roleFeaturePermissions: any[]) => {
        return {
            ...state,
            data: state.data.map((roleFeaturePermission) => {
            const updated = roleFeaturePermissions.find((el) => el.id === roleFeaturePermission.id);
            return updated ? updated : roleFeaturePermission;
            })
        }
    })

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        const roles = vm.roles;
        return this.roleFeaturePermissionService.validateRoleFeaturePermissionExcelData(excelData,[],roles);
      })
    )
  }


  readonly loadRoleFeaturePermissionsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRoleFeaturePermissions({input}).pipe(
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

readonly importExcelEffect = this.effect<UserUpdateRoleFeaturePermissionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.roleFeaturePermissionService.importRoleFeaturePermissions(data).pipe(
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

            this.addRoleFeaturePermissions(created);
            this.updateRoleFeaturePermissions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )
}

