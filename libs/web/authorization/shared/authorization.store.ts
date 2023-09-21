
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { AuthorizationService } from './authorization.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateAuthorizationInput, UserUpdateAuthorizationInput, WebCoreDataAccessService, CorePaging, Authorization, Vendor,AuthorizationCategory,AuthorizationType,Procedure } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface AuthorizationFeatureState {
  errors?: any
  loading?: boolean
  item?: Authorization
  done: boolean,
  formName?: string
  vendorName?: string,
vendorId?: string,authorizationCategoryId?: string,authorizationTypeId?: string,procedureId?: string,
  authorizations: Authorization[]
 vendors?: Vendor[],
 authorizationCategories?: AuthorizationCategory[],
 authorizationTypes?: AuthorizationType[],
 procedures?: Procedure[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebAuthorizationFeatureStore extends ComponentStore<AuthorizationFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly authorizationService: AuthorizationService
) {
    super({
      loading: false,
      authorizations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
vendorId: undefined,
authorizationCategoryId: undefined,
authorizationTypeId: undefined,
procedureId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('authorizationId')) {
      var authorizationId = this.route.snapshot.paramMap.get('authorizationId')
      this.setFormName('authorization_edit')
    } else {
      this.setFormName('authorization_create')
    }


    if(this.route.snapshot.paramMap.has("vendorId")) {
      var vendorId = this.route.snapshot.paramMap.get("vendorId")
      this.setVendorId(vendorId)
    }


    if(this.route.snapshot.paramMap.has("authorizationCategoryId")) {
      var authorizationCategoryId = this.route.snapshot.paramMap.get("authorizationCategoryId")
      this.setAuthorizationCategoryId(authorizationCategoryId)
    }


    if(this.route.snapshot.paramMap.has("authorizationTypeId")) {
      var authorizationTypeId = this.route.snapshot.paramMap.get("authorizationTypeId")
      this.setAuthorizationTypeId(authorizationTypeId)
    }


    if(this.route.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("procedureId")
      this.setProcedureId(procedureId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly authorizations$ = this.select((s) => s.authorizations)
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly authorizationCategories$ = this.select((s) => s.authorizationCategories || [])
  readonly authorizationTypes$ = this.select((s) => s.authorizationTypes || [])
  readonly procedures$ = this.select((s) => s.procedures || [])

readonly vendorId$ = this.select((s) => s.vendorId)
readonly vendorName$ = this.select((s) => s.vendorName)

readonly authorizationCategoryId$ = this.select((s) => s.authorizationCategoryId)

readonly authorizationTypeId$ = this.select((s) => s.authorizationTypeId)

readonly procedureId$ = this.select((s) => s.procedureId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.authorizations$,
this.vendors$,this.authorizationCategories$,this.authorizationTypes$,this.procedures$,
    (errors, loading, item, formName, authorizations, vendors,authorizationCategories,authorizationTypes,procedures ) => ({
    errors,
    loading,
    item,
    formName,
    authorizations,

            vendors,authorizationCategories,authorizationTypes,procedures
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.vendorId$,
this.authorizationCategoryId$,
this.authorizationTypeId$,
this.procedureId$, this.searchQuery$, this.vendorName$, (paging, vendorId,
authorizationCategoryId,
authorizationTypeId,
procedureId,searchQuery, vendorName) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorName,
    vendorId: vendorId,authorizationCategoryId: authorizationCategoryId,authorizationTypeId: authorizationTypeId,procedureId: procedureId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setVendorId = this.updater((state, vendorId: string) => ({
                ...state,
    vendorId,
  }))
            readonly setVendorName = this.updater((state, vendorName: string) => ({
                ...state,
                vendorName,
  }))


            readonly setAuthorizationCategoryId = this.updater((state, authorizationCategoryId: string) => ({
                ...state,
    authorizationCategoryId,
  }))


            readonly setAuthorizationTypeId = this.updater((state, authorizationTypeId: string) => ({
                ...state,
    authorizationTypeId,
  }))


            readonly setProcedureId = this.updater((state, procedureId: string) => ({
                ...state,
    procedureId,
  }))



  readonly filterVendors = (term) =>
        this.data.userSelectVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let vendors = res.data.items;
              this.patchState({vendors})
              return vendors
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


  readonly filterAuthorizationCategories = (term) =>
        this.data.userSelectAuthorizationCategories({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let authorizationCategories = res.data.items;
              this.patchState({authorizationCategories})
              return authorizationCategories
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


  readonly filterAuthorizationTypes = (term) =>
        this.data.userSelectAuthorizationTypes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let authorizationTypes = res.data.items;
              this.patchState({authorizationTypes})
              return authorizationTypes
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


  readonly filterProcedures = (term) =>
        this.data.userSelectProcedures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedures = res.data.items;
              this.patchState({procedures})
              return procedures
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



  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))


  readonly addAuthorizationCategory = this.updater((state, authorizationCategory: AuthorizationCategory) => ({
    ...state, authorizationCategories: state.authorizationCategories.concat(authorizationCategory)
  }))


  readonly addAuthorizationType = this.updater((state, authorizationType: AuthorizationType) => ({
    ...state, authorizationTypes: state.authorizationTypes.concat(authorizationType)
  }))


  readonly addProcedure = this.updater((state, procedure: Procedure) => ({
    ...state, procedures: state.procedures.concat(procedure)
  }))



  readonly setItem = this.updater((state, item: Authorization) => ({...state, item}))

  addNewAuthorization = this.updater((state, authorization: Authorization) => ({ ...state, authorizations: [...state.authorizations, authorization] }))

  updateAuthorization = this.updater((state, authorization: Authorization) => {
    return {
      ...state,
      authorizations: state.authorizations.map((el) => {
        if (el.id === authorization.id) {
          return authorization
        } else {
          return el
        }
      }),
    }
  })

  addAuthorizations = this.updater((state, newAuthorizations: any[]) => ({...state, authorizations: state.authorizations.concat(newAuthorizations) }))
  updateAuthorizations = this.updater((state, updatedAuthorizations: any[]) => {
    return {
      ...state,
      authorizations: state.authorizations.map((authorization) => {
        const updated = updatedAuthorizations.find((el) => el.id === authorization.id);
        return updated ? updated : authorization;
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
        return this.authorizationService.validateAuthorizationExcelData(excelData, vm.vendors,vm.authorizationCategories,vm.authorizationTypes,vm.procedures);
      })
    )
  }


  readonly loadAuthorizationEffect = this.effect<string>((authorizationId$) =>
    authorizationId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((authorizationId) =>
        this.data.userAuthorization({ authorizationId }).pipe(
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



  readonly loadAuthorizationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userAuthorizations({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                authorizations: res.data.items,
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

  readonly createAuthorizationEffect = this.effect<UserCreateAuthorizationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.authorizationService.createAuthorization({...input }).pipe(
          tapResponse(
            (authorization: Authorization) => {
              this.addNewAuthorization(authorization)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: authorization, loading: false, done: true }), 300);
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

    readonly updateAuthorizationEffect = this.effect<UserUpdateAuthorizationInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.authorizationService.updateAuthorization(input, input.id).pipe(
              tapResponse(
                (authorization) => {
                  this.updateAuthorization(authorization)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: authorization, loading: false, done: true }), 300);
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

    readonly deleteAuthorizationEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, authorization]) => {
          return this.data.userDeleteAuthorization({authorizationId: authorization.id})
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

  readonly importExcelEffect = this.effect<UserUpdateAuthorizationInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.authorizationService.importAuthorizations(data).pipe(
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

            this.addAuthorizations(created);
            this.updateAuthorizations(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
