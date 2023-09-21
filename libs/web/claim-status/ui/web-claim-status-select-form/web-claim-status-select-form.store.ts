
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateClaimStatusInput,
  UserUpdateClaimStatusInput,
  ClaimStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ClaimStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  claimStatuses: ClaimStatus[]
}

@Injectable()
export class WebClaimStatusSelectFormStore extends ComponentStore<ClaimStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      claimStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly claimStatuses$ = this.select((s) => s.claimStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.claimStatuses$,
    (errors, loading, claimStatuses) => ({
      errors,
      loading,
      claimStatuses
    }),
    { debounce: true },
  )

  addNewClaimStatus = this.updater((state, claimStatus: ClaimStatus) => ({ claimStatuses: [...state.claimStatuses, claimStatus] }))

  updateClaimStatus = this.updater((state, claimStatus: ClaimStatus) => {
    return {
      ...state,
      claimStatuses: state.claimStatuses.map((el) => {
        if (el.id === claimStatus.id) {
          return claimStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createClaimStatusEffect = this.effect<{ input: UserCreateClaimStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateClaimStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewClaimStatus(res.data.created)
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

  readonly updateClaimStatusEffect = this.effect<{ input: UserUpdateClaimStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateClaimStatus({ claimStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateClaimStatus(res.data.updated)
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

  loadClaimStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userClaimStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                claimStatuses: data.data.items,
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

