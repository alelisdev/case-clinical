
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateWriteOffStatusInput,
  UserUpdateWriteOffStatusInput,
  WriteOffStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface WriteOffStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  writeOffStatuses: WriteOffStatus[]
}

@Injectable()
export class WebWriteOffStatusSelectFormStore extends ComponentStore<WriteOffStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      writeOffStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly writeOffStatuses$ = this.select((s) => s.writeOffStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.writeOffStatuses$,
    (errors, loading, writeOffStatuses) => ({
      errors,
      loading,
      writeOffStatuses
    }),
    { debounce: true },
  )

  addNewWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => ({ writeOffStatuses: [...state.writeOffStatuses, writeOffStatus] }))

  updateWriteOffStatus = this.updater((state, writeOffStatus: WriteOffStatus) => {
    return {
      ...state,
      writeOffStatuses: state.writeOffStatuses.map((el) => {
        if (el.id === writeOffStatus.id) {
          return writeOffStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createWriteOffStatusEffect = this.effect<{ input: UserCreateWriteOffStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateWriteOffStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewWriteOffStatus(res.data.created)
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

  readonly updateWriteOffStatusEffect = this.effect<{ input: UserUpdateWriteOffStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateWriteOffStatus({ writeOffStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateWriteOffStatus(res.data.updated)
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

  loadWriteOffStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userWriteOffStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                writeOffStatuses: data.data.items,
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

