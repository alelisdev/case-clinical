
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateLegalCaseInput,
  UserUpdateLegalCaseInput,
  LegalCase,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface LegalCaseFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  legalCases: LegalCase[]
}

@Injectable()
export class WebLegalCaseSelectFormStore extends ComponentStore<LegalCaseFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      legalCases: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly legalCases$ = this.select((s) => s.legalCases)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.legalCases$,
    (errors, loading, legalCases) => ({
      errors,
      loading,
      legalCases
    }),
    { debounce: true },
  )

  addNewLegalCase = this.updater((state, legalCase: LegalCase) => ({ legalCases: [...state.legalCases, legalCase] }))

  updateLegalCase = this.updater((state, legalCase: LegalCase) => {
    return {
      ...state,
      legalCases: state.legalCases.map((el) => {
        if (el.id === legalCase.id) {
          return legalCase
        } else {
          return el
        }
      }),
    }
  })

  readonly createLegalCaseEffect = this.effect<{ input: UserCreateLegalCaseInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateLegalCase({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewLegalCase(res.data.created)
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

  readonly updateLegalCaseEffect = this.effect<{ input: UserUpdateLegalCaseInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateLegalCase({ legalCaseId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateLegalCase(res.data.updated)
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

  loadLegalCasesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userLegalCases({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                legalCases: data.data.items,
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

