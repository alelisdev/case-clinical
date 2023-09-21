
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateIntegrationInput,
  UserUpdateIntegrationInput,
  Integration,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface IntegrationFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  integrations: Integration[]
}

@Injectable()
export class WebIntegrationSelectFormStore extends ComponentStore<IntegrationFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      integrations: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly integrations$ = this.select((s) => s.integrations)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.integrations$,
    (errors, loading, integrations) => ({
      errors,
      loading,
      integrations
    }),
    { debounce: true },
  )

  addNewIntegration = this.updater((state, integration: Integration) => ({ integrations: [...state.integrations, integration] }))

  updateIntegration = this.updater((state, integration: Integration) => {
    return {
      ...state,
      integrations: state.integrations.map((el) => {
        if (el.id === integration.id) {
          return integration
        } else {
          return el
        }
      }),
    }
  })

  readonly createIntegrationEffect = this.effect<{ input: UserCreateIntegrationInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateIntegration({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewIntegration(res.data.created)
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

  readonly updateIntegrationEffect = this.effect<{ input: UserUpdateIntegrationInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateIntegration({ integrationId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateIntegration(res.data.updated)
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

  loadIntegrationsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userIntegrations({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                integrations: data.data.items,
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

