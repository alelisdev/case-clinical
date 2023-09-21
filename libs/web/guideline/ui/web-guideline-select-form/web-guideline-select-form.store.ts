
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateGuidelineInput,
  UserUpdateGuidelineInput,
  Guideline,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface GuidelineFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  guidelines: Guideline[]
}

@Injectable()
export class WebGuidelineSelectFormStore extends ComponentStore<GuidelineFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      guidelines: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly guidelines$ = this.select((s) => s.guidelines)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.guidelines$,
    (errors, loading, guidelines) => ({
      errors,
      loading,
      guidelines
    }),
    { debounce: true },
  )

  addNewGuideline = this.updater((state, guideline: Guideline) => ({ guidelines: [...state.guidelines, guideline] }))

  updateGuideline = this.updater((state, guideline: Guideline) => {
    return {
      ...state,
      guidelines: state.guidelines.map((el) => {
        if (el.id === guideline.id) {
          return guideline
        } else {
          return el
        }
      }),
    }
  })

  readonly createGuidelineEffect = this.effect<{ input: UserCreateGuidelineInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateGuideline({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewGuideline(res.data.created)
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

  readonly updateGuidelineEffect = this.effect<{ input: UserUpdateGuidelineInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateGuideline({ guidelineId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateGuideline(res.data.updated)
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

  loadGuidelinesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userGuidelines({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                guidelines: data.data.items,
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

