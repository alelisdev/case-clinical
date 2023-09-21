
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreatePriorAuthGuidelineInput,
  UserUpdatePriorAuthGuidelineInput,
  PriorAuthGuideline,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthGuidelineFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  priorAuthGuidelines: PriorAuthGuideline[]
}

@Injectable()
export class WebPriorAuthGuidelineSelectFormStore extends ComponentStore<PriorAuthGuidelineFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      priorAuthGuidelines: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly priorAuthGuidelines$ = this.select((s) => s.priorAuthGuidelines)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.priorAuthGuidelines$,
    (errors, loading, priorAuthGuidelines) => ({
      errors,
      loading,
      priorAuthGuidelines
    }),
    { debounce: true },
  )

  addNewPriorAuthGuideline = this.updater((state, priorAuthGuideline: PriorAuthGuideline) => ({ priorAuthGuidelines: [...state.priorAuthGuidelines, priorAuthGuideline] }))

  updatePriorAuthGuideline = this.updater((state, priorAuthGuideline: PriorAuthGuideline) => {
    return {
      ...state,
      priorAuthGuidelines: state.priorAuthGuidelines.map((el) => {
        if (el.id === priorAuthGuideline.id) {
          return priorAuthGuideline
        } else {
          return el
        }
      }),
    }
  })

  readonly createPriorAuthGuidelineEffect = this.effect<{ input: UserCreatePriorAuthGuidelineInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreatePriorAuthGuideline({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewPriorAuthGuideline(res.data.created)
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

  readonly updatePriorAuthGuidelineEffect = this.effect<{ input: UserUpdatePriorAuthGuidelineInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdatePriorAuthGuideline({ priorAuthGuidelineId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updatePriorAuthGuideline(res.data.updated)
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

  loadPriorAuthGuidelinesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userPriorAuthGuidelines({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                priorAuthGuidelines: data.data.items,
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

