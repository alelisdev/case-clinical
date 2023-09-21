
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthDmeInput,
  UserUpdatePriorAuthDmeInput,
  PriorAuthDme,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthDmeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthDmes: PriorAuthDme[]
}

@Injectable()
export class WebPriorAuthDmeSelectFormStore extends ComponentStore<PriorAuthDmeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthDmes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthDmes$ = this.select((s) => s.priorAuthDmes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthDmes$,
    (errors, loading, priorAuthDmes) => ({
      errors,
      loading,
      priorAuthDmes
    }),
    { debounce: true },
  )

  addNewPriorAuthDme = this.updater((state, priorAuthDme: PriorAuthDme) => ({ priorAuthDmes: [...state.priorAuthDmes, priorAuthDme] }))

  updatePriorAuthDme = this.updater((state, priorAuthDme: PriorAuthDme) => {
    return {
      ...state,
      priorAuthDmes: state.priorAuthDmes.map((el) => {
        if (el.id === priorAuthDme.id) {
          return priorAuthDme
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthDmeEffect = this.effect<{ input: UserCreatePriorAuthDmeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthDme({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthDme(res.data.created)
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

  readonly updatePriorAuthDmeEffect = this.effect<{ input: UserUpdatePriorAuthDmeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthDme({ priorAuthDmeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthDme(res.data.updated)
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

  loadPriorAuthDmesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthDmes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthDmes: data.data.items,
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

