
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateReconciliationPeriodTypeInput,
  UserUpdateReconciliationPeriodTypeInput,
  ReconciliationPeriodType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ReconciliationPeriodTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  reconciliationPeriodTypes: ReconciliationPeriodType[]
}

@Injectable()
export class WebReconciliationPeriodTypeSelectFormStore extends ComponentStore<ReconciliationPeriodTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      reconciliationPeriodTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly reconciliationPeriodTypes$ = this.select((s) => s.reconciliationPeriodTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.reconciliationPeriodTypes$,
    (errors, loading, reconciliationPeriodTypes) => ({
      errors,
      loading,
      reconciliationPeriodTypes
    }),
    { debounce: true },
  )

  addNewReconciliationPeriodType = this.updater((state, reconciliationPeriodType: ReconciliationPeriodType) => ({ reconciliationPeriodTypes: [...state.reconciliationPeriodTypes, reconciliationPeriodType] }))

  updateReconciliationPeriodType = this.updater((state, reconciliationPeriodType: ReconciliationPeriodType) => {
    return {
      ...state,
      reconciliationPeriodTypes: state.reconciliationPeriodTypes.map((el) => {
        if (el.id === reconciliationPeriodType.id) {
          return reconciliationPeriodType
        } else {
          return el
        }
      }),
    }
  })

  readonly createReconciliationPeriodTypeEffect = this.effect<{ input: UserCreateReconciliationPeriodTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateReconciliationPeriodType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewReconciliationPeriodType(res.data.created)
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

  readonly updateReconciliationPeriodTypeEffect = this.effect<{ input: UserUpdateReconciliationPeriodTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateReconciliationPeriodType({ reconciliationPeriodTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateReconciliationPeriodType(res.data.updated)
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

  loadReconciliationPeriodTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userReconciliationPeriodTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                reconciliationPeriodTypes: data.data.items,
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

