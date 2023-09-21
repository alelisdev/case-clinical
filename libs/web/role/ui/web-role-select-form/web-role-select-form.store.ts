
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateRoleInput,
  UserUpdateRoleInput,
  Role,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RoleFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  roles: Role[]
}

@Injectable()
export class WebRoleSelectFormStore extends ComponentStore<RoleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      roles: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly roles$ = this.select((s) => s.roles)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.roles$,
    (errors, loading, roles) => ({
      errors,
      loading,
      roles
    }),
    { debounce: true },
  )

  addNewRole = this.updater((state, role: Role) => ({ roles: [...state.roles, role] }))

  updateRole = this.updater((state, role: Role) => {
    return {
      ...state,
      roles: state.roles.map((el) => {
        if (el.id === role.id) {
          return role
        } else {
          return el
        }
      }),
    }
  })

  readonly createRoleEffect = this.effect<{ input: UserCreateRoleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateRole({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewRole(res.data.created)
                this.patchState({
                  errors: res.errors,
                  loading: false,
                })
                data.resultEmitter.emit(res.data.created)
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

  readonly updateRoleEffect = this.effect<{ input: UserUpdateRoleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateRole({ roleId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateRole(res.data.updated)
                this.patchState({ errors: res.errors, loading: false })
                data.resultEmitter.emit(res.data.updated)
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

  loadRolesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userRoles({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                roles: data.data.items,
              })
            },
            (error) => {
              this.patchState({
                loading: false,
              })
            },
          ),
        ),
      ),
    ),
  )
}

