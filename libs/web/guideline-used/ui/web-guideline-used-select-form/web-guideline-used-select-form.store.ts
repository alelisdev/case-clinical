
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateGuidelineUsedInput,
  UserUpdateGuidelineUsedInput,
  GuidelineUsed,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface GuidelineUsedFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  guidelineUseds: GuidelineUsed[]
}

@Injectable()
export class WebGuidelineUsedSelectFormStore extends ComponentStore<GuidelineUsedFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      guidelineUseds: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly guidelineUseds$ = this.select((s) => s.guidelineUseds)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.guidelineUseds$,
    (errors, loading, guidelineUseds) => ({
      errors,
      loading,
      guidelineUseds
    }),
    { debounce: true },
  )

  addNewGuidelineUsed = this.updater((state, guidelineUsed: GuidelineUsed) => ({ guidelineUseds: [...state.guidelineUseds, guidelineUsed] }))

  updateGuidelineUsed = this.updater((state, guidelineUsed: GuidelineUsed) => {
    return {
      ...state,
      guidelineUseds: state.guidelineUseds.map((el) => {
        if (el.id === guidelineUsed.id) {
          return guidelineUsed
        } else {
          return el
        }
      }),
    }
  })

  readonly createGuidelineUsedEffect = this.effect<{ input: UserCreateGuidelineUsedInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateGuidelineUsed({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewGuidelineUsed(res.data.created)
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

  readonly updateGuidelineUsedEffect = this.effect<{ input: UserUpdateGuidelineUsedInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateGuidelineUsed({ guidelineUsedId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateGuidelineUsed(res.data.updated)
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

  loadGuidelineUsedsEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userGuidelineUseds({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                guidelineUseds: data.data.items,
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

