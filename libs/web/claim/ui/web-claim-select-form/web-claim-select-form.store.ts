
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateClaimInput,
  UserUpdateClaimInput,
  Claim,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ClaimFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  claims: Claim[]
}

@Injectable()
export class WebClaimSelectFormStore extends ComponentStore<ClaimFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      claims: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly claims$ = this.select((s) => s.claims)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.claims$,
    (errors, loading, claims) => ({
      errors,
      loading,
      claims
    }),
    { debounce: true },
  )

  addNewClaim = this.updater((state, claim: Claim) => ({ claims: [...state.claims, claim] }))

  updateClaim = this.updater((state, claim: Claim) => {
    return {
      ...state,
      claims: state.claims.map((el) => {
        if (el.id === claim.id) {
          return claim
        } else {
          return el
        }
      }),
    }
  })

  readonly createClaimEffect = this.effect<{ input: UserCreateClaimInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateClaim({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewClaim(res.data.created)
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

  readonly updateClaimEffect = this.effect<{ input: UserUpdateClaimInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateClaim({ claimId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateClaim(res.data.updated)
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

  loadClaimsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userClaims({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                claims: data.data.items,
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

