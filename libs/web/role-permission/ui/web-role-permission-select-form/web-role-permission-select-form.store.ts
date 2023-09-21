
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateRolePermissionInput,
  UserUpdateRolePermissionInput,
  RolePermission,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RolePermissionFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  rolePermissions: RolePermission[]
}

@Injectable()
export class WebRolePermissionSelectFormStore extends ComponentStore<RolePermissionFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      rolePermissions: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly rolePermissions$ = this.select((s) => s.rolePermissions)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.rolePermissions$,
    (errors, loading, rolePermissions) => ({
      errors,
      loading,
      rolePermissions
    }),
    { debounce: true },
  )

  addNewRolePermission = this.updater((state, rolePermission: RolePermission) => ({ rolePermissions: [...state.rolePermissions, rolePermission] }))

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

  readonly createRolePermissionEffect = this.effect<{ input: UserCreateRolePermissionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateRolePermission({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewRolePermission(res.data.created)
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

  readonly updateRolePermissionEffect = this.effect<{ input: UserUpdateRolePermissionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateRolePermission({ rolePermissionId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateRolePermission(res.data.updated)
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

  loadRolePermissionsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userRolePermissions({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                rolePermissions: data.data.items,
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

