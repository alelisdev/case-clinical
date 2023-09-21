
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateAdverseInsuranceStatusInput,
  UserUpdateAdverseInsuranceStatusInput,
  AdverseInsuranceStatus,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface AdverseInsuranceStatusFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  adverseInsuranceStatuses: AdverseInsuranceStatus[]
}

@Injectable()
export class WebAdverseInsuranceStatusSelectFormStore extends ComponentStore<AdverseInsuranceStatusFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      adverseInsuranceStatuses: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly adverseInsuranceStatuses$ = this.select((s) => s.adverseInsuranceStatuses)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.adverseInsuranceStatuses$,
    (errors, loading, adverseInsuranceStatuses) => ({
      errors,
      loading,
      adverseInsuranceStatuses
    }),
    { debounce: true },
  )

  addNewAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus: AdverseInsuranceStatus) => ({ adverseInsuranceStatuses: [...state.adverseInsuranceStatuses, adverseInsuranceStatus] }))

  updateAdverseInsuranceStatus = this.updater((state, adverseInsuranceStatus: AdverseInsuranceStatus) => {
    return {
      ...state,
      adverseInsuranceStatuses: state.adverseInsuranceStatuses.map((el) => {
        if (el.id === adverseInsuranceStatus.id) {
          return adverseInsuranceStatus
        } else {
          return el
        }
      }),
    }
  })

  readonly createAdverseInsuranceStatusEffect = this.effect<{ input: UserCreateAdverseInsuranceStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateAdverseInsuranceStatus({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewAdverseInsuranceStatus(res.data.created)
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

  readonly updateAdverseInsuranceStatusEffect = this.effect<{ input: UserUpdateAdverseInsuranceStatusInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateAdverseInsuranceStatus({ adverseInsuranceStatusId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateAdverseInsuranceStatus(res.data.updated)
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

  loadAdverseInsuranceStatusesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userAdverseInsuranceStatuses({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                adverseInsuranceStatuses: data.data.items,
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

