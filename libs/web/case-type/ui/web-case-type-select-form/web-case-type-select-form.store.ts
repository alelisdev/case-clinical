
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCaseTypeInput,
  UserUpdateCaseTypeInput,
  CaseType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  caseTypes: CaseType[]
}

@Injectable()
export class WebCaseTypeSelectFormStore extends ComponentStore<CaseTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      caseTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly caseTypes$ = this.select((s) => s.caseTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.caseTypes$,
    (errors, loading, caseTypes) => ({
      errors,
      loading,
      caseTypes
    }),
    { debounce: true },
  )

  addNewCaseType = this.updater((state, caseType: CaseType) => ({ caseTypes: [...state.caseTypes, caseType] }))

  updateCaseType = this.updater((state, caseType: CaseType) => {
    return {
      ...state,
      caseTypes: state.caseTypes.map((el) => {
        if (el.id === caseType.id) {
          return caseType
        } else {
          return el
        }
      }),
    }
  })

  readonly createCaseTypeEffect = this.effect<{ input: UserCreateCaseTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCaseType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCaseType(res.data.created)
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

  readonly updateCaseTypeEffect = this.effect<{ input: UserUpdateCaseTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCaseType({ caseTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCaseType(res.data.updated)
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

  loadCaseTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCaseTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                caseTypes: data.data.items,
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

