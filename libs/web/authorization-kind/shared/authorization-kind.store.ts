
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AuthorizationKindService } from './authorization-kind.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAuthorizationKindInput, UserUpdateAuthorizationKindInput, WebCoreDataAccessService, CorePaging, AuthorizationKind, Category } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AuthorizationKindFeatureState {
  errors?: any
  loading?: boolean
  item?: AuthorizationKind
  done: boolean,
  formName?: string
categoryId?: string,
  authorizationKinds: AuthorizationKind[]
 categories?: Category[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAuthorizationKindFeatureStore extends ComponentStore<AuthorizationKindFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationKindService: AuthorizationKindService
) {
    super({ 
      loading: false,
      authorizationKinds: [],
      done: false,
      searchQuery: '',
      formName: undefined,
categoryId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('authorizationKindId')) {
      var authorizationKindId = this.route.snapshot.paramMap.get('authorizationKindId')
      this.setFormName('authorizationKind_edit')
    } else {
      this.setFormName('authorizationKind_create')
    }


    if(this.route.snapshot.paramMap.has("categoryId")) {
      var categoryId = this.route.snapshot.paramMap.get("categoryId")
      this.setCategoryId(categoryId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly authorizationKinds$ = this.select((s) => s.authorizationKinds)
  readonly categories$ = this.select((s) => s.categories || [])

readonly categoryId$ = this.select((s) => s.categoryId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationKinds$,
this.categories$,
    (errors, loading, item, formName, authorizationKinds, categories ) => ({
    errors,
    loading,
    item,
    formName,
    authorizationKinds,

            categories
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.categoryId$, this.searchQuery$, (paging, categoryId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    categoryId: categoryId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setCategoryId = this.updater((state, categoryId: string) => ({
                ...state,
    categoryId,
  }))



  readonly filterCategories = (term) => 
        this.data.userSelectCategories({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let categories = res.data.items;
              this.patchState({categories})
              return categories
            },
            (errors: any) =>
              this.patchState({
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        map(result => {
          return result.data.items;
        })
  )



  readonly addCategory = this.updater((state, category: Category) => ({
    ...state, categories: state.categories.concat(category)
  }))

    

  readonly setItem = this.updater((state, item: AuthorizationKind) => ({...state, item}))

  addNewAuthorizationKind = this.updater((state, authorizationKind: AuthorizationKind) => ({ ...state, authorizationKinds: [...state.authorizationKinds, authorizationKind] }))

  updateAuthorizationKind = this.updater((state, authorizationKind: AuthorizationKind) => {
    return {
      ...state,
      authorizationKinds: state.authorizationKinds.map((el) => {
        if (el.id === authorizationKind.id) {
          return authorizationKind
        } else {
          return el
        }
      }),
    }
  })

  addAuthorizationKinds = this.updater((state, newAuthorizationKinds: any[]) => ({...state, authorizationKinds: state.authorizationKinds.concat(newAuthorizationKinds) }))
  updateAuthorizationKinds = this.updater((state, updatedAuthorizationKinds: any[]) => {
    return {
      ...state,
      authorizationKinds: state.authorizationKinds.map((authorizationKind) => {
        const updated = updatedAuthorizationKinds.find((el) => el.id === authorizationKind.id);
        return updated ? updated : authorizationKind;
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
        return this.authorizationKindService.validateAuthorizationKindExcelData(excelData, vm.categories);
      })
    )
  }


  readonly loadAuthorizationKindEffect = this.effect<string>((authorizationKindId$) =>
    authorizationKindId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((authorizationKindId) =>
        this.data.userAuthorizationKind({ authorizationKindId }).pipe(
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



  readonly loadAuthorizationKindsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizationKinds({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                authorizationKinds: res.data.items,
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

  readonly createAuthorizationKindEffect = this.effect<UserCreateAuthorizationKindInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.authorizationKindService.createAuthorizationKind({...input }).pipe(
          tapResponse(
            (authorizationKind: AuthorizationKind) => {
              this.addNewAuthorizationKind(authorizationKind)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: authorizationKind, loading: false, done: true }), 300);
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

    readonly updateAuthorizationKindEffect = this.effect<UserUpdateAuthorizationKindInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.authorizationKindService.updateAuthorizationKind(input, input.id).pipe(
              tapResponse(
                (authorizationKind) => {
                  this.updateAuthorizationKind(authorizationKind)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: authorizationKind, loading: false, done: true }), 300);
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
  
    readonly deleteAuthorizationKindEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, authorizationKind]) => {
          return this.data.userDeleteAuthorizationKind({authorizationKindId: authorizationKind.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAuthorizationKindInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationKindService.importAuthorizationKinds(data).pipe(
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

            this.addAuthorizationKinds(created);
            this.updateAuthorizationKinds(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
