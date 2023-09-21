
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorMedsToDateInput,
  UserUpdatePriorMedsToDateInput,
  PriorMedsToDate,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorMedsToDateFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorMedsToDates: PriorMedsToDate[]
}

@Injectable()
export class WebPriorMedsToDateSelectFormStore extends ComponentStore<PriorMedsToDateFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorMedsToDates: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorMedsToDates$ = this.select((s) => s.priorMedsToDates)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorMedsToDates$,
    (errors, loading, priorMedsToDates) => ({
      errors,
      loading,
      priorMedsToDates
    }),
    { debounce: true },
  )

  addNewPriorMedsToDate = this.updater((state, priorMedsToDate: PriorMedsToDate) => ({ priorMedsToDates: [...state.priorMedsToDates, priorMedsToDate] }))

  updatePriorMedsToDate = this.updater((state, priorMedsToDate: PriorMedsToDate) => {
    return {
      ...state,
      priorMedsToDates: state.priorMedsToDates.map((el) => {
        if (el.id === priorMedsToDate.id) {
          return priorMedsToDate
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorMedsToDateEffect = this.effect<{ input: UserCreatePriorMedsToDateInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorMedsToDate({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorMedsToDate(res.data.created)
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

  readonly updatePriorMedsToDateEffect = this.effect<{ input: UserUpdatePriorMedsToDateInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorMedsToDate({ priorMedsToDateId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorMedsToDate(res.data.updated)
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

  loadPriorMedsToDatesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorMedsToDates({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorMedsToDates: data.data.items,
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

