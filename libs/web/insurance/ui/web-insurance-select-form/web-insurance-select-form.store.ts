
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateInsuranceInput,
  UserUpdateInsuranceInput,
  Insurance,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface InsuranceFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  insurances: Insurance[]
}

@Injectable()
export class WebInsuranceSelectFormStore extends ComponentStore<InsuranceFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      insurances: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly insurances$ = this.select((s) => s.insurances)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.insurances$,
    (errors, loading, insurances) => ({
      errors,
      loading,
      insurances
    }),
    { debounce: true },
  )

  addNewInsurance = this.updater((state, insurance: Insurance) => ({ insurances: [...state.insurances, insurance] }))

  updateInsurance = this.updater((state, insurance: Insurance) => {
    return {
      ...state,
      insurances: state.insurances.map((el) => {
        if (el.id === insurance.id) {
          return insurance
        } else {
          return el
        }
      }),
    }
  })

  readonly createInsuranceEffect = this.effect<{ input: UserCreateInsuranceInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateInsurance({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewInsurance(res.data.created)
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

  readonly updateInsuranceEffect = this.effect<{ input: UserUpdateInsuranceInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateInsurance({ insuranceId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateInsurance(res.data.updated)
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

  loadInsurancesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userInsurances({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                insurances: data.data.items,
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

