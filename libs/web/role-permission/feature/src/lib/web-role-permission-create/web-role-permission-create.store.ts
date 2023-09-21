
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateRolePermissionInput, WebCoreDataAccessService, RolePermission, Permission } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { RolePermissionService } from '@case-clinical/web/role-permission/shared'

export interface RolePermissionCreateState {
  errors?: any
  loading?: boolean
  item?: RolePermission,
 permissions?: Permission[]
  searchTerm?: string
}

@Injectable()
export class WebRolePermissionCreateStore extends ComponentStore<RolePermissionCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly rolePermissionService: RolePermissionService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly permissions$ = this.select((s) => s.permissions || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.permissions$,
    (errors, loading, item, permissions ) => ({
    errors,
    loading,
    item,
permissions
  }),
{debounce: true})



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

    

  readonly createRolePermissionEffect = this.effect<UserCreateRolePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.rolePermissionService.createRolePermission({...input}).pipe(
          tapResponse(
            (rolePermission: RolePermission) => {
              this.patchState({ item: rolePermission, loading: false })
              return this.router.navigate(['..', rolePermission?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
