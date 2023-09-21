
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePaymentApplicationMethodInput,
  UserUpdatePaymentApplicationMethodInput,
  PaymentApplicationMethod,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PaymentApplicationMethodFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  paymentApplicationMethods: PaymentApplicationMethod[]
}

@Injectable()
export class WebPaymentApplicationMethodSelectFormStore extends ComponentStore<PaymentApplicationMethodFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      paymentApplicationMethods: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paymentApplicationMethods$ = this.select((s) => s.paymentApplicationMethods)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.paymentApplicationMethods$,
    (errors, loading, paymentApplicationMethods) => ({
      errors,
      loading,
      paymentApplicationMethods
    }),
    { debounce: true },
  )

  addNewPaymentApplicationMethod = this.updater((state, paymentApplicationMethod: PaymentApplicationMethod) => ({ paymentApplicationMethods: [...state.paymentApplicationMethods, paymentApplicationMethod] }))

  updatePaymentApplicationMethod = this.updater((state, paymentApplicationMethod: PaymentApplicationMethod) => {
    return {
      ...state,
      paymentApplicationMethods: state.paymentApplicationMethods.map((el) => {
        if (el.id === paymentApplicationMethod.id) {
          return paymentApplicationMethod
        } else {
          return el
        }
      }),
    }
  })

  readonly createPaymentApplicationMethodEffect = this.effect<{ input: UserCreatePaymentApplicationMethodInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePaymentApplicationMethod({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPaymentApplicationMethod(res.data.created)
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

  readonly updatePaymentApplicationMethodEffect = this.effect<{ input: UserUpdatePaymentApplicationMethodInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePaymentApplicationMethod({ paymentApplicationMethodId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePaymentApplicationMethod(res.data.updated)
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

  loadPaymentApplicationMethodsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPaymentApplicationMethods({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                paymentApplicationMethods: data.data.items,
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

