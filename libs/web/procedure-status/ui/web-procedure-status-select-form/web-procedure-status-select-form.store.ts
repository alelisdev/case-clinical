
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateProcedureStatusInput,
  UserUpdateProcedureStatusInput,
  ProcedureStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcedureStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  procedureStatuses: ProcedureStatus[]
}

@Injectable()
export class WebProcedureStatusSelectFormStore extends ComponentStore<ProcedureStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      procedureStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly procedureStatuses$ = this.select((s) => s.procedureStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.procedureStatuses$,
    (errors, loading, procedureStatuses) => ({
      errors,
      loading,
      procedureStatuses
    }),
    { debounce: true },
  )

  addNewProcedureStatus = this.updater((state, procedureStatus: ProcedureStatus) => ({ procedureStatuses: [...state.procedureStatuses, procedureStatus] }))

  updateProcedureStatus = this.updater((state, procedureStatus: ProcedureStatus) => {
    return {
      ...state,
      procedureStatuses: state.procedureStatuses.map((el) => {
        if (el.id === procedureStatus.id) {
          return procedureStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createProcedureStatusEffect = this.effect<{ input: UserCreateProcedureStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateProcedureStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewProcedureStatus(res.data.created)
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

  readonly updateProcedureStatusEffect = this.effect<{ input: UserUpdateProcedureStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateProcedureStatus({ procedureStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateProcedureStatus(res.data.updated)
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

  loadProcedureStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userProcedureStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                procedureStatuses: data.data.items,
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

