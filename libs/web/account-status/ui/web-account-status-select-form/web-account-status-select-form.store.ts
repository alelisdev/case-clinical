
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAccountStatusInput,
  UserUpdateAccountStatusInput,
  AccountStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AccountStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  accountStatuses: AccountStatus[]
}

@Injectable()
export class WebAccountStatusSelectFormStore extends ComponentStore<AccountStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      accountStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly accountStatuses$ = this.select((s) => s.accountStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.accountStatuses$,
    (errors, loading, accountStatuses) => ({
      errors,
      loading,
      accountStatuses
    }),
    { debounce: true },
  )

  addNewAccountStatus = this.updater((state, accountStatus: AccountStatus) => ({ accountStatuses: [...state.accountStatuses, accountStatus] }))

  updateAccountStatus = this.updater((state, accountStatus: AccountStatus) => {
    return {
      ...state,
      accountStatuses: state.accountStatuses.map((el) => {
        if (el.id === accountStatus.id) {
          return accountStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createAccountStatusEffect = this.effect<{ input: UserCreateAccountStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAccountStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAccountStatus(res.data.created)
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

  readonly updateAccountStatusEffect = this.effect<{ input: UserUpdateAccountStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAccountStatus({ accountStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAccountStatus(res.data.updated)
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

  loadAccountStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAccountStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                accountStatuses: data.data.items,
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

