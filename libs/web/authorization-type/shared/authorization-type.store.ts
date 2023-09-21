
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AuthorizationTypeService } from './authorization-type.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAuthorizationTypeInput, UserUpdateAuthorizationTypeInput, WebCoreDataAccessService, CorePaging, AuthorizationType,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AuthorizationTypeFeatureState {
  errors?: any
  loading?: boolean
  item?: AuthorizationType
  done: boolean,
  formName?: string

  authorizationTypes: AuthorizationType[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAuthorizationTypeFeatureStore extends ComponentStore<AuthorizationTypeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationTypeService: AuthorizationTypeService
) {
    super({
      loading: false,
      authorizationTypes: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('authorizationTypeId')) {
      var authorizationTypeId = this.route.snapshot.paramMap.get('authorizationTypeId')
      this.setFormName('authorizationType_edit')
    } else {
      this.setFormName('authorizationType_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly authorizationTypes$ = this.select((s) => s.authorizationTypes)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizationTypes$,

    (errors, loading, item, formName, authorizationTypes,  ) => ({
    errors,
    loading,
    item,
    formName,
    authorizationTypes,


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









  readonly setItem = this.updater((state, item: AuthorizationType) => ({...state, item}))

  addNewAuthorizationType = this.updater((state, authorizationType: AuthorizationType) => ({ ...state, authorizationTypes: [...state.authorizationTypes, authorizationType] }))

  updateAuthorizationType = this.updater((state, authorizationType: AuthorizationType) => {
    return {
      ...state,
      authorizationTypes: state.authorizationTypes.map((el) => {
        if (el.id === authorizationType.id) {
          return authorizationType
        } else {
          return el
        }
      }),
    }
  })

  addAuthorizationTypes = this.updater((state, newAuthorizationTypes: any[]) => ({...state, authorizationTypes: state.authorizationTypes.concat(newAuthorizationTypes) }))
  updateAuthorizationTypes = this.updater((state, updatedAuthorizationTypes: any[]) => {
    return {
      ...state,
      authorizationTypes: state.authorizationTypes.map((authorizationType) => {
        const updated = updatedAuthorizationTypes.find((el) => el.id === authorizationType.id);
        return updated ? updated : authorizationType;
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
        return this.authorizationTypeService.validateAuthorizationTypeExcelData(excelData);
      })
    )
  }


  readonly loadAuthorizationTypeEffect = this.effect<string>((authorizationTypeId$) =>
    authorizationTypeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((authorizationTypeId) =>
        this.data.userAuthorizationType({ authorizationTypeId }).pipe(
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



  readonly loadAuthorizationTypesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizationTypes({input}).pipe(
          tapResponse(
            (res) => {
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                authorizationTypes: res.data.items,
                errors: res.errors,
                loading: false,
              })
            }
              ,
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

  readonly createAuthorizationTypeEffect = this.effect<UserCreateAuthorizationTypeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.authorizationTypeService.createAuthorizationType({...input }).pipe(
          tapResponse(
            (authorizationType: AuthorizationType) => {
              this.addNewAuthorizationType(authorizationType)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: authorizationType, loading: false, done: true }), 300);
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

    readonly updateAuthorizationTypeEffect = this.effect<UserUpdateAuthorizationTypeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.authorizationTypeService.updateAuthorizationType(input, input.id).pipe(
              tapResponse(
                (authorizationType) => {
                  this.updateAuthorizationType(authorizationType)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: authorizationType, loading: false, done: true }), 300);
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

    readonly deleteAuthorizationTypeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, authorizationType]) => {
          return this.data.userDeleteAuthorizationType({authorizationTypeId: authorizationType.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAuthorizationTypeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationTypeService.importAuthorizationTypes(data).pipe(
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

            this.addAuthorizationTypes(created);
            this.updateAuthorizationTypes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
