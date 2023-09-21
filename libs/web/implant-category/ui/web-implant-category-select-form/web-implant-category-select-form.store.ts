
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateImplantCategoryInput,
  UserUpdateImplantCategoryInput,
  ImplantCategory,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ImplantCategoryFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  implantCategories: ImplantCategory[]
}

@Injectable()
export class WebImplantCategorySelectFormStore extends ComponentStore<ImplantCategoryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      implantCategories: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly implantCategories$ = this.select((s) => s.implantCategories)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.implantCategories$,
    (errors, loading, implantCategories) => ({
      errors,
      loading,
      implantCategories
    }),
    { debounce: true },
  )

  addNewImplantCategory = this.updater((state, implantCategory: ImplantCategory) => ({ implantCategories: [...state.implantCategories, implantCategory] }))

  updateImplantCategory = this.updater((state, implantCategory: ImplantCategory) => {
    return {
      ...state,
      implantCategories: state.implantCategories.map((el) => {
        if (el.id === implantCategory.id) {
          return implantCategory
        } else {
          return el
        }
      }),
    }
  })

  readonly createImplantCategoryEffect = this.effect<{ input: UserCreateImplantCategoryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateImplantCategory({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewImplantCategory(res.data.created)
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

  readonly updateImplantCategoryEffect = this.effect<{ input: UserUpdateImplantCategoryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateImplantCategory({ implantCategoryId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateImplantCategory(res.data.updated)
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

  loadImplantCategoriesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userImplantCategories({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                implantCategories: data.data.items,
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

