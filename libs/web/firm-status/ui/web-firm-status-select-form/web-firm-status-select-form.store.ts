
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateFirmStatusInput,
  UserUpdateFirmStatusInput,
  FirmStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface FirmStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  firmStatuses: FirmStatus[]
}

@Injectable()
export class WebFirmStatusSelectFormStore extends ComponentStore<FirmStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      firmStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly firmStatuses$ = this.select((s) => s.firmStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.firmStatuses$,
    (errors, loading, firmStatuses) => ({
      errors,
      loading,
      firmStatuses
    }),
    { debounce: true },
  )

  addNewFirmStatus = this.updater((state, firmStatus: FirmStatus) => ({ firmStatuses: [...state.firmStatuses, firmStatus] }))

  updateFirmStatus = this.updater((state, firmStatus: FirmStatus) => {
    return {
      ...state,
      firmStatuses: state.firmStatuses.map((el) => {
        if (el.id === firmStatus.id) {
          return firmStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createFirmStatusEffect = this.effect<{ input: UserCreateFirmStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateFirmStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewFirmStatus(res.data.created)
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

  readonly updateFirmStatusEffect = this.effect<{ input: UserUpdateFirmStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateFirmStatus({ firmStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateFirmStatus(res.data.updated)
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

  loadFirmStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userFirmStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                firmStatuses: data.data.items,
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

