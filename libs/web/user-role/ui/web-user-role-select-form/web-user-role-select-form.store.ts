
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateUserRoleInput,
  UserUpdateUserRoleInput,
  UserRole,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface UserRoleFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  userRoles: UserRole[]
}

@Injectable()
export class WebUserRoleSelectFormStore extends ComponentStore<UserRoleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      userRoles: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly userRoles$ = this.select((s) => s.userRoles)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.userRoles$,
    (errors, loading, userRoles) => ({
      errors,
      loading,
      userRoles
    }),
    { debounce: true },
  )

  addNewUserRole = this.updater((state, userRole: UserRole) => ({ userRoles: [...state.userRoles, userRole] }))

  updateUserRole = this.updater((state, userRole: UserRole) => {
    return {
      ...state,
      userRoles: state.userRoles.map((el) => {
        if (el.id === userRole.id) {
          return userRole
        } else {
          return el
        }
      }),
    }
  })

  readonly createUserRoleEffect = this.effect<{ input: UserCreateUserRoleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateUserRole({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewUserRole(res.data.created)
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

  readonly updateUserRoleEffect = this.effect<{ input: UserUpdateUserRoleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateUserRole({ userRoleId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateUserRole(res.data.updated)
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

  loadUserRolesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userUserRoles({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                userRoles: data.data.items,
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

