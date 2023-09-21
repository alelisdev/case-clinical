
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateManufacturerInput,
  UserUpdateManufacturerInput,
  Manufacturer,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ManufacturerFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  manufacturers: Manufacturer[]
}

@Injectable()
export class WebManufacturerSelectFormStore extends ComponentStore<ManufacturerFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      manufacturers: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly manufacturers$ = this.select((s) => s.manufacturers)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.manufacturers$,
    (errors, loading, manufacturers) => ({
      errors,
      loading,
      manufacturers
    }),
    { debounce: true },
  )

  addNewManufacturer = this.updater((state, manufacturer: Manufacturer) => ({ manufacturers: [...state.manufacturers, manufacturer] }))

  updateManufacturer = this.updater((state, manufacturer: Manufacturer) => {
    return {
      ...state,
      manufacturers: state.manufacturers.map((el) => {
        if (el.id === manufacturer.id) {
          return manufacturer
        } else {
          return el
        }
      }),
    }
  })

  readonly createManufacturerEffect = this.effect<{ input: UserCreateManufacturerInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateManufacturer({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewManufacturer(res.data.created)
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

  readonly updateManufacturerEffect = this.effect<{ input: UserUpdateManufacturerInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateManufacturer({ manufacturerId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateManufacturer(res.data.updated)
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

  loadManufacturersEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userManufacturers({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                manufacturers: data.data.items,
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

