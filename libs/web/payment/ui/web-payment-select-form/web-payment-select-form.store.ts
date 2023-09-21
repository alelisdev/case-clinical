
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePaymentInput,
  UserUpdatePaymentInput,
  Payment,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PaymentFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  payments: Payment[]
}

@Injectable()
export class WebPaymentSelectFormStore extends ComponentStore<PaymentFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      payments: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly payments$ = this.select((s) => s.payments)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.payments$,
    (errors, loading, payments) => ({
      errors,
      loading,
      payments
    }),
    { debounce: true },
  )

  addNewPayment = this.updater((state, payment: Payment) => ({ payments: [...state.payments, payment] }))

  updatePayment = this.updater((state, payment: Payment) => {
    return {
      ...state,
      payments: state.payments.map((el) => {
        if (el.id === payment.id) {
          return payment
        } else {
          return el
        }
      }),
    }
  })

  readonly createPaymentEffect = this.effect<{ input: UserCreatePaymentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePayment({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPayment(res.data.created)
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

  readonly updatePaymentEffect = this.effect<{ input: UserUpdatePaymentInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePayment({ paymentId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePayment(res.data.updated)
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

  loadPaymentsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPayments({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                payments: data.data.items,
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

