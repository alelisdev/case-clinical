
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContractedRateKindInput,
  UserUpdateContractedRateKindInput,
  ContractedRateKind,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractedRateKindFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contractedRateKinds: ContractedRateKind[]
}

@Injectable()
export class WebContractedRateKindSelectFormStore extends ComponentStore<ContractedRateKindFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contractedRateKinds: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contractedRateKinds$ = this.select((s) => s.contractedRateKinds)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contractedRateKinds$,
    (errors, loading, contractedRateKinds) => ({
      errors,
      loading,
      contractedRateKinds
    }),
    { debounce: true },
  )

  addNewContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => ({ contractedRateKinds: [...state.contractedRateKinds, contractedRateKind] }))

  updateContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => {
    return {
      ...state,
      contractedRateKinds: state.contractedRateKinds.map((el) => {
        if (el.id === contractedRateKind.id) {
          return contractedRateKind
        } else {
          return el
        }
      }),
    }
  })

  readonly createContractedRateKindEffect = this.effect<{ input: UserCreateContractedRateKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContractedRateKind({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContractedRateKind(res.data.created)
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

  readonly updateContractedRateKindEffect = this.effect<{ input: UserUpdateContractedRateKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContractedRateKind({ contractedRateKindId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContractedRateKind(res.data.updated)
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

  loadContractedRateKindsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContractedRateKinds({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contractedRateKinds: data.data.items,
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

