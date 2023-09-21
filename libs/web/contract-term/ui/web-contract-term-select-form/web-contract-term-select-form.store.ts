
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateContractTermInput,
  UserUpdateContractTermInput,
  ContractTerm,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractTermFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  contractTerms: ContractTerm[]
}

@Injectable()
export class WebContractTermSelectFormStore extends ComponentStore<ContractTermFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      contractTerms: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly contractTerms$ = this.select((s) => s.contractTerms)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.contractTerms$,
    (errors, loading, contractTerms) => ({
      errors,
      loading,
      contractTerms
    }),
    { debounce: true },
  )

  addNewContractTerm = this.updater((state, contractTerm: ContractTerm) => ({ contractTerms: [...state.contractTerms, contractTerm] }))

  updateContractTerm = this.updater((state, contractTerm: ContractTerm) => {
    return {
      ...state,
      contractTerms: state.contractTerms.map((el) => {
        if (el.id === contractTerm.id) {
          return contractTerm
        } else {
          return el
        }
      }),
    }
  })

  readonly createContractTermEffect = this.effect<{ input: UserCreateContractTermInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateContractTerm({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewContractTerm(res.data.created)
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

  readonly updateContractTermEffect = this.effect<{ input: UserUpdateContractTermInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateContractTerm({ contractTermId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateContractTerm(res.data.updated)
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

  loadContractTermsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userContractTerms({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                contractTerms: data.data.items,
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

