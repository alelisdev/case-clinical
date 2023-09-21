
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateLocationInput,
  UserUpdateLocationInput,
  Location,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface LocationFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  locations: Location[]
}

@Injectable()
export class WebLocationSelectFormStore extends ComponentStore<LocationFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      locations: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly locations$ = this.select((s) => s.locations)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.locations$,
    (errors, loading, locations) => ({
      errors,
      loading,
      locations
    }),
    { debounce: true },
  )

  addNewLocation = this.updater((state, location: Location) => ({ locations: [...state.locations, location] }))

  updateLocation = this.updater((state, location: Location) => {
    return {
      ...state,
      locations: state.locations.map((el) => {
        if (el.id === location.id) {
          return location
        } else {
          return el
        }
      }),
    }
  })

  readonly createLocationEffect = this.effect<{ input: UserCreateLocationInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateLocation({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewLocation(res.data.created)
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

  readonly updateLocationEffect = this.effect<{ input: UserUpdateLocationInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateLocation({ locationId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateLocation(res.data.updated)
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

  loadLocationsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userLocations({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                locations: data.data.items,
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

