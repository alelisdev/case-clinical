
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAuthorizationKindInput,
  UserUpdateAuthorizationKindInput,
  AuthorizationKind,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AuthorizationKindFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  authorizationKinds: AuthorizationKind[]
}

@Injectable()
export class WebAuthorizationKindSelectFormStore extends ComponentStore<AuthorizationKindFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      authorizationKinds: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly authorizationKinds$ = this.select((s) => s.authorizationKinds)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.authorizationKinds$,
    (errors, loading, authorizationKinds) => ({
      errors,
      loading,
      authorizationKinds
    }),
    { debounce: true },
  )

  addNewAuthorizationKind = this.updater((state, authorizationKind: AuthorizationKind) => ({ authorizationKinds: [...state.authorizationKinds, authorizationKind] }))

  updateAuthorizationKind = this.updater((state, authorizationKind: AuthorizationKind) => {
    return {
      ...state,
      authorizationKinds: state.authorizationKinds.map((el) => {
        if (el.id === authorizationKind.id) {
          return authorizationKind
        } else {
          return el
        }
      }),
    }
  })

  readonly createAuthorizationKindEffect = this.effect<{ input: UserCreateAuthorizationKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAuthorizationKind({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAuthorizationKind(res.data.created)
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

  readonly updateAuthorizationKindEffect = this.effect<{ input: UserUpdateAuthorizationKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAuthorizationKind({ authorizationKindId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAuthorizationKind(res.data.updated)
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

  loadAuthorizationKindsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAuthorizationKinds({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                authorizationKinds: data.data.items,
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

