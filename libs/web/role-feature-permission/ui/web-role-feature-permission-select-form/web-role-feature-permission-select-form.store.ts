
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateRoleFeaturePermissionInput,
  UserUpdateRoleFeaturePermissionInput,
  RoleFeaturePermission,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface RoleFeaturePermissionFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  roleFeaturePermissions: RoleFeaturePermission[]
}

@Injectable()
export class WebRoleFeaturePermissionSelectFormStore extends ComponentStore<RoleFeaturePermissionFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      roleFeaturePermissions: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly roleFeaturePermissions$ = this.select((s) => s.roleFeaturePermissions)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.roleFeaturePermissions$,
    (errors, loading, roleFeaturePermissions) => ({
      errors,
      loading,
      roleFeaturePermissions
    }),
    { debounce: true },
  )

  addNewRoleFeaturePermission = this.updater((state, roleFeaturePermission: RoleFeaturePermission) => ({ roleFeaturePermissions: [...state.roleFeaturePermissions, roleFeaturePermission] }))

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

  readonly createRoleFeaturePermissionEffect = this.effect<{ input: UserCreateRoleFeaturePermissionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateRoleFeaturePermission({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewRoleFeaturePermission(res.data.created)
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

  readonly updateRoleFeaturePermissionEffect = this.effect<{ input: UserUpdateRoleFeaturePermissionInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateRoleFeaturePermission({ roleFeaturePermissionId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateRoleFeaturePermission(res.data.updated)
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

  loadRoleFeaturePermissionsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userRoleFeaturePermissions({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                roleFeaturePermissions: data.data.items,
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

