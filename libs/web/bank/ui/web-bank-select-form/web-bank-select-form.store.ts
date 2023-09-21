
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateBankInput,
  UserUpdateBankInput,
  Bank,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface BankFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  banks: Bank[]
}

@Injectable()
export class WebBankSelectFormStore extends ComponentStore<BankFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      banks: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly banks$ = this.select((s) => s.banks)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.banks$,
    (errors, loading, banks) => ({
      errors,
      loading,
      banks
    }),
    { debounce: true },
  )

  addNewBank = this.updater((state, bank: Bank) => ({ banks: [...state.banks, bank] }))

  updateBank = this.updater((state, bank: Bank) => {
    return {
      ...state,
      banks: state.banks.map((el) => {
        if (el.id === bank.id) {
          return bank
        } else {
          return el
        }
      }),
    }
  })

  readonly createBankEffect = this.effect<{ input: UserCreateBankInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateBank({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewBank(res.data.created)
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

  readonly updateBankEffect = this.effect<{ input: UserUpdateBankInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateBank({ bankId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateBank(res.data.updated)
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

  loadBanksEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userBanks({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                banks: data.data.items,
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

