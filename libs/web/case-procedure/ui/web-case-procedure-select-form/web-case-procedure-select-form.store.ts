
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCaseProcedureInput,
  UserUpdateCaseProcedureInput,
  CaseProcedure,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseProcedureFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  caseProcedures: CaseProcedure[]
}

@Injectable()
export class WebCaseProcedureSelectFormStore extends ComponentStore<CaseProcedureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      caseProcedures: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly caseProcedures$ = this.select((s) => s.caseProcedures)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.caseProcedures$,
    (errors, loading, caseProcedures) => ({
      errors,
      loading,
      caseProcedures
    }),
    { debounce: true },
  )

  addNewCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => ({ caseProcedures: [...state.caseProcedures, caseProcedure] }))

  updateCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => {
    return {
      ...state,
      caseProcedures: state.caseProcedures.map((el) => {
        if (el.id === caseProcedure.id) {
          return caseProcedure
        } else {
          return el
        }
      }),
    }
  })

  readonly createCaseProcedureEffect = this.effect<{ input: UserCreateCaseProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCaseProcedure({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCaseProcedure(res.data.created)
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

  readonly updateCaseProcedureEffect = this.effect<{ input: UserUpdateCaseProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCaseProcedure({ caseProcedureId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCaseProcedure(res.data.updated)
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

  loadCaseProceduresEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCaseProcedures({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                caseProcedures: data.data.items,
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

