
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthorizationDiagnosisCodeInput,
  UserUpdatePriorAuthorizationDiagnosisCodeInput,
  PriorAuthorizationDiagnosisCode,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationDiagnosisCodeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthorizationDiagnosisCodes: PriorAuthorizationDiagnosisCode[]
}

@Injectable()
export class WebPriorAuthorizationDiagnosisCodeSelectFormStore extends ComponentStore<PriorAuthorizationDiagnosisCodeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthorizationDiagnosisCodes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthorizationDiagnosisCodes$ = this.select((s) => s.priorAuthorizationDiagnosisCodes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthorizationDiagnosisCodes$,
    (errors, loading, priorAuthorizationDiagnosisCodes) => ({
      errors,
      loading,
      priorAuthorizationDiagnosisCodes
    }),
    { debounce: true },
  )

  addNewPriorAuthorizationDiagnosisCode = this.updater((state, priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode) => ({ priorAuthorizationDiagnosisCodes: [...state.priorAuthorizationDiagnosisCodes, priorAuthorizationDiagnosisCode] }))

  updatePriorAuthorizationDiagnosisCode = this.updater((state, priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode) => {
    return {
      ...state,
      priorAuthorizationDiagnosisCodes: state.priorAuthorizationDiagnosisCodes.map((el) => {
        if (el.id === priorAuthorizationDiagnosisCode.id) {
          return priorAuthorizationDiagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthorizationDiagnosisCodeEffect = this.effect<{ input: UserCreatePriorAuthorizationDiagnosisCodeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthorizationDiagnosisCode({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthorizationDiagnosisCode(res.data.created)
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

  readonly updatePriorAuthorizationDiagnosisCodeEffect = this.effect<{ input: UserUpdatePriorAuthorizationDiagnosisCodeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthorizationDiagnosisCode({ priorAuthorizationDiagnosisCodeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthorizationDiagnosisCode(res.data.updated)
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

  loadPriorAuthorizationDiagnosisCodesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthorizationDiagnosisCodes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthorizationDiagnosisCodes: data.data.items,
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

