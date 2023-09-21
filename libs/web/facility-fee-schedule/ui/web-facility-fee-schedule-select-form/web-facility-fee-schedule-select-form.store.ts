
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateFacilityFeeScheduleInput,
  UserUpdateFacilityFeeScheduleInput,
  FacilityFeeSchedule,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface FacilityFeeScheduleFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  facilityFeeSchedules: FacilityFeeSchedule[]
}

@Injectable()
export class WebFacilityFeeScheduleSelectFormStore extends ComponentStore<FacilityFeeScheduleFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      facilityFeeSchedules: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly facilityFeeSchedules$ = this.select((s) => s.facilityFeeSchedules)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.facilityFeeSchedules$,
    (errors, loading, facilityFeeSchedules) => ({
      errors,
      loading,
      facilityFeeSchedules
    }),
    { debounce: true },
  )

  addNewFacilityFeeSchedule = this.updater((state, facilityFeeSchedule: FacilityFeeSchedule) => ({ facilityFeeSchedules: [...state.facilityFeeSchedules, facilityFeeSchedule] }))

  updateFacilityFeeSchedule = this.updater((state, facilityFeeSchedule: FacilityFeeSchedule) => {
    return {
      ...state,
      facilityFeeSchedules: state.facilityFeeSchedules.map((el) => {
        if (el.id === facilityFeeSchedule.id) {
          return facilityFeeSchedule
        } else {
          return el
        }
      }),
    }
  })

  readonly createFacilityFeeScheduleEffect = this.effect<{ input: UserCreateFacilityFeeScheduleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateFacilityFeeSchedule({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewFacilityFeeSchedule(res.data.created)
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

  readonly updateFacilityFeeScheduleEffect = this.effect<{ input: UserUpdateFacilityFeeScheduleInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateFacilityFeeSchedule({ facilityFeeScheduleId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateFacilityFeeSchedule(res.data.updated)
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

  loadFacilityFeeSchedulesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userFacilityFeeSchedules({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                facilityFeeSchedules: data.data.items,
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

