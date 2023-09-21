
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, RolePermission, UserCreateRolePermissionInput, Role,Permission } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RolePermissionFormState {
  errors?: any
  loading?: boolean
  item?: RolePermission,
 roles?: Role[],
 permissions?: Permission[]
  searchTerm?: string
}

@Injectable()
export class WebRolePermissionFormStore extends ComponentStore<RolePermissionFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly roles$ = this.select((s) => s.roles || [])
  readonly permissions$ = this.select((s) => s.permissions || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.roles$,this.permissions$,
    (errors, loading, item, roles,permissions ) => ({
    errors,
    loading,
    item,
roles,permissions
  }),
{debounce: true})



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



  readonly createRolePermissionEffect = this.effect<UserCreateRolePermissionInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateRolePermission({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addRole = this.updater((state, role: Role) => ({
    ...state, roles: state.roles.concat(role)
  }))


  readonly addPermission = this.updater((state, permission: Permission) => ({
    ...state, permissions: state.permissions.concat(permission)
  }))

}
