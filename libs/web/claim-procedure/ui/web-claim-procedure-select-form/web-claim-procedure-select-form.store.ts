
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateClaimProcedureInput,
  UserUpdateClaimProcedureInput,
  ClaimProcedure,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ClaimProcedureFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  claimProcedures: ClaimProcedure[]
}

@Injectable()
export class WebClaimProcedureSelectFormStore extends ComponentStore<ClaimProcedureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      claimProcedures: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly claimProcedures$ = this.select((s) => s.claimProcedures)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.claimProcedures$,
    (errors, loading, claimProcedures) => ({
      errors,
      loading,
      claimProcedures
    }),
    { debounce: true },
  )

  addNewClaimProcedure = this.updater((state, claimProcedure: ClaimProcedure) => ({ claimProcedures: [...state.claimProcedures, claimProcedure] }))

  updateClaimProcedure = this.updater((state, claimProcedure: ClaimProcedure) => {
    return {
      ...state,
      claimProcedures: state.claimProcedures.map((el) => {
        if (el.id === claimProcedure.id) {
          return claimProcedure
        } else {
          return el
        }
      }),
    }
  })

  readonly createClaimProcedureEffect = this.effect<{ input: UserCreateClaimProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateClaimProcedure({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewClaimProcedure(res.data.created)
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

  readonly updateClaimProcedureEffect = this.effect<{ input: UserUpdateClaimProcedureInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateClaimProcedure({ claimProcedureId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateClaimProcedure(res.data.updated)
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

  loadClaimProceduresEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userClaimProcedures({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                claimProcedures: data.data.items,
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

