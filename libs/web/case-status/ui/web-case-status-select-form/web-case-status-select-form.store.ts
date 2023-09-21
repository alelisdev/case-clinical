
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCaseStatusInput,
  UserUpdateCaseStatusInput,
  CaseStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  caseStatuses: CaseStatus[]
}

@Injectable()
export class WebCaseStatusSelectFormStore extends ComponentStore<CaseStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      caseStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly caseStatuses$ = this.select((s) => s.caseStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.caseStatuses$,
    (errors, loading, caseStatuses) => ({
      errors,
      loading,
      caseStatuses
    }),
    { debounce: true },
  )

  addNewCaseStatus = this.updater((state, caseStatus: CaseStatus) => ({ caseStatuses: [...state.caseStatuses, caseStatus] }))

  updateCaseStatus = this.updater((state, caseStatus: CaseStatus) => {
    return {
      ...state,
      caseStatuses: state.caseStatuses.map((el) => {
        if (el.id === caseStatus.id) {
          return caseStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createCaseStatusEffect = this.effect<{ input: UserCreateCaseStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCaseStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCaseStatus(res.data.created)
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

  readonly updateCaseStatusEffect = this.effect<{ input: UserUpdateCaseStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCaseStatus({ caseStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCaseStatus(res.data.updated)
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

  loadCaseStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCaseStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                caseStatuses: data.data.items,
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

