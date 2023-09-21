
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateHealthInsuranceInput,
  UserUpdateHealthInsuranceInput,
  HealthInsurance,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface HealthInsuranceFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  healthInsurances: HealthInsurance[]
}

@Injectable()
export class WebHealthInsuranceSelectFormStore extends ComponentStore<HealthInsuranceFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      healthInsurances: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly healthInsurances$ = this.select((s) => s.healthInsurances)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.healthInsurances$,
    (errors, loading, healthInsurances) => ({
      errors,
      loading,
      healthInsurances
    }),
    { debounce: true },
  )

  addNewHealthInsurance = this.updater((state, healthInsurance: HealthInsurance) => ({ healthInsurances: [...state.healthInsurances, healthInsurance] }))

  updateHealthInsurance = this.updater((state, healthInsurance: HealthInsurance) => {
    return {
      ...state,
      healthInsurances: state.healthInsurances.map((el) => {
        if (el.id === healthInsurance.id) {
          return healthInsurance
        } else {
          return el
        }
      }),
    }
  })

  readonly createHealthInsuranceEffect = this.effect<{ input: UserCreateHealthInsuranceInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateHealthInsurance({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewHealthInsurance(res.data.created)
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

  readonly updateHealthInsuranceEffect = this.effect<{ input: UserUpdateHealthInsuranceInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateHealthInsurance({ healthInsuranceId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateHealthInsurance(res.data.updated)
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

  loadHealthInsurancesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userHealthInsurances({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                healthInsurances: data.data.items,
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

