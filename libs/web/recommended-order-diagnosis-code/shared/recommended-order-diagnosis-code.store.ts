
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { RecommendedOrderDiagnosisCodeService } from './recommended-order-diagnosis-code.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreateRecommendedOrderDiagnosisCodeInput, UserUpdateRecommendedOrderDiagnosisCodeInput, WebCoreDataAccessService, CorePaging, RecommendedOrderDiagnosisCode, DiagnosisCode,RecommendedOrder } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface RecommendedOrderDiagnosisCodeFeatureState {
  errors?: any
  loading?: boolean
  item?: RecommendedOrderDiagnosisCode
  done: boolean,
  formName?: string
diagnosisCodeId?: string,recommendedOrderId?: string,
  recommendedOrderDiagnosisCodes: RecommendedOrderDiagnosisCode[]
 diagnosisCodes?: DiagnosisCode[],
 recommendedOrders?: RecommendedOrder[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebRecommendedOrderDiagnosisCodeFeatureStore extends ComponentStore<RecommendedOrderDiagnosisCodeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly recommendedOrderDiagnosisCodeService: RecommendedOrderDiagnosisCodeService
) {
    super({ 
      loading: false,
      recommendedOrderDiagnosisCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
diagnosisCodeId: undefined,
recommendedOrderId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('recommendedOrderDiagnosisCodeId')) {
      var recommendedOrderDiagnosisCodeId = this.route.snapshot.paramMap.get('recommendedOrderDiagnosisCodeId')
      this.setFormName('recommendedOrderDiagnosisCode_edit')
    } else {
      this.setFormName('recommendedOrderDiagnosisCode_create')
    }


    if(this.route.snapshot.paramMap.has("diagnosisCodeId")) {
      var diagnosisCodeId = this.route.snapshot.paramMap.get("diagnosisCodeId")
      this.setDiagnosisCodeId(diagnosisCodeId)
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
  readonly recommendedOrderDiagnosisCodes$ = this.select((s) => s.recommendedOrderDiagnosisCodes)
  readonly diagnosisCodes$ = this.select((s) => s.diagnosisCodes || [])
  readonly recommendedOrders$ = this.select((s) => s.recommendedOrders || [])

readonly diagnosisCodeId$ = this.select((s) => s.diagnosisCodeId)

readonly recommendedOrderId$ = this.select((s) => s.recommendedOrderId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.recommendedOrderDiagnosisCodes$,
this.diagnosisCodes$,this.recommendedOrders$,
    (errors, loading, item, formName, recommendedOrderDiagnosisCodes, diagnosisCodes,recommendedOrders ) => ({
    errors,
    loading,
    item,
    formName,
    recommendedOrderDiagnosisCodes,

            diagnosisCodes,recommendedOrders
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.diagnosisCodeId$,
this.recommendedOrderId$, this.searchQuery$, (paging, diagnosisCodeId,
recommendedOrderId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    diagnosisCodeId: diagnosisCodeId,recommendedOrderId: recommendedOrderId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setDiagnosisCodeId = this.updater((state, diagnosisCodeId: string) => ({
                ...state,
    diagnosisCodeId,
  }))


            readonly setRecommendedOrderId = this.updater((state, recommendedOrderId: string) => ({
                ...state,
    recommendedOrderId,
  }))



  readonly filterDiagnosisCodes = (term) => 
        this.data.userSelectDiagnosisCodes({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let diagnosisCodes = res.data.items;
              this.patchState({diagnosisCodes})
              return diagnosisCodes
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



  readonly addDiagnosisCode = this.updater((state, diagnosisCode: DiagnosisCode) => ({
    ...state, diagnosisCodes: state.diagnosisCodes.concat(diagnosisCode)
  }))


  readonly addRecommendedOrder = this.updater((state, recommendedOrder: RecommendedOrder) => ({
    ...state, recommendedOrders: state.recommendedOrders.concat(recommendedOrder)
  }))

    

  readonly setItem = this.updater((state, item: RecommendedOrderDiagnosisCode) => ({...state, item}))

  addNewRecommendedOrderDiagnosisCode = this.updater((state, recommendedOrderDiagnosisCode: RecommendedOrderDiagnosisCode) => ({ ...state, recommendedOrderDiagnosisCodes: [...state.recommendedOrderDiagnosisCodes, recommendedOrderDiagnosisCode] }))

  updateRecommendedOrderDiagnosisCode = this.updater((state, recommendedOrderDiagnosisCode: RecommendedOrderDiagnosisCode) => {
    return {
      ...state,
      recommendedOrderDiagnosisCodes: state.recommendedOrderDiagnosisCodes.map((el) => {
        if (el.id === recommendedOrderDiagnosisCode.id) {
          return recommendedOrderDiagnosisCode
        } else {
          return el
        }
      }),
    }
  })

  addRecommendedOrderDiagnosisCodes = this.updater((state, newRecommendedOrderDiagnosisCodes: any[]) => ({...state, recommendedOrderDiagnosisCodes: state.recommendedOrderDiagnosisCodes.concat(newRecommendedOrderDiagnosisCodes) }))
  updateRecommendedOrderDiagnosisCodes = this.updater((state, updatedRecommendedOrderDiagnosisCodes: any[]) => {
    return {
      ...state,
      recommendedOrderDiagnosisCodes: state.recommendedOrderDiagnosisCodes.map((recommendedOrderDiagnosisCode) => {
        const updated = updatedRecommendedOrderDiagnosisCodes.find((el) => el.id === recommendedOrderDiagnosisCode.id);
        return updated ? updated : recommendedOrderDiagnosisCode;
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
        return this.recommendedOrderDiagnosisCodeService.validateRecommendedOrderDiagnosisCodeExcelData(excelData, vm.diagnosisCodes,vm.recommendedOrders);
      })
    )
  }


  readonly loadRecommendedOrderDiagnosisCodeEffect = this.effect<string>((recommendedOrderDiagnosisCodeId$) =>
    recommendedOrderDiagnosisCodeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((recommendedOrderDiagnosisCodeId) =>
        this.data.userRecommendedOrderDiagnosisCode({ recommendedOrderDiagnosisCodeId }).pipe(
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



  readonly loadRecommendedOrderDiagnosisCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userRecommendedOrderDiagnosisCodes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                recommendedOrderDiagnosisCodes: res.data.items,
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

  readonly createRecommendedOrderDiagnosisCodeEffect = this.effect<UserCreateRecommendedOrderDiagnosisCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.recommendedOrderDiagnosisCodeService.createRecommendedOrderDiagnosisCode({...input }).pipe(
          tapResponse(
            (recommendedOrderDiagnosisCode: RecommendedOrderDiagnosisCode) => {
              this.addNewRecommendedOrderDiagnosisCode(recommendedOrderDiagnosisCode)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: recommendedOrderDiagnosisCode, loading: false, done: true }), 300);
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

    readonly updateRecommendedOrderDiagnosisCodeEffect = this.effect<UserUpdateRecommendedOrderDiagnosisCodeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.recommendedOrderDiagnosisCodeService.updateRecommendedOrderDiagnosisCode(input, input.id).pipe(
              tapResponse(
                (recommendedOrderDiagnosisCode) => {
                  this.updateRecommendedOrderDiagnosisCode(recommendedOrderDiagnosisCode)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: recommendedOrderDiagnosisCode, loading: false, done: true }), 300);
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
  
    readonly deleteRecommendedOrderDiagnosisCodeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, recommendedOrderDiagnosisCode]) => {
          return this.data.userDeleteRecommendedOrderDiagnosisCode({recommendedOrderDiagnosisCodeId: recommendedOrderDiagnosisCode.id})
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

  readonly importExcelEffect = this.effect<UserUpdateRecommendedOrderDiagnosisCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.recommendedOrderDiagnosisCodeService.importRecommendedOrderDiagnosisCodes(data).pipe(
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

            this.addRecommendedOrderDiagnosisCodes(created);
            this.updateRecommendedOrderDiagnosisCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
