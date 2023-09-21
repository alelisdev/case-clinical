
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AuthorizationCategoryService } from './authorization-category.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAuthorizationCategoryInput, UserUpdateAuthorizationCategoryInput, WebCoreDataAccessService, CorePaging, AuthorizationCategory,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AuthorizationCategoryFeatureState {
  errors?: any
  loading?: boolean
  item?: AuthorizationCategory
  done: boolean,
  formName?: string

  authorizationCategories: AuthorizationCategory[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAuthorizationCategoryFeatureStore extends ComponentStore<AuthorizationCategoryFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationCategoryService: AuthorizationCategoryService
) {
    super({ 
      loading: false,
      authorizationCategories: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('authorizationCategoryId')) {
      var authorizationCategoryId = this.route.snapshot.paramMap.get('authorizationCategoryId')
      this.setFormName('authorizationCategory_edit')
    } else {
      this.setFormName('authorizationCategory_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly authorizationCategories$ = this.select((s) => s.authorizationCategories)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationCategories$,

    (errors, loading, item, formName, authorizationCategories,  ) => ({
    errors,
    loading,
    item,
    formName,
    authorizationCategories,

            
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







    

  readonly setItem = this.updater((state, item: AuthorizationCategory) => ({...state, item}))

  addNewAuthorizationCategory = this.updater((state, authorizationCategory: AuthorizationCategory) => ({ ...state, authorizationCategories: [...state.authorizationCategories, authorizationCategory] }))

  updateAuthorizationCategory = this.updater((state, authorizationCategory: AuthorizationCategory) => {
    return {
      ...state,
      authorizationCategories: state.authorizationCategories.map((el) => {
        if (el.id === authorizationCategory.id) {
          return authorizationCategory
        } else {
          return el
        }
      }),
    }
  })

  addAuthorizationCategories = this.updater((state, newAuthorizationCategories: any[]) => ({...state, authorizationCategories: state.authorizationCategories.concat(newAuthorizationCategories) }))
  updateAuthorizationCategories = this.updater((state, updatedAuthorizationCategories: any[]) => {
    return {
      ...state,
      authorizationCategories: state.authorizationCategories.map((authorizationCategory) => {
        const updated = updatedAuthorizationCategories.find((el) => el.id === authorizationCategory.id);
        return updated ? updated : authorizationCategory;
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
        return this.authorizationCategoryService.validateAuthorizationCategoryExcelData(excelData);
      })
    )
  }


  readonly loadAuthorizationCategoryEffect = this.effect<string>((authorizationCategoryId$) =>
    authorizationCategoryId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((authorizationCategoryId) =>
        this.data.userAuthorizationCategory({ authorizationCategoryId }).pipe(
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



  readonly loadAuthorizationCategoriesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizationCategories({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                authorizationCategories: res.data.items,
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

  readonly createAuthorizationCategoryEffect = this.effect<UserCreateAuthorizationCategoryInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.authorizationCategoryService.createAuthorizationCategory({...input }).pipe(
          tapResponse(
            (authorizationCategory: AuthorizationCategory) => {
              this.addNewAuthorizationCategory(authorizationCategory)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: authorizationCategory, loading: false, done: true }), 300);
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

    readonly updateAuthorizationCategoryEffect = this.effect<UserUpdateAuthorizationCategoryInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.authorizationCategoryService.updateAuthorizationCategory(input, input.id).pipe(
              tapResponse(
                (authorizationCategory) => {
                  this.updateAuthorizationCategory(authorizationCategory)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: authorizationCategory, loading: false, done: true }), 300);
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
  
    readonly deleteAuthorizationCategoryEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, authorizationCategory]) => {
          return this.data.userDeleteAuthorizationCategory({authorizationCategoryId: authorizationCategory.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAuthorizationCategoryInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationCategoryService.importAuthorizationCategories(data).pipe(
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

            this.addAuthorizationCategories(created);
            this.updateAuthorizationCategories(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
