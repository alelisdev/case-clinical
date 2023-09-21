
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAttorneyStatusInput,
  UserUpdateAttorneyStatusInput,
  AttorneyStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AttorneyStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  attorneyStatuses: AttorneyStatus[]
}

@Injectable()
export class WebAttorneyStatusSelectFormStore extends ComponentStore<AttorneyStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      attorneyStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly attorneyStatuses$ = this.select((s) => s.attorneyStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.attorneyStatuses$,
    (errors, loading, attorneyStatuses) => ({
      errors,
      loading,
      attorneyStatuses
    }),
    { debounce: true },
  )

  addNewAttorneyStatus = this.updater((state, attorneyStatus: AttorneyStatus) => ({ attorneyStatuses: [...state.attorneyStatuses, attorneyStatus] }))

  updateAttorneyStatus = this.updater((state, attorneyStatus: AttorneyStatus) => {
    return {
      ...state,
      attorneyStatuses: state.attorneyStatuses.map((el) => {
        if (el.id === attorneyStatus.id) {
          return attorneyStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createAttorneyStatusEffect = this.effect<{ input: UserCreateAttorneyStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAttorneyStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAttorneyStatus(res.data.created)
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

  readonly updateAttorneyStatusEffect = this.effect<{ input: UserUpdateAttorneyStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAttorneyStatus({ attorneyStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAttorneyStatus(res.data.updated)
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

  loadAttorneyStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAttorneyStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                attorneyStatuses: data.data.items,
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

