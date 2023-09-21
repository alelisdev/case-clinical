
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthorizationRequestInput,
  UserUpdatePriorAuthorizationRequestInput,
  PriorAuthorizationRequest,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationRequestFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthorizationRequests: PriorAuthorizationRequest[]
}

@Injectable()
export class WebPriorAuthorizationRequestSelectFormStore extends ComponentStore<PriorAuthorizationRequestFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthorizationRequests: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthorizationRequests$,
    (errors, loading, priorAuthorizationRequests) => ({
      errors,
      loading,
      priorAuthorizationRequests
    }),
    { debounce: true },
  )

  addNewPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({ priorAuthorizationRequests: [...state.priorAuthorizationRequests, priorAuthorizationRequest] }))

  updatePriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => {
    return {
      ...state,
      priorAuthorizationRequests: state.priorAuthorizationRequests.map((el) => {
        if (el.id === priorAuthorizationRequest.id) {
          return priorAuthorizationRequest
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthorizationRequestEffect = this.effect<{ input: UserCreatePriorAuthorizationRequestInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthorizationRequest({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthorizationRequest(res.data.created)
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

  readonly updatePriorAuthorizationRequestEffect = this.effect<{ input: UserUpdatePriorAuthorizationRequestInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthorizationRequest({ priorAuthorizationRequestId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthorizationRequest(res.data.updated)
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

  loadPriorAuthorizationRequestsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthorizationRequests({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthorizationRequests: data.data.items,
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

