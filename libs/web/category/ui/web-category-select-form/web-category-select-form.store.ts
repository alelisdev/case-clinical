
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCategoryInput,
  UserUpdateCategoryInput,
  Category,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CategoryFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  categories: Category[]
}

@Injectable()
export class WebCategorySelectFormStore extends ComponentStore<CategoryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      categories: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly categories$ = this.select((s) => s.categories)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.categories$,
    (errors, loading, categories) => ({
      errors,
      loading,
      categories
    }),
    { debounce: true },
  )

  addNewCategory = this.updater((state, category: Category) => ({ categories: [...state.categories, category] }))

  updateCategory = this.updater((state, category: Category) => {
    return {
      ...state,
      categories: state.categories.map((el) => {
        if (el.id === category.id) {
          return category
        } else {
          return el
        }
      }),
    }
  })

  readonly createCategoryEffect = this.effect<{ input: UserCreateCategoryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCategory({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCategory(res.data.created)
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

  readonly updateCategoryEffect = this.effect<{ input: UserUpdateCategoryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCategory({ categoryId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCategory(res.data.updated)
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

  loadCategoriesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCategories({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                categories: data.data.items,
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

