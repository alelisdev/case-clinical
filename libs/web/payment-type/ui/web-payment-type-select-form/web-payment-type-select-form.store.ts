
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePaymentTypeInput,
  UserUpdatePaymentTypeInput,
  PaymentType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PaymentTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  paymentTypes: PaymentType[]
}

@Injectable()
export class WebPaymentTypeSelectFormStore extends ComponentStore<PaymentTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      paymentTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paymentTypes$ = this.select((s) => s.paymentTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.paymentTypes$,
    (errors, loading, paymentTypes) => ({
      errors,
      loading,
      paymentTypes
    }),
    { debounce: true },
  )

  addNewPaymentType = this.updater((state, paymentType: PaymentType) => ({ paymentTypes: [...state.paymentTypes, paymentType] }))

  updatePaymentType = this.updater((state, paymentType: PaymentType) => {
    return {
      ...state,
      paymentTypes: state.paymentTypes.map((el) => {
        if (el.id === paymentType.id) {
          return paymentType
        } else {
          return el
        }
      }),
    }
  })

  readonly createPaymentTypeEffect = this.effect<{ input: UserCreatePaymentTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePaymentType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPaymentType(res.data.created)
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

  readonly updatePaymentTypeEffect = this.effect<{ input: UserUpdatePaymentTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePaymentType({ paymentTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePaymentType(res.data.updated)
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

  loadPaymentTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPaymentTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                paymentTypes: data.data.items,
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

