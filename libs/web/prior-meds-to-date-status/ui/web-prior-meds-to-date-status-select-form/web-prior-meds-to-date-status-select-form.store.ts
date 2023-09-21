
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorMedsToDateStatusInput,
  UserUpdatePriorMedsToDateStatusInput,
  PriorMedsToDateStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorMedsToDateStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorMedsToDateStatuses: PriorMedsToDateStatus[]
}

@Injectable()
export class WebPriorMedsToDateStatusSelectFormStore extends ComponentStore<PriorMedsToDateStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorMedsToDateStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorMedsToDateStatuses$ = this.select((s) => s.priorMedsToDateStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorMedsToDateStatuses$,
    (errors, loading, priorMedsToDateStatuses) => ({
      errors,
      loading,
      priorMedsToDateStatuses
    }),
    { debounce: true },
  )

  addNewPriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus: PriorMedsToDateStatus) => ({ priorMedsToDateStatuses: [...state.priorMedsToDateStatuses, priorMedsToDateStatus] }))

  updatePriorMedsToDateStatus = this.updater((state, priorMedsToDateStatus: PriorMedsToDateStatus) => {
    return {
      ...state,
      priorMedsToDateStatuses: state.priorMedsToDateStatuses.map((el) => {
        if (el.id === priorMedsToDateStatus.id) {
          return priorMedsToDateStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorMedsToDateStatusEffect = this.effect<{ input: UserCreatePriorMedsToDateStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorMedsToDateStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorMedsToDateStatus(res.data.created)
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

  readonly updatePriorMedsToDateStatusEffect = this.effect<{ input: UserUpdatePriorMedsToDateStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorMedsToDateStatus({ priorMedsToDateStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorMedsToDateStatus(res.data.updated)
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

  loadPriorMedsToDateStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorMedsToDateStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorMedsToDateStatuses: data.data.items,
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

