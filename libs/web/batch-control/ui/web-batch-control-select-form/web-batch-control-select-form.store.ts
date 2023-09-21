
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateBatchControlInput,
  UserUpdateBatchControlInput,
  BatchControl,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface BatchControlFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  batchControls: BatchControl[]
}

@Injectable()
export class WebBatchControlSelectFormStore extends ComponentStore<BatchControlFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      batchControls: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly batchControls$ = this.select((s) => s.batchControls)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.batchControls$,
    (errors, loading, batchControls) => ({
      errors,
      loading,
      batchControls
    }),
    { debounce: true },
  )

  addNewBatchControl = this.updater((state, batchControl: BatchControl) => ({ batchControls: [...state.batchControls, batchControl] }))

  updateBatchControl = this.updater((state, batchControl: BatchControl) => {
    return {
      ...state,
      batchControls: state.batchControls.map((el) => {
        if (el.id === batchControl.id) {
          return batchControl
        } else {
          return el
        }
      }),
    }
  })

  readonly createBatchControlEffect = this.effect<{ input: UserCreateBatchControlInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateBatchControl({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewBatchControl(res.data.created)
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

  readonly updateBatchControlEffect = this.effect<{ input: UserUpdateBatchControlInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateBatchControl({ batchControlId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateBatchControl(res.data.updated)
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

  loadBatchControlsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userBatchControls({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                batchControls: data.data.items,
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

