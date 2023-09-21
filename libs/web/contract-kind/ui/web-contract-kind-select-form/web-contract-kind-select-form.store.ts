
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContractKindInput,
  UserUpdateContractKindInput,
  ContractKind,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractKindFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contractKinds: ContractKind[]
}

@Injectable()
export class WebContractKindSelectFormStore extends ComponentStore<ContractKindFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contractKinds: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contractKinds$ = this.select((s) => s.contractKinds)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contractKinds$,
    (errors, loading, contractKinds) => ({
      errors,
      loading,
      contractKinds
    }),
    { debounce: true },
  )

  addNewContractKind = this.updater((state, contractKind: ContractKind) => ({ contractKinds: [...state.contractKinds, contractKind] }))

  updateContractKind = this.updater((state, contractKind: ContractKind) => {
    return {
      ...state,
      contractKinds: state.contractKinds.map((el) => {
        if (el.id === contractKind.id) {
          return contractKind
        } else {
          return el
        }
      }),
    }
  })

  readonly createContractKindEffect = this.effect<{ input: UserCreateContractKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContractKind({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContractKind(res.data.created)
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

  readonly updateContractKindEffect = this.effect<{ input: UserUpdateContractKindInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContractKind({ contractKindId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContractKind(res.data.updated)
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

  loadContractKindsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContractKinds({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contractKinds: data.data.items,
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

