
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateProcedureVendorInput,
  UserUpdateProcedureVendorInput,
  ProcedureVendor,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcedureVendorFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  procedureVendors: ProcedureVendor[]
}

@Injectable()
export class WebProcedureVendorSelectFormStore extends ComponentStore<ProcedureVendorFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      procedureVendors: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly procedureVendors$ = this.select((s) => s.procedureVendors)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.procedureVendors$,
    (errors, loading, procedureVendors) => ({
      errors,
      loading,
      procedureVendors
    }),
    { debounce: true },
  )

  addNewProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => ({ procedureVendors: [...state.procedureVendors, procedureVendor] }))

  updateProcedureVendor = this.updater((state, procedureVendor: ProcedureVendor) => {
    return {
      ...state,
      procedureVendors: state.procedureVendors.map((el) => {
        if (el.id === procedureVendor.id) {
          return procedureVendor
        } else {
          return el
        }
      }),
    }
  })

  readonly createProcedureVendorEffect = this.effect<{ input: UserCreateProcedureVendorInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateProcedureVendor({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewProcedureVendor(res.data.created)
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

  readonly updateProcedureVendorEffect = this.effect<{ input: UserUpdateProcedureVendorInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateProcedureVendor({ procedureVendorId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateProcedureVendor(res.data.updated)
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

  loadProcedureVendorsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userProcedureVendors({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                procedureVendors: data.data.items,
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

