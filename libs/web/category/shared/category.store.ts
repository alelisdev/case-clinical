
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CategoryService } from './category.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCategoryInput, UserUpdateCategoryInput, WebCoreDataAccessService, CorePaging, Category,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CategoryFeatureState {
  errors?: any
  loading?: boolean
  item?: Category
  done: boolean,
  formName?: string

  categories: Category[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCategoryFeatureStore extends ComponentStore<CategoryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly categoryService: CategoryService
) {
    super({ 
      loading: false,
      categories: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('categoryId')) {
      var categoryId = this.route.snapshot.paramMap.get('categoryId')
      this.setFormName('category_edit')
    } else {
      this.setFormName('category_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly categories$ = this.select((s) => s.categories)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.categories$,

    (errors, loading, item, formName, categories,  ) => ({
    errors,
    loading,
    item,
    formName,
    categories,

            
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))







    

  readonly setItem = this.updater((state, item: Category) => ({...state, item}))

  addNewCategory = this.updater((state, category: Category) => ({ ...state, categories: [...state.categories, category] }))

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

  addCategories = this.updater((state, newCategories: any[]) => ({...state, categories: state.categories.concat(newCategories) }))
  updateCategories = this.updater((state, updatedCategories: any[]) => {
    return {
      ...state,
      categories: state.categories.map((category) => {
        const updated = updatedCategories.find((el) => el.id === category.id);
        return updated ? updated : category;
      })
    }
  })

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery
  }))

  validateImportData(excelData: any[]) {
    return this.vm$.pipe(
      switchMap((vm) => {
        return this.categoryService.validateCategoryExcelData(excelData);
      })
    )
  }


  readonly loadCategoryEffect = this.effect<string>((categoryId$) =>
    categoryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((categoryId) =>
        this.data.userCategory({ categoryId }).pipe(
          tapResponse(
            (res) => {
                    this.patchState({ 
                    item: res.data.item, 
                    errors: res.errors, 
                    loading: false 
                })
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



  readonly loadCategoriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCategories({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                categories: res.data.items,
                errors: res.errors,
                loading: false,
              }),
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

  readonly createCategoryEffect = this.effect<UserCreateCategoryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.categoryService.createCategory({...input }).pipe(
          tapResponse(
            (category: Category) => {
              this.addNewCategory(category)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: category, loading: false, done: true }), 300);
              setTimeout(() => this.patchState({ done: false, item: null }), 600);
            },
            (errors: any) => {
              if (errors.graphQLErrors) {
                this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                this.patchState({
                  loading: false,
                  errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                })
              } else {
                this.toast.error(errors.Message)
                this.formService.setErrors(errors.Data)
              }
            }
          ),
        ),
      ),
    ),
  )

    readonly updateCategoryEffect = this.effect<UserUpdateCategoryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.categoryService.updateCategory(input, input.id).pipe(
              tapResponse(
                (category) => {
                  this.updateCategory(category)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: category, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                      this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                      this.patchState({
                        loading: false,
                        errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                      })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }
              ),
            ),
          ),
        ),
      )
  
    readonly deleteCategoryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, category]) => {
          return this.data.userDeleteCategory({categoryId: category.id})
            .pipe(
              tapResponse(
                (res) => {
                  this.toast.success("Deleted successfully!", { duration: 3000 })
                  setTimeout(() => this.patchState({ item: res.data.deleted, loading: false, done: true }), 300);
                  setTimeout(() => this.patchState({ done: false, item: null }), 600);
                },
                (errors: any) => {
                  if (errors.graphQLErrors) {
                    this.toast.error(errors.graphQLErrors[0].message, { duration: 3000 })
                    this.patchState({
                      loading: false,
                      errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
                    })
                  } else {
                    this.toast.error(errors.Message)
                    this.formService.setErrors(errors.Data)
                  }
                }),
            )}
        ),
      ),
  )

  readonly importExcelEffect = this.effect<UserUpdateCategoryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.categoryService.importCategories(data).pipe(
        catchError(error => {
          this.toast.error(error.Message ?? 'Failed to save', { duration: 3000 })
          return EMPTY;
        }),
        tap(
          (updateResult) => {
            const created = JSON.parse(updateResult.created);
            const updated = JSON.parse(updateResult.updated);
            const failed = JSON.parse(updateResult.failed);
            const total = created.length + updated.length + failed.length;

            this.addCategories(created);
            this.updateCategories(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
