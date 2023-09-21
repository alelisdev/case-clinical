
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, UserRole, UserCreateUserRoleInput, Role,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserRoleFormState {
  errors?: any
  loading?: boolean
  item?: UserRole,
 roles?: Role[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebUserRoleFormStore extends ComponentStore<UserRoleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly roles$ = this.select((s) => s.roles || [])
  readonly users$ = this.select((s) => s.users || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.roles$,this.users$,
    (errors, loading, item, roles,users ) => ({
    errors,
    loading,
    item,
roles,users
  }),
{debounce: true})



  readonly filterRoles = (term) => 
        this.data.userRoles({input: { name: term}}).pipe(
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


  readonly filterUsers = (term) => 
        this.data.userUsers({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let users = res.data.items;
              this.patchState({users})
              return users
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



  readonly createUserRoleEffect = this.effect<UserCreateUserRoleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateUserRole({ input }).pipe(
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


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

}
