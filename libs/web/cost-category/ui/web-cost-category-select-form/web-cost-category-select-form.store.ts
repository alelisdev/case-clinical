
import { EventEmitter, Injectable } from '@angular/core'
import {
  WebCoreDataAccessService,
  UserCreateCostCategoryInput,
  UserUpdateCostCategoryInput,
  CostCategory,
} from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CostCategoryFormState {
  errors?: any
  loading?: boolean
  searchTerm?: string
  costCategories: CostCategory[]
}

@Injectable()
export class WebCostCategorySelectFormStore extends ComponentStore<CostCategoryFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      loading: false,
      costCategories: [],
    })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly costCategories$ = this.select((s) => s.costCategories)

  readonly vm$ = this.select(
    this.errors$,
    this.loading$,
    this.costCategories$,
    (errors, loading, costCategories) => ({
      errors,
      loading,
      costCategories
    }),
    { debounce: true },
  )

  addNewCostCategory = this.updater((state, costCategory: CostCategory) => ({ costCategories: [...state.costCategories, costCategory] }))

  updateCostCategory = this.updater((state, costCategory: CostCategory) => {
    return {
      ...state,
      costCategories: state.costCategories.map((el) => {
        if (el.id === costCategory.id) {
          return costCategory
        } else {
          return el
        }
      }),
    }
  })

  readonly createCostCategoryEffect = this.effect<{ input: UserCreateCostCategoryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userCreateCostCategory({ input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.addNewCostCategory(res.data.created)
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

  readonly updateCostCategoryEffect = this.effect<{ input: UserUpdateCostCategoryInput; resultEmitter: EventEmitter<any> }>(
    (data$) =>
      data$.pipe(
        tap(() => this.patchState({ loading: true })),
        switchMap((data) =>
          this.data.userUpdateCostCategory({ costCategoryId: data.input.id, input: data.input }).pipe(
            tapResponse(
              (res) => {
                this.updateCostCategory(res.data.updated)
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

  loadCostCategoriesEffect = this.effect<void>(($) =>
    $.pipe(
      tap(() => {
        this.patchState({ loading: true })
      }),
      switchMap(() =>
        this.data.userCostCategories({ input: {} }).pipe(
          tapResponse(
            (data) => {
              this.patchState({
                loading: false,
                costCategories: data.data.items,
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

