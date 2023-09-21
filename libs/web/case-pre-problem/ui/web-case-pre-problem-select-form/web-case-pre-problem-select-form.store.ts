
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCasePreProblemInput,
  UserUpdateCasePreProblemInput,
  CasePreProblem,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CasePreProblemFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  casePreProblems: CasePreProblem[]
}

@Injectable()
export class WebCasePreProblemSelectFormStore extends ComponentStore<CasePreProblemFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      casePreProblems: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly casePreProblems$ = this.select((s) => s.casePreProblems)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.casePreProblems$,
    (errors, loading, casePreProblems) => ({
      errors,
      loading,
      casePreProblems
    }),
    { debounce: true },
  )

  addNewCasePreProblem = this.updater((state, casePreProblem: CasePreProblem) => ({ casePreProblems: [...state.casePreProblems, casePreProblem] }))

  updateCasePreProblem = this.updater((state, casePreProblem: CasePreProblem) => {
    return {
      ...state,
      casePreProblems: state.casePreProblems.map((el) => {
        if (el.id === casePreProblem.id) {
          return casePreProblem
        } else {
          return el
        }
      }),
    }
  })

  readonly createCasePreProblemEffect = this.effect<{ input: UserCreateCasePreProblemInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCasePreProblem({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCasePreProblem(res.data.created)
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

  readonly updateCasePreProblemEffect = this.effect<{ input: UserUpdateCasePreProblemInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCasePreProblem({ casePreProblemId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCasePreProblem(res.data.updated)
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

  loadCasePreProblemsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCasePreProblems({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                casePreProblems: data.data.items,
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

