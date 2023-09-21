
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RecommendedOrderService } from './recommended-order.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRecommendedOrderInput, UserUpdateRecommendedOrderInput, WebCoreDataAccessService, CorePaging, RecommendedOrder,  } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RecommendedOrderFeatureState {
  errors?: any
  loading?: boolean
  item?: RecommendedOrder
  done: boolean,
   formName?: string
   vendorName?: string


  recommendedOrders: RecommendedOrder[]

  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRecommendedOrderFeatureStore extends ComponentStore<RecommendedOrderFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly recommendedOrderService: RecommendedOrderService
) {
    super({
      loading: false,
      recommendedOrders: [],
      done: false,
      searchQuery: '',
      formName: undefined,

      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('recommendedOrderId')) {
      var recommendedOrderId = this.route.snapshot.paramMap.get('recommendedOrderId')
      this.setFormName('recommendedOrder_edit')
    } else {
      this.setFormName('recommendedOrder_create')
    }




  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly recommendedOrders$ = this.select((s) => s.recommendedOrders)


  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)
  readonly vendorName$ = this.select((s) => s.vendorName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.recommendedOrders$,

    (errors, loading, item, formName, recommendedOrders,  ) => ({
    errors,
    loading,
    item,
    formName,
    recommendedOrders,


  }),
{debounce: true})

  readonly input$ = this.select(this.paging$,  this.searchQuery$, this.vendorName$, (paging, searchQuery, vendorName) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    vendorName,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))
  readonly setVendorName = this.updater((state, vendorName: string) => ({
    ...state,
    vendorName,
  }))









  readonly setItem = this.updater((state, item: RecommendedOrder) => ({...state, item}))

  addNewRecommendedOrder = this.updater((state, recommendedOrder: RecommendedOrder) => ({ ...state, recommendedOrders: [...state.recommendedOrders, recommendedOrder] }))

  updateRecommendedOrder = this.updater((state, recommendedOrder: RecommendedOrder) => {
    return {
      ...state,
      recommendedOrders: state.recommendedOrders.map((el) => {
        if (el.id === recommendedOrder.id) {
          return recommendedOrder
        } else {
          return el
        }
      }),
    }
  })

  addRecommendedOrders = this.updater((state, newRecommendedOrders: any[]) => ({...state, recommendedOrders: state.recommendedOrders.concat(newRecommendedOrders) }))
  updateRecommendedOrders = this.updater((state, updatedRecommendedOrders: any[]) => {
    return {
      ...state,
      recommendedOrders: state.recommendedOrders.map((recommendedOrder) => {
        const updated = updatedRecommendedOrders.find((el) => el.id === recommendedOrder.id);
        return updated ? updated : recommendedOrder;
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
        return this.recommendedOrderService.validateRecommendedOrderExcelData(excelData);
      })
    )
  }


  readonly loadRecommendedOrderEffect = this.effect<string>((recommendedOrderId$) =>
    recommendedOrderId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((recommendedOrderId) =>
        this.data.userRecommendedOrder({ recommendedOrderId }).pipe(
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



  readonly loadRecommendedOrdersEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRecommendedOrders({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                recommendedOrders: res.data.items,
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

  readonly createRecommendedOrderEffect = this.effect<UserCreateRecommendedOrderInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.recommendedOrderService.createRecommendedOrder({...input }).pipe(
          tapResponse(
            (recommendedOrder: RecommendedOrder) => {
              this.addNewRecommendedOrder(recommendedOrder)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: recommendedOrder, loading: false, done: true }), 300);
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

    readonly updateRecommendedOrderEffect = this.effect<UserUpdateRecommendedOrderInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.recommendedOrderService.updateRecommendedOrder(input, input.id).pipe(
              tapResponse(
                (recommendedOrder) => {
                  this.updateRecommendedOrder(recommendedOrder)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: recommendedOrder, loading: false, done: true }), 300);
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

    readonly deleteRecommendedOrderEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, recommendedOrder]) => {
          return this.data.userDeleteRecommendedOrder({recommendedOrderId: recommendedOrder.id})
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

  readonly importExcelEffect = this.effect<UserUpdateRecommendedOrderInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.recommendedOrderService.importRecommendedOrders(data).pipe(
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

            this.addRecommendedOrders(created);
            this.updateRecommendedOrders(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
