
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAuthorizationStatusInput,
  UserUpdateAuthorizationStatusInput,
  AuthorizationStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AuthorizationStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  authorizationStatuses: AuthorizationStatus[]
}

@Injectable()
export class WebAuthorizationStatusSelectFormStore extends ComponentStore<AuthorizationStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      authorizationStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly authorizationStatuses$ = this.select((s) => s.authorizationStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.authorizationStatuses$,
    (errors, loading, authorizationStatuses) => ({
      errors,
      loading,
      authorizationStatuses
    }),
    { debounce: true },
  )

  addNewAuthorizationStatus = this.updater((state, authorizationStatus: AuthorizationStatus) => ({ authorizationStatuses: [...state.authorizationStatuses, authorizationStatus] }))

  updateAuthorizationStatus = this.updater((state, authorizationStatus: AuthorizationStatus) => {
    return {
      ...state,
      authorizationStatuses: state.authorizationStatuses.map((el) => {
        if (el.id === authorizationStatus.id) {
          return authorizationStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createAuthorizationStatusEffect = this.effect<{ input: UserCreateAuthorizationStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAuthorizationStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAuthorizationStatus(res.data.created)
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

  readonly updateAuthorizationStatusEffect = this.effect<{ input: UserUpdateAuthorizationStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAuthorizationStatus({ authorizationStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAuthorizationStatus(res.data.updated)
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

  loadAuthorizationStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAuthorizationStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                authorizationStatuses: data.data.items,
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

