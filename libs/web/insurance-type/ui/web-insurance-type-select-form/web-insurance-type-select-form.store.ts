
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateInsuranceTypeInput,
  UserUpdateInsuranceTypeInput,
  InsuranceType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface InsuranceTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  insuranceTypes: InsuranceType[]
}

@Injectable()
export class WebInsuranceTypeSelectFormStore extends ComponentStore<InsuranceTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      insuranceTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly insuranceTypes$ = this.select((s) => s.insuranceTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.insuranceTypes$,
    (errors, loading, insuranceTypes) => ({
      errors,
      loading,
      insuranceTypes
    }),
    { debounce: true },
  )

  addNewInsuranceType = this.updater((state, insuranceType: InsuranceType) => ({ insuranceTypes: [...state.insuranceTypes, insuranceType] }))

  updateInsuranceType = this.updater((state, insuranceType: InsuranceType) => {
    return {
      ...state,
      insuranceTypes: state.insuranceTypes.map((el) => {
        if (el.id === insuranceType.id) {
          return insuranceType
        } else {
          return el
        }
      }),
    }
  })

  readonly createInsuranceTypeEffect = this.effect<{ input: UserCreateInsuranceTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateInsuranceType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewInsuranceType(res.data.created)
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

  readonly updateInsuranceTypeEffect = this.effect<{ input: UserUpdateInsuranceTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateInsuranceType({ insuranceTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateInsuranceType(res.data.updated)
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

  loadInsuranceTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userInsuranceTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                insuranceTypes: data.data.items,
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

