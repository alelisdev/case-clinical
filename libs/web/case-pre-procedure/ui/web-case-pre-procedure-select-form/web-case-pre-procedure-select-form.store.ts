
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCasePreProcedureInput,
  UserUpdateCasePreProcedureInput,
  CasePreProcedure,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CasePreProcedureFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  casePreProcedures: CasePreProcedure[]
}

@Injectable()
export class WebCasePreProcedureSelectFormStore extends ComponentStore<CasePreProcedureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      casePreProcedures: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly casePreProcedures$ = this.select((s) => s.casePreProcedures)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.casePreProcedures$,
    (errors, loading, casePreProcedures) => ({
      errors,
      loading,
      casePreProcedures
    }),
    { debounce: true },
  )

  addNewCasePreProcedure = this.updater((state, casePreProcedure: CasePreProcedure) => ({ casePreProcedures: [...state.casePreProcedures, casePreProcedure] }))

  updateCasePreProcedure = this.updater((state, casePreProcedure: CasePreProcedure) => {
    return {
      ...state,
      casePreProcedures: state.casePreProcedures.map((el) => {
        if (el.id === casePreProcedure.id) {
          return casePreProcedure
        } else {
          return el
        }
      }),
    }
  })

  readonly createCasePreProcedureEffect = this.effect<{ input: UserCreateCasePreProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCasePreProcedure({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCasePreProcedure(res.data.created)
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

  readonly updateCasePreProcedureEffect = this.effect<{ input: UserUpdateCasePreProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCasePreProcedure({ casePreProcedureId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCasePreProcedure(res.data.updated)
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

  loadCasePreProceduresEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCasePreProcedures({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                casePreProcedures: data.data.items,
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

