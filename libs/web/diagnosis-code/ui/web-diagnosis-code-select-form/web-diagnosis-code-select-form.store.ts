
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateDiagnosisCodeInput,
  UserUpdateDiagnosisCodeInput,
  DiagnosisCode,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface DiagnosisCodeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  diagnosisCodes: DiagnosisCode[]
}

@Injectable()
export class WebDiagnosisCodeSelectFormStore extends ComponentStore<DiagnosisCodeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      diagnosisCodes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.diagnosisCodes$,
    (errors, loading, diagnosisCodes) => ({
      errors,
      loading,
      diagnosisCodes
    }),
    { debounce: true },
  )

  addNewDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({ diagnosisCodes: [...state.diagnosisCodes, diagnosisCode] }))

  updateDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => {
    return {
      ...state,
      diagnosisCodes: state.diagnosisCodes.map((el) => {
        if (el.id === diagnosisCode.id) {
          return diagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  readonly createDiagnosisCodeEffect = this.effect<{ input: UserCreateDiagnosisCodeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateDiagnosisCode({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewDiagnosisCode(res.data.created)
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

  readonly updateDiagnosisCodeEffect = this.effect<{ input: UserUpdateDiagnosisCodeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateDiagnosisCode({ diagnosisCodeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateDiagnosisCode(res.data.updated)
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

  loadDiagnosisCodesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userDiagnosisCodes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                diagnosisCodes: data.data.items,
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

