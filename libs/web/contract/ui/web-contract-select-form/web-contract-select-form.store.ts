
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContractInput,
  UserUpdateContractInput,
  Contract,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contracts: Contract[]
}

@Injectable()
export class WebContractSelectFormStore extends ComponentStore<ContractFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contracts: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contracts$ = this.select((s) => s.contracts)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contracts$,
    (errors, loading, contracts) => ({
      errors,
      loading,
      contracts
    }),
    { debounce: true },
  )

  addNewContract = this.updater((state, contract: Contract) => ({ contracts: [...state.contracts, contract] }))

  updateContract = this.updater((state, contract: Contract) => {
    return {
      ...state,
      contracts: state.contracts.map((el) => {
        if (el.id === contract.id) {
          return contract
        } else {
          return el
        }
      }),
    }
  })

  readonly createContractEffect = this.effect<{ input: UserCreateContractInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContract({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContract(res.data.created)
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

  readonly updateContractEffect = this.effect<{ input: UserUpdateContractInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContract({ contractId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContract(res.data.updated)
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

  loadContractsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContracts({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contracts: data.data.items,
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

