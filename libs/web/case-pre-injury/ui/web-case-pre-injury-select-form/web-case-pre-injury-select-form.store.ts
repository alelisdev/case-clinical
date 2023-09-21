
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCasePreInjuryInput,
  UserUpdateCasePreInjuryInput,
  CasePreInjury,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CasePreInjuryFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  casePreInjuries: CasePreInjury[]
}

@Injectable()
export class WebCasePreInjurySelectFormStore extends ComponentStore<CasePreInjuryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      casePreInjuries: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly casePreInjuries$ = this.select((s) => s.casePreInjuries)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.casePreInjuries$,
    (errors, loading, casePreInjuries) => ({
      errors,
      loading,
      casePreInjuries
    }),
    { debounce: true },
  )

  addNewCasePreInjury = this.updater((state, casePreInjury: CasePreInjury) => ({ casePreInjuries: [...state.casePreInjuries, casePreInjury] }))

  updateCasePreInjury = this.updater((state, casePreInjury: CasePreInjury) => {
    return {
      ...state,
      casePreInjuries: state.casePreInjuries.map((el) => {
        if (el.id === casePreInjury.id) {
          return casePreInjury
        } else {
          return el
        }
      }),
    }
  })

  readonly createCasePreInjuryEffect = this.effect<{ input: UserCreateCasePreInjuryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCasePreInjury({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCasePreInjury(res.data.created)
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

  readonly updateCasePreInjuryEffect = this.effect<{ input: UserUpdateCasePreInjuryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCasePreInjury({ casePreInjuryId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCasePreInjury(res.data.updated)
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

  loadCasePreInjuriesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCasePreInjuries({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                casePreInjuries: data.data.items,
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

