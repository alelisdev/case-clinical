
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { ImplantCategoryService } from './implant-category.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateImplantCategoryInput, UserUpdateImplantCategoryInput, WebCoreDataAccessService, CorePaging, ImplantCategory,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface ImplantCategoryFeatureState {
  errors?: any
  loading?: boolean
  item?: ImplantCategory
  done: boolean,
  formName?: string

  implantCategories: ImplantCategory[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebImplantCategoryFeatureStore extends ComponentStore<ImplantCategoryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly implantCategoryService: ImplantCategoryService
) {
    super({ 
      loading: false,
      implantCategories: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('implantCategoryId')) {
      var implantCategoryId = this.route.snapshot.paramMap.get('implantCategoryId')
      this.setFormName('implantCategory_edit')
    } else {
      this.setFormName('implantCategory_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly implantCategories$ = this.select((s) => s.implantCategories)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.implantCategories$,

    (errors, loading, item, formName, implantCategories,  ) => ({
    errors,
    loading,
    item,
    formName,
    implantCategories,

            
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







    

  readonly setItem = this.updater((state, item: ImplantCategory) => ({...state, item}))

  addNewImplantCategory = this.updater((state, implantCategory: ImplantCategory) => ({ ...state, implantCategories: [...state.implantCategories, implantCategory] }))

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

  addImplantCategories = this.updater((state, newImplantCategories: any[]) => ({...state, implantCategories: state.implantCategories.concat(newImplantCategories) }))
  updateImplantCategories = this.updater((state, updatedImplantCategories: any[]) => {
    return {
      ...state,
      implantCategories: state.implantCategories.map((implantCategory) => {
        const updated = updatedImplantCategories.find((el) => el.id === implantCategory.id);
        return updated ? updated : implantCategory;
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
        return this.implantCategoryService.validateImplantCategoryExcelData(excelData);
      })
    )
  }


  readonly loadImplantCategoryEffect = this.effect<string>((implantCategoryId$) =>
    implantCategoryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((implantCategoryId) =>
        this.data.userImplantCategory({ implantCategoryId }).pipe(
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



  readonly loadImplantCategoriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userImplantCategories({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                implantCategories: res.data.items,
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

  readonly createImplantCategoryEffect = this.effect<UserCreateImplantCategoryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.implantCategoryService.createImplantCategory({...input }).pipe(
          tapResponse(
            (implantCategory: ImplantCategory) => {
              this.addNewImplantCategory(implantCategory)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: implantCategory, loading: false, done: true }), 300);
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

    readonly updateImplantCategoryEffect = this.effect<UserUpdateImplantCategoryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.implantCategoryService.updateImplantCategory(input, input.id).pipe(
              tapResponse(
                (implantCategory) => {
                  this.updateImplantCategory(implantCategory)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: implantCategory, loading: false, done: true }), 300);
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
  
    readonly deleteImplantCategoryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, implantCategory]) => {
          return this.data.userDeleteImplantCategory({implantCategoryId: implantCategory.id})
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

  readonly importExcelEffect = this.effect<UserUpdateImplantCategoryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.implantCategoryService.importImplantCategories(data).pipe(
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

            this.addImplantCategories(created);
            this.updateImplantCategories(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
