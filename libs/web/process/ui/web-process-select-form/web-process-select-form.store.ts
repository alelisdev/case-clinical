
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateProcessInput,
  UserUpdateProcessInput,
  Process,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcessFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  processes: Process[]
}

@Injectable()
export class WebProcessSelectFormStore extends ComponentStore<ProcessFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      processes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly processes$ = this.select((s) => s.processes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.processes$,
    (errors, loading, processes) => ({
      errors,
      loading,
      processes
    }),
    { debounce: true },
  )

  addNewProcess = this.updater((state, process: Process) => ({ processes: [...state.processes, process] }))

  updateProcess = this.updater((state, process: Process) => {
    return {
      ...state,
      processes: state.processes.map((el) => {
        if (el.id === process.id) {
          return process
        } else {
          return el
        }
      }),
    }
  })

  readonly createProcessEffect = this.effect<{ input: UserCreateProcessInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateProcess({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewProcess(res.data.created)
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

  readonly updateProcessEffect = this.effect<{ input: UserUpdateProcessInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateProcess({ processId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateProcess(res.data.updated)
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

  loadProcessesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userProcesses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                processes: data.data.items,
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

