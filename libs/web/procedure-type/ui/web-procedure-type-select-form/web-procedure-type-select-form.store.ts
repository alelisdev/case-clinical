
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateProcedureTypeInput,
  UserUpdateProcedureTypeInput,
  ProcedureType,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcedureTypeFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  procedureTypes: ProcedureType[]
}

@Injectable()
export class WebProcedureTypeSelectFormStore extends ComponentStore<ProcedureTypeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      procedureTypes: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly procedureTypes$ = this.select((s) => s.procedureTypes)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.procedureTypes$,
    (errors, loading, procedureTypes) => ({
      errors,
      loading,
      procedureTypes
    }),
    { debounce: true },
  )

  addNewProcedureType = this.updater((state, procedureType: ProcedureType) => ({ procedureTypes: [...state.procedureTypes, procedureType] }))

  updateProcedureType = this.updater((state, procedureType: ProcedureType) => {
    return {
      ...state,
      procedureTypes: state.procedureTypes.map((el) => {
        if (el.id === procedureType.id) {
          return procedureType
        } else {
          return el
        }
      }),
    }
  })

  readonly createProcedureTypeEffect = this.effect<{ input: UserCreateProcedureTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateProcedureType({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewProcedureType(res.data.created)
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

  readonly updateProcedureTypeEffect = this.effect<{ input: UserUpdateProcedureTypeInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateProcedureType({ procedureTypeId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateProcedureType(res.data.updated)
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

  loadProcedureTypesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userProcedureTypes({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                procedureTypes: data.data.items,
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

