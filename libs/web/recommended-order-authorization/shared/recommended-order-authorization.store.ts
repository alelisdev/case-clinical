
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RecommendedOrderAuthorizationService } from './recommended-order-authorization.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRecommendedOrderAuthorizationInput, UserUpdateRecommendedOrderAuthorizationInput, WebCoreDataAccessService, CorePaging, RecommendedOrderAuthorization, Authorization,RecommendedOrder } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RecommendedOrderAuthorizationFeatureState {
  errors?: any
  loading?: boolean
  item?: RecommendedOrderAuthorization
  done: boolean,
  formName?: string
authorizationId?: string,recommendedOrderId?: string,
  recommendedOrderAuthorizations: RecommendedOrderAuthorization[]
 authorizations?: Authorization[],
 recommendedOrders?: RecommendedOrder[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRecommendedOrderAuthorizationFeatureStore extends ComponentStore<RecommendedOrderAuthorizationFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly recommendedOrderAuthorizationService: RecommendedOrderAuthorizationService
) {
    super({ 
      loading: false,
      recommendedOrderAuthorizations: [],
      done: false,
      searchQuery: '',
      formName: undefined,
authorizationId: undefined,
recommendedOrderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('recommendedOrderAuthorizationId')) {
      var recommendedOrderAuthorizationId = this.route.snapshot.paramMap.get('recommendedOrderAuthorizationId')
      this.setFormName('recommendedOrderAuthorization_edit')
    } else {
      this.setFormName('recommendedOrderAuthorization_create')
    }


    if(this.route.snapshot.paramMap.has("authorizationId")) {
      var authorizationId = this.route.snapshot.paramMap.get("authorizationId")
      this.setAuthorizationId(authorizationId)
    }


    if(this.route.snapshot.paramMap.has("recommendedOrderId")) {
      var recommendedOrderId = this.route.snapshot.paramMap.get("recommendedOrderId")
      this.setRecommendedOrderId(recommendedOrderId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly recommendedOrderAuthorizations$ = this.select((s) => s.recommendedOrderAuthorizations)
  readonly authorizations$ = this.select((s) => s.authorizations || [])
  readonly recommendedOrders$ = this.select((s) => s.recommendedOrders || [])

readonly authorizationId$ = this.select((s) => s.authorizationId)

readonly recommendedOrderId$ = this.select((s) => s.recommendedOrderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.recommendedOrderAuthorizations$,
this.authorizations$,this.recommendedOrders$,
    (errors, loading, item, formName, recommendedOrderAuthorizations, authorizations,recommendedOrders ) => ({
    errors,
    loading,
    item,
    formName,
    recommendedOrderAuthorizations,

            authorizations,recommendedOrders
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.authorizationId$,
this.recommendedOrderId$, this.searchQuery$, (paging, authorizationId,
recommendedOrderId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    authorizationId: authorizationId,recommendedOrderId: recommendedOrderId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setAuthorizationId = this.updater((state, authorizationId: string) => ({
                ...state,
    authorizationId,
  }))


            readonly setRecommendedOrderId = this.updater((state, recommendedOrderId: string) => ({
                ...state,
    recommendedOrderId,
  }))



  readonly filterAuthorizations = (term) => 
        this.data.userSelectAuthorizations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let authorizations = res.data.items;
              this.patchState({authorizations})
              return authorizations
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


  readonly filterRecommendedOrders = (term) => 
        this.data.userSelectRecommendedOrders({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let recommendedOrders = res.data.items;
              this.patchState({recommendedOrders})
              return recommendedOrders
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



  readonly addAuthorization = this.updater((state, authorization: Authorization) => ({
    ...state, authorizations: state.authorizations.concat(authorization)
  }))


  readonly addRecommendedOrder = this.updater((state, recommendedOrder: RecommendedOrder) => ({
    ...state, recommendedOrders: state.recommendedOrders.concat(recommendedOrder)
  }))

    

  readonly setItem = this.updater((state, item: RecommendedOrderAuthorization) => ({...state, item}))

  addNewRecommendedOrderAuthorization = this.updater((state, recommendedOrderAuthorization: RecommendedOrderAuthorization) => ({ ...state, recommendedOrderAuthorizations: [...state.recommendedOrderAuthorizations, recommendedOrderAuthorization] }))

  updateRecommendedOrderAuthorization = this.updater((state, recommendedOrderAuthorization: RecommendedOrderAuthorization) => {
    return {
      ...state,
      recommendedOrderAuthorizations: state.recommendedOrderAuthorizations.map((el) => {
        if (el.id === recommendedOrderAuthorization.id) {
          return recommendedOrderAuthorization
        } else {
          return el
        }
      }),
    }
  })

  addRecommendedOrderAuthorizations = this.updater((state, newRecommendedOrderAuthorizations: any[]) => ({...state, recommendedOrderAuthorizations: state.recommendedOrderAuthorizations.concat(newRecommendedOrderAuthorizations) }))
  updateRecommendedOrderAuthorizations = this.updater((state, updatedRecommendedOrderAuthorizations: any[]) => {
    return {
      ...state,
      recommendedOrderAuthorizations: state.recommendedOrderAuthorizations.map((recommendedOrderAuthorization) => {
        const updated = updatedRecommendedOrderAuthorizations.find((el) => el.id === recommendedOrderAuthorization.id);
        return updated ? updated : recommendedOrderAuthorization;
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
        return this.recommendedOrderAuthorizationService.validateRecommendedOrderAuthorizationExcelData(excelData, vm.authorizations,vm.recommendedOrders);
      })
    )
  }


  readonly loadRecommendedOrderAuthorizationEffect = this.effect<string>((recommendedOrderAuthorizationId$) =>
    recommendedOrderAuthorizationId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((recommendedOrderAuthorizationId) =>
        this.data.userRecommendedOrderAuthorization({ recommendedOrderAuthorizationId }).pipe(
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



  readonly loadRecommendedOrderAuthorizationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRecommendedOrderAuthorizations({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                recommendedOrderAuthorizations: res.data.items,
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

  readonly createRecommendedOrderAuthorizationEffect = this.effect<UserCreateRecommendedOrderAuthorizationInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.recommendedOrderAuthorizationService.createRecommendedOrderAuthorization({...input }).pipe(
          tapResponse(
            (recommendedOrderAuthorization: RecommendedOrderAuthorization) => {
              this.addNewRecommendedOrderAuthorization(recommendedOrderAuthorization)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: recommendedOrderAuthorization, loading: false, done: true }), 300);
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

    readonly updateRecommendedOrderAuthorizationEffect = this.effect<UserUpdateRecommendedOrderAuthorizationInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.recommendedOrderAuthorizationService.updateRecommendedOrderAuthorization(input, input.id).pipe(
              tapResponse(
                (recommendedOrderAuthorization) => {
                  this.updateRecommendedOrderAuthorization(recommendedOrderAuthorization)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: recommendedOrderAuthorization, loading: false, done: true }), 300);
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
  
    readonly deleteRecommendedOrderAuthorizationEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, recommendedOrderAuthorization]) => {
          return this.data.userDeleteRecommendedOrderAuthorization({recommendedOrderAuthorizationId: recommendedOrderAuthorization.id})
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

  readonly importExcelEffect = this.effect<UserUpdateRecommendedOrderAuthorizationInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.recommendedOrderAuthorizationService.importRecommendedOrderAuthorizations(data).pipe(
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

            this.addRecommendedOrderAuthorizations(created);
            this.updateRecommendedOrderAuthorizations(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
