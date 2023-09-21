
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateUserRoleInput, WebCoreDataAccessService, UserRole, Role,User } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { UserRoleService } from '@case-clinical/web/user-role/shared'

export interface UserRoleCreateState {
  errors?: any
  loading?: boolean
  item?: UserRole,
 roles?: Role[],
 users?: User[]
  searchTerm?: string
}

@Injectable()
export class WebUserRoleCreateStore extends ComponentStore<UserRoleCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly userRoleService: UserRoleService
) {
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


  readonly filterUsers = (term) => 
        this.data.userSelectUsers({input: { name: term}}).pipe(
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



  readonly addRole = this.updater((state, role: Role) => ({
    ...state, roles: state.roles.concat(role)
  }))


  readonly addUser = this.updater((state, user: User) => ({
    ...state, users: state.users.concat(user)
  }))

    

  readonly createUserRoleEffect = this.effect<UserCreateUserRoleInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.userRoleService.createUserRole({...input}).pipe(
          tapResponse(
            (userRole: UserRole) => {
              this.patchState({ item: userRole, loading: false })
              return this.router.navigate(['..', userRole?.id], {relativeTo: this.route})
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
