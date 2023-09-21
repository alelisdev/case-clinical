
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePlaceOfServiceInput,
  UserUpdatePlaceOfServiceInput,
  PlaceOfService,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PlaceOfServiceFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  placeOfServices: PlaceOfService[]
}

@Injectable()
export class WebPlaceOfServiceSelectFormStore extends ComponentStore<PlaceOfServiceFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      placeOfServices: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly placeOfServices$ = this.select((s) => s.placeOfServices)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.placeOfServices$,
    (errors, loading, placeOfServices) => ({
      errors,
      loading,
      placeOfServices
    }),
    { debounce: true },
  )

  addNewPlaceOfService = this.updater((state, placeOfService: PlaceOfService) => ({ placeOfServices: [...state.placeOfServices, placeOfService] }))

  updatePlaceOfService = this.updater((state, placeOfService: PlaceOfService) => {
    return {
      ...state,
      placeOfServices: state.placeOfServices.map((el) => {
        if (el.id === placeOfService.id) {
          return placeOfService
        } else {
          return el
        }
      }),
    }
  })

  readonly createPlaceOfServiceEffect = this.effect<{ input: UserCreatePlaceOfServiceInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePlaceOfService({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPlaceOfService(res.data.created)
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

  readonly updatePlaceOfServiceEffect = this.effect<{ input: UserUpdatePlaceOfServiceInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePlaceOfService({ placeOfServiceId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePlaceOfService(res.data.updated)
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

  loadPlaceOfServicesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPlaceOfServices({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                placeOfServices: data.data.items,
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

