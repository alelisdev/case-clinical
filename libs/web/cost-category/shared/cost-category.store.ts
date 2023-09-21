
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { CostCategoryService } from './cost-category.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateCostCategoryInput, UserUpdateCostCategoryInput, WebCoreDataAccessService, CorePaging, CostCategory,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface CostCategoryFeatureState {
  errors?: any
  loading?: boolean
  item?: CostCategory
  done: boolean,
  formName?: string

  costCategories: CostCategory[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebCostCategoryFeatureStore extends ComponentStore<CostCategoryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly costCategoryService: CostCategoryService
) {
    super({ 
      loading: false,
      costCategories: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('costCategoryId')) {
      var costCategoryId = this.route.snapshot.paramMap.get('costCategoryId')
      this.setFormName('costCategory_edit')
    } else {
      this.setFormName('costCategory_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly costCategories$ = this.select((s) => s.costCategories)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.costCategories$,

    (errors, loading, item, formName, costCategories,  ) => ({
    errors,
    loading,
    item,
    formName,
    costCategories,

            
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







    

  readonly setItem = this.updater((state, item: CostCategory) => ({...state, item}))

  addNewCostCategory = this.updater((state, costCategory: CostCategory) => ({ ...state, costCategories: [...state.costCategories, costCategory] }))

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

  addCostCategories = this.updater((state, newCostCategories: any[]) => ({...state, costCategories: state.costCategories.concat(newCostCategories) }))
  updateCostCategories = this.updater((state, updatedCostCategories: any[]) => {
    return {
      ...state,
      costCategories: state.costCategories.map((costCategory) => {
        const updated = updatedCostCategories.find((el) => el.id === costCategory.id);
        return updated ? updated : costCategory;
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
        return this.costCategoryService.validateCostCategoryExcelData(excelData);
      })
    )
  }


  readonly loadCostCategoryEffect = this.effect<string>((costCategoryId$) =>
    costCategoryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((costCategoryId) =>
        this.data.userCostCategory({ costCategoryId }).pipe(
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



  readonly loadCostCategoriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userCostCategories({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                costCategories: res.data.items,
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

  readonly createCostCategoryEffect = this.effect<UserCreateCostCategoryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.costCategoryService.createCostCategory({...input }).pipe(
          tapResponse(
            (costCategory: CostCategory) => {
              this.addNewCostCategory(costCategory)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: costCategory, loading: false, done: true }), 300);
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

    readonly updateCostCategoryEffect = this.effect<UserUpdateCostCategoryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.costCategoryService.updateCostCategory(input, input.id).pipe(
              tapResponse(
                (costCategory) => {
                  this.updateCostCategory(costCategory)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: costCategory, loading: false, done: true }), 300);
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
  
    readonly deleteCostCategoryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, costCategory]) => {
          return this.data.userDeleteCostCategory({costCategoryId: costCategory.id})
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

  readonly importExcelEffect = this.effect<UserUpdateCostCategoryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.costCategoryService.importCostCategories(data).pipe(
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

            this.addCostCategories(created);
            this.updateCostCategories(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
