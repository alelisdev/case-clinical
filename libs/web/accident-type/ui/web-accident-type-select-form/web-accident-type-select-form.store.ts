
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAccidentTypeInput,
  UserUpdateAccidentTypeInput,
  AccidentType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AccidentTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  accidentTypes: AccidentType[]
}

@Injectable()
export class WebAccidentTypeSelectFormStore extends ComponentStore<AccidentTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      accidentTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly accidentTypes$ = this.select((s) => s.accidentTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.accidentTypes$,
    (errors, loading, accidentTypes) => ({
      errors,
      loading,
      accidentTypes
    }),
    { debounce: true },
  )

  addNewAccidentType = this.updater((state, accidentType: AccidentType) => ({ accidentTypes: [...state.accidentTypes, accidentType] }))

  updateAccidentType = this.updater((state, accidentType: AccidentType) => {
    return {
      ...state,
      accidentTypes: state.accidentTypes.map((el) => {
        if (el.id === accidentType.id) {
          return accidentType
        } else {
          return el
        }
      }),
    }
  })

  readonly createAccidentTypeEffect = this.effect<{ input: UserCreateAccidentTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAccidentType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAccidentType(res.data.created)
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

  readonly updateAccidentTypeEffect = this.effect<{ input: UserUpdateAccidentTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAccidentType({ accidentTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAccidentType(res.data.updated)
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

  loadAccidentTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAccidentTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                accidentTypes: data.data.items,
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

