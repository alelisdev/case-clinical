
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAttorneyInput,
  UserUpdateAttorneyInput,
  Attorney,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AttorneyFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  attorneys: Attorney[]
}

@Injectable()
export class WebAttorneySelectFormStore extends ComponentStore<AttorneyFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      attorneys: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly attorneys$ = this.select((s) => s.attorneys)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.attorneys$,
    (errors, loading, attorneys) => ({
      errors,
      loading,
      attorneys
    }),
    { debounce: true },
  )

  addNewAttorney = this.updater((state, attorney: Attorney) => ({ attorneys: [...state.attorneys, attorney] }))

  updateAttorney = this.updater((state, attorney: Attorney) => {
    return {
      ...state,
      attorneys: state.attorneys.map((el) => {
        if (el.id === attorney.id) {
          return attorney
        } else {
          return el
        }
      }),
    }
  })

  readonly createAttorneyEffect = this.effect<{ input: UserCreateAttorneyInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAttorney({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAttorney(res.data.created)
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

  readonly updateAttorneyEffect = this.effect<{ input: UserUpdateAttorneyInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAttorney({ attorneyId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAttorney(res.data.updated)
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

  loadAttorneysEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAttorneys({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                attorneys: data.data.items,
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

