
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateFeeScheduleInput,
  UserUpdateFeeScheduleInput,
  FeeSchedule,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface FeeScheduleFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  feeSchedules: FeeSchedule[]
}

@Injectable()
export class WebFeeScheduleSelectFormStore extends ComponentStore<FeeScheduleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      feeSchedules: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly feeSchedules$ = this.select((s) => s.feeSchedules)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.feeSchedules$,
    (errors, loading, feeSchedules) => ({
      errors,
      loading,
      feeSchedules
    }),
    { debounce: true },
  )

  addNewFeeSchedule = this.updater((state, feeSchedule: FeeSchedule) => ({ feeSchedules: [...state.feeSchedules, feeSchedule] }))

  updateFeeSchedule = this.updater((state, feeSchedule: FeeSchedule) => {
    return {
      ...state,
      feeSchedules: state.feeSchedules.map((el) => {
        if (el.id === feeSchedule.id) {
          return feeSchedule
        } else {
          return el
        }
      }),
    }
  })

  readonly createFeeScheduleEffect = this.effect<{ input: UserCreateFeeScheduleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateFeeSchedule({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewFeeSchedule(res.data.created)
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

  readonly updateFeeScheduleEffect = this.effect<{ input: UserUpdateFeeScheduleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateFeeSchedule({ feeScheduleId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateFeeSchedule(res.data.updated)
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

  loadFeeSchedulesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userFeeSchedules({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                feeSchedules: data.data.items,
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

