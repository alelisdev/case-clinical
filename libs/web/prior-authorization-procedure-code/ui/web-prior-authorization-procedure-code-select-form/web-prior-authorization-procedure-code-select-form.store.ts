
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthorizationProcedureCodeInput,
  UserUpdatePriorAuthorizationProcedureCodeInput,
  PriorAuthorizationProcedureCode,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationProcedureCodeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthorizationProcedureCodes: PriorAuthorizationProcedureCode[]
}

@Injectable()
export class WebPriorAuthorizationProcedureCodeSelectFormStore extends ComponentStore<PriorAuthorizationProcedureCodeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthorizationProcedureCodes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthorizationProcedureCodes$ = this.select((s) => s.priorAuthorizationProcedureCodes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthorizationProcedureCodes$,
    (errors, loading, priorAuthorizationProcedureCodes) => ({
      errors,
      loading,
      priorAuthorizationProcedureCodes
    }),
    { debounce: true },
  )

  addNewPriorAuthorizationProcedureCode = this.updater((state, priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode) => ({ priorAuthorizationProcedureCodes: [...state.priorAuthorizationProcedureCodes, priorAuthorizationProcedureCode] }))

  updatePriorAuthorizationProcedureCode = this.updater((state, priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode) => {
    return {
      ...state,
      priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.map((el) => {
        if (el.id === priorAuthorizationProcedureCode.id) {
          return priorAuthorizationProcedureCode
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthorizationProcedureCodeEffect = this.effect<{ input: UserCreatePriorAuthorizationProcedureCodeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthorizationProcedureCode({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthorizationProcedureCode(res.data.created)
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

  readonly updatePriorAuthorizationProcedureCodeEffect = this.effect<{ input: UserUpdatePriorAuthorizationProcedureCodeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthorizationProcedureCode({ priorAuthorizationProcedureCodeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthorizationProcedureCode(res.data.updated)
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

  loadPriorAuthorizationProcedureCodesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthorizationProcedureCodes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthorizationProcedureCodes: data.data.items,
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

