
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthorizationImplantInput,
  UserUpdatePriorAuthorizationImplantInput,
  PriorAuthorizationImplant,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationImplantFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthorizationImplants: PriorAuthorizationImplant[]
}

@Injectable()
export class WebPriorAuthorizationImplantSelectFormStore extends ComponentStore<PriorAuthorizationImplantFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthorizationImplants: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthorizationImplants$ = this.select((s) => s.priorAuthorizationImplants)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthorizationImplants$,
    (errors, loading, priorAuthorizationImplants) => ({
      errors,
      loading,
      priorAuthorizationImplants
    }),
    { debounce: true },
  )

  addNewPriorAuthorizationImplant = this.updater((state, priorAuthorizationImplant: PriorAuthorizationImplant) => ({ priorAuthorizationImplants: [...state.priorAuthorizationImplants, priorAuthorizationImplant] }))

  updatePriorAuthorizationImplant = this.updater((state, priorAuthorizationImplant: PriorAuthorizationImplant) => {
    return {
      ...state,
      priorAuthorizationImplants: state.priorAuthorizationImplants.map((el) => {
        if (el.id === priorAuthorizationImplant.id) {
          return priorAuthorizationImplant
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthorizationImplantEffect = this.effect<{ input: UserCreatePriorAuthorizationImplantInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthorizationImplant({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthorizationImplant(res.data.created)
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

  readonly updatePriorAuthorizationImplantEffect = this.effect<{ input: UserUpdatePriorAuthorizationImplantInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthorizationImplant({ priorAuthorizationImplantId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthorizationImplant(res.data.updated)
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

  loadPriorAuthorizationImplantsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthorizationImplants({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthorizationImplants: data.data.items,
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

