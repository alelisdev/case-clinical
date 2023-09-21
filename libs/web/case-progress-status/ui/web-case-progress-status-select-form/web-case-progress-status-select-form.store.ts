
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCaseProgressStatusInput,
  UserUpdateCaseProgressStatusInput,
  CaseProgressStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseProgressStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  caseProgressStatuses: CaseProgressStatus[]
}

@Injectable()
export class WebCaseProgressStatusSelectFormStore extends ComponentStore<CaseProgressStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      caseProgressStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly caseProgressStatuses$ = this.select((s) => s.caseProgressStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.caseProgressStatuses$,
    (errors, loading, caseProgressStatuses) => ({
      errors,
      loading,
      caseProgressStatuses
    }),
    { debounce: true },
  )

  addNewCaseProgressStatus = this.updater((state, caseProgressStatus: CaseProgressStatus) => ({ caseProgressStatuses: [...state.caseProgressStatuses, caseProgressStatus] }))

  updateCaseProgressStatus = this.updater((state, caseProgressStatus: CaseProgressStatus) => {
    return {
      ...state,
      caseProgressStatuses: state.caseProgressStatuses.map((el) => {
        if (el.id === caseProgressStatus.id) {
          return caseProgressStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createCaseProgressStatusEffect = this.effect<{ input: UserCreateCaseProgressStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCaseProgressStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCaseProgressStatus(res.data.created)
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

  readonly updateCaseProgressStatusEffect = this.effect<{ input: UserUpdateCaseProgressStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCaseProgressStatus({ caseProgressStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCaseProgressStatus(res.data.updated)
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

  loadCaseProgressStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCaseProgressStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                caseProgressStatuses: data.data.items,
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

