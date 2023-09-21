
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RoleFeaturePermissionService } from './role-feature-permission.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRoleFeaturePermissionInput, UserUpdateRoleFeaturePermissionInput, WebCoreDataAccessService, CorePaging, RoleFeaturePermission, FeaturePermission,Role } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RoleFeaturePermissionFeatureState {
  errors?: any
  loading?: boolean
  item?: RoleFeaturePermission
  done: boolean
  roleFeaturePermissions: RoleFeaturePermission[]
 featurePermissions?: FeaturePermission[],
 roles?: Role[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRoleFeaturePermissionFeatureStore extends ComponentStore<RoleFeaturePermissionFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly roleFeaturePermissionService: RoleFeaturePermissionService
) {
    super({ 
      loading: false,
      roleFeaturePermissions: [],
      done: false,
      searchQuery: '',
      paging: {
        limit: 10000,
        skip: 0,
      },
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly roleFeaturePermissions$ = this.select((s) => s.roleFeaturePermissions)
  readonly featurePermissions$ = this.select((s) => s.featurePermissions || [])
  readonly roles$ = this.select((s) => s.roles || [])
  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.roleFeaturePermissions$,
this.featurePermissions$,this.roles$,
    (errors, loading, item, roleFeaturePermissions, featurePermissions,roles ) => ({
    errors,
    loading,
    item,
    roleFeaturePermissions,
featurePermissions,roles
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    total: paging.total
  }))


  readonly filterFeaturePermissions = (term) => 
        this.data.userSelectFeaturePermissions({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let featurePermissions = res.data.items;
              this.patchState({featurePermissions})
              return featurePermissions
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


  readonly filterRoles = (term) => 
        this.data.userSelectRoles({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let roles = res.data.items;
              this.patchState({roles})
              return roles
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



  readonly addFeaturePermission = this.updater((state, featurePermission: FeaturePermission) => ({
    ...state, featurePermissions: state.featurePermissions.concat(featurePermission)
  }))


  readonly addRole = this.updater((state, role: Role) => ({
    ...state, roles: state.roles.concat(role)
  }))

    

  addNewRoleFeaturePermission = this.updater((state, roleFeaturePermission: RoleFeaturePermission) => ({ ...state, roleFeaturePermissions: [...state.roleFeaturePermissions, roleFeaturePermission] }))

  updateRoleFeaturePermission = this.updater((state, roleFeaturePermission: RoleFeaturePermission) => {
    return {
      ...state,
      roleFeaturePermissions: state.roleFeaturePermissions.map((el) => {
        if (el.id === roleFeaturePermission.id) {
          return roleFeaturePermission
        } else {
          return el
        }
      }),
    }
  })

  addRoleFeaturePermissions = this.updater((state, newRoleFeaturePermissions: any[]) => ({...state, roleFeaturePermissions: state.roleFeaturePermissions.concat(newRoleFeaturePermissions) }))
  updateRoleFeaturePermissions = this.updater((state, updatedRoleFeaturePermissions: any[]) => {
    return {
      ...state,
      roleFeaturePermissions: state.roleFeaturePermissions.map((roleFeaturePermission) => {
        const updated = updatedRoleFeaturePermissions.find((el) => el.id === roleFeaturePermission.id);
        return updated ? updated : roleFeaturePermission;
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
        return this.roleFeaturePermissionService.validateRoleFeaturePermissionExcelData(excelData, vm.featurePermissions,vm.roles);
      })
    )
  }

  readonly loadRoleFeaturePermissionEffect = this.effect<string>((roleFeaturePermissionId$) =>
    roleFeaturePermissionId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((roleFeaturePermissionId) =>
        this.data.userRoleFeaturePermission({ roleFeaturePermissionId }).pipe(
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

  readonly loadRoleFeaturePermissionsEffect = this.effect(($) =>
        $.pipe(
          tap(() => { this.patchState({ loading: true }) }),
          withLatestFrom(this.input$),
          switchMap(([_, input]) =>
            this.data.userRoleFeaturePermissions({ input }).pipe(
              tapResponse(
                (res) => {
                  this.patchState({
                    paging: { limit: input.limit, skip: input.skip, total: res.data.count.total },
                    roleFeaturePermissions: res.data.items,
                    errors: res.errors,
                    loading: false,
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

  readonly createRoleFeaturePermissionEffect = this.effect<UserCreateRoleFeaturePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.roleFeaturePermissionService.createRoleFeaturePermission({...input }).pipe(
          tapResponse(
            (roleFeaturePermission: RoleFeaturePermission) => {
              this.addNewRoleFeaturePermission(roleFeaturePermission)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: roleFeaturePermission, loading: false, done: true }), 300);
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

    readonly updateRoleFeaturePermissionEffect = this.effect<UserUpdateRoleFeaturePermissionInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.roleFeaturePermissionService.updateRoleFeaturePermission(input, input.id).pipe(
              tapResponse(
                (roleFeaturePermission) => {
                  this.updateRoleFeaturePermission(roleFeaturePermission)
                  this.toast.success('Updated Successfully')
                  setTimeout(() => this.patchState({item: roleFeaturePermission, loading: false, done: true }), 300);
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
  
    readonly deleteRoleFeaturePermissionEffect = this.effect<RoleFeaturePermission>(
    (roleFeaturePermission$) =>
      roleFeaturePermission$.pipe(
        switchMap((roleFeaturePermission) =>
          this.data
            .userDeleteRoleFeaturePermission({
                roleFeaturePermissionId: roleFeaturePermission.id,
            })
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
            ),
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateRoleFeaturePermissionInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.roleFeaturePermissionService.importRoleFeaturePermissions(data).pipe(
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

            this.addRoleFeaturePermissions(created);
            this.updateRoleFeaturePermissions(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
