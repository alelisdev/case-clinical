
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateProcedureSiteInput,
  UserUpdateProcedureSiteInput,
  ProcedureSite,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcedureSiteFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  procedureSites: ProcedureSite[]
}

@Injectable()
export class WebProcedureSiteSelectFormStore extends ComponentStore<ProcedureSiteFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      procedureSites: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly procedureSites$ = this.select((s) => s.procedureSites)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.procedureSites$,
    (errors, loading, procedureSites) => ({
      errors,
      loading,
      procedureSites
    }),
    { debounce: true },
  )

  addNewProcedureSite = this.updater((state, procedureSite: ProcedureSite) => ({ procedureSites: [...state.procedureSites, procedureSite] }))

  updateProcedureSite = this.updater((state, procedureSite: ProcedureSite) => {
    return {
      ...state,
      procedureSites: state.procedureSites.map((el) => {
        if (el.id === procedureSite.id) {
          return procedureSite
        } else {
          return el
        }
      }),
    }
  })

  readonly createProcedureSiteEffect = this.effect<{ input: UserCreateProcedureSiteInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateProcedureSite({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewProcedureSite(res.data.created)
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

  readonly updateProcedureSiteEffect = this.effect<{ input: UserUpdateProcedureSiteInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateProcedureSite({ procedureSiteId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateProcedureSite(res.data.updated)
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

  loadProcedureSitesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userProcedureSites({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                procedureSites: data.data.items,
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

