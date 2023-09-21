
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCalculationBasisTypeInput,
  UserUpdateCalculationBasisTypeInput,
  CalculationBasisType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CalculationBasisTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  calculationBasisTypes: CalculationBasisType[]
}

@Injectable()
export class WebCalculationBasisTypeSelectFormStore extends ComponentStore<CalculationBasisTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      calculationBasisTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly calculationBasisTypes$ = this.select((s) => s.calculationBasisTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.calculationBasisTypes$,
    (errors, loading, calculationBasisTypes) => ({
      errors,
      loading,
      calculationBasisTypes
    }),
    { debounce: true },
  )

  addNewCalculationBasisType = this.updater((state, calculationBasisType: CalculationBasisType) => ({ calculationBasisTypes: [...state.calculationBasisTypes, calculationBasisType] }))

  updateCalculationBasisType = this.updater((state, calculationBasisType: CalculationBasisType) => {
    return {
      ...state,
      calculationBasisTypes: state.calculationBasisTypes.map((el) => {
        if (el.id === calculationBasisType.id) {
          return calculationBasisType
        } else {
          return el
        }
      }),
    }
  })

  readonly createCalculationBasisTypeEffect = this.effect<{ input: UserCreateCalculationBasisTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCalculationBasisType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCalculationBasisType(res.data.created)
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

  readonly updateCalculationBasisTypeEffect = this.effect<{ input: UserUpdateCalculationBasisTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCalculationBasisType({ calculationBasisTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCalculationBasisType(res.data.updated)
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

  loadCalculationBasisTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCalculationBasisTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                calculationBasisTypes: data.data.items,
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

