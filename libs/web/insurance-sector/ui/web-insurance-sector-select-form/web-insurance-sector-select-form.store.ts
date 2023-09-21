
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateInsuranceSectorInput,
  UserUpdateInsuranceSectorInput,
  InsuranceSector,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface InsuranceSectorFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  insuranceSectors: InsuranceSector[]
}

@Injectable()
export class WebInsuranceSectorSelectFormStore extends ComponentStore<InsuranceSectorFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      insuranceSectors: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly insuranceSectors$ = this.select((s) => s.insuranceSectors)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.insuranceSectors$,
    (errors, loading, insuranceSectors) => ({
      errors,
      loading,
      insuranceSectors
    }),
    { debounce: true },
  )

  addNewInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => ({ insuranceSectors: [...state.insuranceSectors, insuranceSector] }))

  updateInsuranceSector = this.updater((state, insuranceSector: InsuranceSector) => {
    return {
      ...state,
      insuranceSectors: state.insuranceSectors.map((el) => {
        if (el.id === insuranceSector.id) {
          return insuranceSector
        } else {
          return el
        }
      }),
    }
  })

  readonly createInsuranceSectorEffect = this.effect<{ input: UserCreateInsuranceSectorInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateInsuranceSector({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewInsuranceSector(res.data.created)
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

  readonly updateInsuranceSectorEffect = this.effect<{ input: UserUpdateInsuranceSectorInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateInsuranceSector({ insuranceSectorId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateInsuranceSector(res.data.updated)
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

  loadInsuranceSectorsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userInsuranceSectors({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                insuranceSectors: data.data.items,
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

