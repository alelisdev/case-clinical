
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateProcedureInput,
  UserUpdateProcedureInput,
  Procedure,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcedureFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  procedures: Procedure[]
}

@Injectable()
export class WebProcedureSelectFormStore extends ComponentStore<ProcedureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      procedures: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly procedures$ = this.select((s) => s.procedures)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.procedures$,
    (errors, loading, procedures) => ({
      errors,
      loading,
      procedures
    }),
    { debounce: true },
  )

  addNewProcedure = this.updater((state, procedure: Procedure) => ({ procedures: [...state.procedures, procedure] }))

  updateProcedure = this.updater((state, procedure: Procedure) => {
    return {
      ...state,
      procedures: state.procedures.map((el) => {
        if (el.id === procedure.id) {
          return procedure
        } else {
          return el
        }
      }),
    }
  })

  readonly createProcedureEffect = this.effect<{ input: UserCreateProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateProcedure({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewProcedure(res.data.created)
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

  readonly updateProcedureEffect = this.effect<{ input: UserUpdateProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateProcedure({ procedureId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateProcedure(res.data.updated)
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

  loadProceduresEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userProcedures({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                procedures: data.data.items,
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

