
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RolePermissionService } from './role-permission.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRolePermissionInput, UserUpdateRolePermissionInput, WebCoreDataAccessService, CorePaging, RolePermission, Permission } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RolePermissionFeatureState {
  errors?: any
  loading?: boolean
  item?: RolePermission
  done: boolean,
  formName?: string
permissionId?: string,
  rolePermissions: RolePermission[]
 permissions?: Permission[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRolePermissionFeatureStore extends ComponentStore<RolePermissionFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly rolePermissionService: RolePermissionService
) {
    super({ 
      loading: false,
      rolePermissions: [],
      done: false,
      searchQuery: '',
      formName: undefined,
permissionId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('rolePermissionId')) {
      var rolePermissionId = this.route.snapshot.paramMap.get('rolePermissionId')
      this.setFormName('rolePermission_edit')
    } else {
      this.setFormName('rolePermission_create')
    }


    if(this.route.snapshot.paramMap.has("permissionId")) {
      var permissionId = this.route.snapshot.paramMap.get("permissionId")
      this.setPermissionId(permissionId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly rolePermissions$ = this.select((s) => s.rolePermissions)
  readonly permissions$ = this.select((s) => s.permissions || [])

readonly permissionId$ = this.select((s) => s.permissionId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.rolePermissions$,
this.permissions$,
    (errors, loading, item, formName, rolePermissions, permissions ) => ({
    errors,
    loading,
    item,
    formName,
    rolePermissions,

            permissions
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.permissionId$, this.searchQuery$, (paging, permissionId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    permissionId: permissionId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setPermissionId = this.updater((state, permissionId: string) => ({
                ...state,
    permissionId,
  }))



  readonly filterPermissions = (term) => 
        this.data.userSelectPermissions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let permissions = res.data.items;
              this.patchState({permissions})
              return permissions
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addPermission = this.updater((state, permission: Permission) => ({
    ...state, permissions: state.permissions.concat(permission)
  }))

    

  readonly setItem = this.updater((state, item: RolePermission) => ({...state, item}))

  addNewRolePermission = this.updater((state, rolePermission: RolePermission) => ({ ...state, rolePermissions: [...state.rolePermissions, rolePermission] }))

  updateRolePermission = this.updater((state, rolePermission: RolePermission) => {
    return {
      ...state,
      rolePermissions: state.rolePermissions.map((el) => {
        if (el.id === rolePermission.id) {
          return rolePermission
        } else {
          return el
        }
      }),
    }
  })

  addRolePermissions = this.updater((state, newRolePermissions: any[]) => ({...state, rolePermissions: state.rolePermissions.concat(newRolePermissions) }))
  updateRolePermissions = this.updater((state, updatedRolePermissions: any[]) => {
    return {
      ...state,
      rolePermissions: state.rolePermissions.map((rolePermission) => {
        const updated = updatedRolePermissions.find((el) => el.id === rolePermission.id);
        return updated ? updated : rolePermission;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.rolePermissionService.validateRolePermissionExcelData(excelData, vm.permissions);
      })
    )
  }


  readonly loadRolePermissionEffect = this.effect<string>((rolePermissionId$) =>
    rolePermissionId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((rolePermissionId) =>
        this.data.userRolePermission({ rolePermissionId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
            },
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
                rolePermissions: res.data.items,
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

  readonly createRolePermissionEffect = this.effect<UserCreateRolePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.rolePermissionService.createRolePermission({...input }).pipe(
          tapResponse(
            (rolePermission: RolePermission) => {
              this.addNewRolePermission(rolePermission)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: rolePermission, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updateRolePermissionEffect = this.effect<UserUpdateRolePermissionInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.rolePermissionService.updateRolePermission(input, input.id).pipe(
              tapResponse(
                (rolePermission) => {
                  this.updateRolePermission(rolePermission)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: rolePermission, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteRolePermissionEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, rolePermission]) => {
          return this.data.userDeleteRolePermission({rolePermissionId: rolePermission.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateRolePermissionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.rolePermissionService.importRolePermissions(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
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
