
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContractedRateInput,
  UserUpdateContractedRateInput,
  ContractedRate,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractedRateFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contractedRates: ContractedRate[]
}

@Injectable()
export class WebContractedRateSelectFormStore extends ComponentStore<ContractedRateFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contractedRates: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contractedRates$ = this.select((s) => s.contractedRates)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contractedRates$,
    (errors, loading, contractedRates) => ({
      errors,
      loading,
      contractedRates
    }),
    { debounce: true },
  )

  addNewContractedRate = this.updater((state, contractedRate: ContractedRate) => ({ contractedRates: [...state.contractedRates, contractedRate] }))

  updateContractedRate = this.updater((state, contractedRate: ContractedRate) => {
    return {
      ...state,
      contractedRates: state.contractedRates.map((el) => {
        if (el.id === contractedRate.id) {
          return contractedRate
        } else {
          return el
        }
      }),
    }
  })

  readonly createContractedRateEffect = this.effect<{ input: UserCreateContractedRateInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContractedRate({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContractedRate(res.data.created)
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

  readonly updateContractedRateEffect = this.effect<{ input: UserUpdateContractedRateInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContractedRate({ contractedRateId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContractedRate(res.data.updated)
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

  loadContractedRatesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContractedRates({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contractedRates: data.data.items,
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

