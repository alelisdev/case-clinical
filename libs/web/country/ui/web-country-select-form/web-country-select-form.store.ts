
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCountryInput,
  UserUpdateCountryInput,
  Country,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CountryFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  countries: Country[]
}

@Injectable()
export class WebCountrySelectFormStore extends ComponentStore<CountryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      countries: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly countries$ = this.select((s) => s.countries)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.countries$,
    (errors, loading, countries) => ({
      errors,
      loading,
      countries
    }),
    { debounce: true },
  )

  addNewCountry = this.updater((state, country: Country) => ({ countries: [...state.countries, country] }))

  updateCountry = this.updater((state, country: Country) => {
    return {
      ...state,
      countries: state.countries.map((el) => {
        if (el.id === country.id) {
          return country
        } else {
          return el
        }
      }),
    }
  })

  readonly createCountryEffect = this.effect<{ input: UserCreateCountryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCountry({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCountry(res.data.created)
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

  readonly updateCountryEffect = this.effect<{ input: UserUpdateCountryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCountry({ countryId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCountry(res.data.updated)
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

  loadCountriesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCountries({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                countries: data.data.items,
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

