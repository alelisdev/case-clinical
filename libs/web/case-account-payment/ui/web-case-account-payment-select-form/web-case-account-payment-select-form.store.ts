
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCaseAccountPaymentInput,
  UserUpdateCaseAccountPaymentInput,
  CaseAccountPayment,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseAccountPaymentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  caseAccountPayments: CaseAccountPayment[]
}

@Injectable()
export class WebCaseAccountPaymentSelectFormStore extends ComponentStore<CaseAccountPaymentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      caseAccountPayments: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly caseAccountPayments$ = this.select((s) => s.caseAccountPayments)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.caseAccountPayments$,
    (errors, loading, caseAccountPayments) => ({
      errors,
      loading,
      caseAccountPayments
    }),
    { debounce: true },
  )

  addNewCaseAccountPayment = this.updater((state, caseAccountPayment: CaseAccountPayment) => ({ caseAccountPayments: [...state.caseAccountPayments, caseAccountPayment] }))

  updateCaseAccountPayment = this.updater((state, caseAccountPayment: CaseAccountPayment) => {
    return {
      ...state,
      caseAccountPayments: state.caseAccountPayments.map((el) => {
        if (el.id === caseAccountPayment.id) {
          return caseAccountPayment
        } else {
          return el
        }
      }),
    }
  })

  readonly createCaseAccountPaymentEffect = this.effect<{ input: UserCreateCaseAccountPaymentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCaseAccountPayment({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCaseAccountPayment(res.data.created)
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

  readonly updateCaseAccountPaymentEffect = this.effect<{ input: UserUpdateCaseAccountPaymentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCaseAccountPayment({ caseAccountPaymentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCaseAccountPayment(res.data.updated)
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

  loadCaseAccountPaymentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCaseAccountPayments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                caseAccountPayments: data.data.items,
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

