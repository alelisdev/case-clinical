
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePayorTypeInput,
  UserUpdatePayorTypeInput,
  PayorType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PayorTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  payorTypes: PayorType[]
}

@Injectable()
export class WebPayorTypeSelectFormStore extends ComponentStore<PayorTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      payorTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly payorTypes$ = this.select((s) => s.payorTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.payorTypes$,
    (errors, loading, payorTypes) => ({
      errors,
      loading,
      payorTypes
    }),
    { debounce: true },
  )

  addNewPayorType = this.updater((state, payorType: PayorType) => ({ payorTypes: [...state.payorTypes, payorType] }))

  updatePayorType = this.updater((state, payorType: PayorType) => {
    return {
      ...state,
      payorTypes: state.payorTypes.map((el) => {
        if (el.id === payorType.id) {
          return payorType
        } else {
          return el
        }
      }),
    }
  })

  readonly createPayorTypeEffect = this.effect<{ input: UserCreatePayorTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePayorType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPayorType(res.data.created)
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

  readonly updatePayorTypeEffect = this.effect<{ input: UserUpdatePayorTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePayorType({ payorTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePayorType(res.data.updated)
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

  loadPayorTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPayorTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                payorTypes: data.data.items,
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

