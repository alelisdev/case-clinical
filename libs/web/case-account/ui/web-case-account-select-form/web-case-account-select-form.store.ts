
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCaseAccountInput,
  UserUpdateCaseAccountInput,
  CaseAccount,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseAccountFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  caseAccounts: CaseAccount[]
}

@Injectable()
export class WebCaseAccountSelectFormStore extends ComponentStore<CaseAccountFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      caseAccounts: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly caseAccounts$ = this.select((s) => s.caseAccounts)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.caseAccounts$,
    (errors, loading, caseAccounts) => ({
      errors,
      loading,
      caseAccounts
    }),
    { debounce: true },
  )

  addNewCaseAccount = this.updater((state, caseAccount: CaseAccount) => ({ caseAccounts: [...state.caseAccounts, caseAccount] }))

  updateCaseAccount = this.updater((state, caseAccount: CaseAccount) => {
    return {
      ...state,
      caseAccounts: state.caseAccounts.map((el) => {
        if (el.id === caseAccount.id) {
          return caseAccount
        } else {
          return el
        }
      }),
    }
  })

  readonly createCaseAccountEffect = this.effect<{ input: UserCreateCaseAccountInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCaseAccount({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCaseAccount(res.data.created)
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

  readonly updateCaseAccountEffect = this.effect<{ input: UserUpdateCaseAccountInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCaseAccount({ caseAccountId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCaseAccount(res.data.updated)
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

  loadCaseAccountsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCaseAccounts({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                caseAccounts: data.data.items,
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

