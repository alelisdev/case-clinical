
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { EMPTY } from 'rxjs'
import { FormService } from '@case-clinical/web/ui/form'
import { Injectable } from '@angular/core'
import { PriorAuthorizationProcedureCodeService } from './prior-authorization-procedure-code.service'
import { Router, ActivatedRoute } from '@angular/router'
import { switchMap, tap, withLatestFrom, map, catchError } from 'rxjs/operators'
import { UserCreatePriorAuthorizationProcedureCodeInput, UserUpdatePriorAuthorizationProcedureCodeInput, WebCoreDataAccessService, CorePaging, PriorAuthorizationProcedureCode, CostCategory,Procedure,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { WebUiToastService } from '@case-clinical/web/ui/toast'


export interface PriorAuthorizationProcedureCodeFeatureState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationProcedureCode
  done: boolean,
  formName?: string
costCategoryId?: string,procedureId?: string,priorAuthorizationRequestId?: string,
  priorAuthorizationProcedureCodes: PriorAuthorizationProcedureCode[]
 costCategories?: CostCategory[],
 procedures?: Procedure[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchQuery?: string
  paging?: CorePaging
}

@Injectable()
export class WebPriorAuthorizationProcedureCodeFeatureStore extends ComponentStore<PriorAuthorizationProcedureCodeFeatureState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationProcedureCodeService: PriorAuthorizationProcedureCodeService
) {
    super({ 
      loading: false,
      priorAuthorizationProcedureCodes: [],
      done: false,
      searchQuery: '',
      formName: undefined,
costCategoryId: undefined,
procedureId: undefined,
priorAuthorizationRequestId: undefined,
      paging: {
        limit: 10000,
        skip: 0,
      },
    })

    if (this.route.snapshot.paramMap.has('priorAuthorizationProcedureCodeId')) {
      var priorAuthorizationProcedureCodeId = this.route.snapshot.paramMap.get('priorAuthorizationProcedureCodeId')
      this.setFormName('priorAuthorizationProcedureCode_edit')
    } else {
      this.setFormName('priorAuthorizationProcedureCode_create')
    }


    if(this.route.snapshot.paramMap.has("costCategoryId")) {
      var costCategoryId = this.route.snapshot.paramMap.get("costCategoryId")
      this.setCostCategoryId(costCategoryId)
    }


    if(this.route.snapshot.paramMap.has("procedureId")) {
      var procedureId = this.route.snapshot.paramMap.get("procedureId")
      this.setProcedureId(procedureId)
    }


    if(this.route.snapshot.paramMap.has("priorAuthorizationRequestId")) {
      var priorAuthorizationRequestId = this.route.snapshot.paramMap.get("priorAuthorizationRequestId")
      this.setPriorAuthorizationRequestId(priorAuthorizationRequestId)
    }



  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly done$ = this.select((s) => s.done)
  readonly item$ = this.select((s) => s.item)
  readonly priorAuthorizationProcedureCodes$ = this.select((s) => s.priorAuthorizationProcedureCodes)
  readonly costCategories$ = this.select((s) => s.costCategories || [])
  readonly procedures$ = this.select((s) => s.procedures || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])

readonly costCategoryId$ = this.select((s) => s.costCategoryId)

readonly procedureId$ = this.select((s) => s.procedureId)

readonly priorAuthorizationRequestId$ = this.select((s) => s.priorAuthorizationRequestId)

  readonly paging$ = this.select((s) => s.paging)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly formName$ = this.select((s) => s.formName)

  readonly actionResult$ = this.select(this.item$, this.done$,
    (item, done ) => ({item,done,
    }),
    {debounce: true })


  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.formName$, this.priorAuthorizationProcedureCodes$,
this.costCategories$,this.procedures$,this.priorAuthorizationRequests$,
    (errors, loading, item, formName, priorAuthorizationProcedureCodes, costCategories,procedures,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
    formName,
    priorAuthorizationProcedureCodes,

            costCategories,procedures,priorAuthorizationRequests
  }),
{debounce: true})

  readonly input$ = this.select(this.paging$, this.costCategoryId$,
this.procedureId$,
this.priorAuthorizationRequestId$, this.searchQuery$, (paging, costCategoryId,
procedureId,
priorAuthorizationRequestId,searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
    costCategoryId: costCategoryId,procedureId: procedureId,priorAuthorizationRequestId: priorAuthorizationRequestId,
    total: paging.total
  }))

  readonly setFormName = this.updater((state, formName: string) => ({
    ...state,
    formName,
  }))



            readonly setCostCategoryId = this.updater((state, costCategoryId: string) => ({
                ...state,
    costCategoryId,
  }))


            readonly setProcedureId = this.updater((state, procedureId: string) => ({
                ...state,
    procedureId,
  }))


            readonly setPriorAuthorizationRequestId = this.updater((state, priorAuthorizationRequestId: string) => ({
                ...state,
    priorAuthorizationRequestId,
  }))



  readonly filterCostCategories = (term) => 
        this.data.userSelectCostCategories({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let costCategories = res.data.items;
              this.patchState({costCategories})
              return costCategories
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


  readonly filterPriorAuthorizationRequests = (term) => 
        this.data.userSelectPriorAuthorizationRequests({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let priorAuthorizationRequests = res.data.items;
              this.patchState({priorAuthorizationRequests})
              return priorAuthorizationRequests
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



  readonly addCostCategory = this.updater((state, costCategory: CostCategory) => ({
    ...state, costCategories: state.costCategories.concat(costCategory)
  }))


  readonly addProcedure = this.updater((state, procedure: Procedure) => ({
    ...state, procedures: state.procedures.concat(procedure)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

    

  readonly setItem = this.updater((state, item: PriorAuthorizationProcedureCode) => ({...state, item}))

  addNewPriorAuthorizationProcedureCode = this.updater((state, priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode) => ({ ...state, priorAuthorizationProcedureCodes: [...state.priorAuthorizationProcedureCodes, priorAuthorizationProcedureCode] }))

  updatePriorAuthorizationProcedureCode = this.updater((state, priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode) => {
    return {
      ...state,
      priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.map((el) => {
        if (el.id === priorAuthorizationProcedureCode.id) {
          return priorAuthorizationProcedureCode
        } else {
          return el
        }
      }),
    }
  })

  addPriorAuthorizationProcedureCodes = this.updater((state, newPriorAuthorizationProcedureCodes: any[]) => ({...state, priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.concat(newPriorAuthorizationProcedureCodes) }))
  updatePriorAuthorizationProcedureCodes = this.updater((state, updatedPriorAuthorizationProcedureCodes: any[]) => {
    return {
      ...state,
      priorAuthorizationProcedureCodes: state.priorAuthorizationProcedureCodes.map((priorAuthorizationProcedureCode) => {
        const updated = updatedPriorAuthorizationProcedureCodes.find((el) => el.id === priorAuthorizationProcedureCode.id);
        return updated ? updated : priorAuthorizationProcedureCode;
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
        return this.priorAuthorizationProcedureCodeService.validatePriorAuthorizationProcedureCodeExcelData(excelData, vm.costCategories,vm.procedures,vm.priorAuthorizationRequests);
      })
    )
  }


  readonly loadPriorAuthorizationProcedureCodeEffect = this.effect<string>((priorAuthorizationProcedureCodeId$) =>
    priorAuthorizationProcedureCodeId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((priorAuthorizationProcedureCodeId) =>
        this.data.userPriorAuthorizationProcedureCode({ priorAuthorizationProcedureCodeId }).pipe(
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



  readonly loadPriorAuthorizationProcedureCodesEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userPriorAuthorizationProcedureCodes({input}).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                paging: {limit: input.limit, skip: input.skip, total: res.data.count.total},
                priorAuthorizationProcedureCodes: res.data.items,
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

  readonly createPriorAuthorizationProcedureCodeEffect = this.effect<UserCreatePriorAuthorizationProcedureCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((input) =>
        this.priorAuthorizationProcedureCodeService.createPriorAuthorizationProcedureCode({...input }).pipe(
          tapResponse(
            (priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode) => {
              this.addNewPriorAuthorizationProcedureCode(priorAuthorizationProcedureCode)
              this.toast.success('Created Successfully!');
              setTimeout(() => this.patchState({ item: priorAuthorizationProcedureCode, loading: false, done: true }), 300);
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

    readonly updatePriorAuthorizationProcedureCodeEffect = this.effect<UserUpdatePriorAuthorizationProcedureCodeInput>((input$) =>
        input$.pipe(
          tap(() => this.patchState({ loading: true })),
          withLatestFrom(this.item$),
          switchMap(([input, item]) =>
            this.priorAuthorizationProcedureCodeService.updatePriorAuthorizationProcedureCode(input, input.id).pipe(
              tapResponse(
                (priorAuthorizationProcedureCode) => {
                  this.updatePriorAuthorizationProcedureCode(priorAuthorizationProcedureCode)
                  this.toast.success('Updated Successfully!')
                  setTimeout(() => this.patchState({item: priorAuthorizationProcedureCode, loading: false, done: true }), 300);
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
  
    readonly deletePriorAuthorizationProcedureCodeEffect = this.effect(
    ($) =>
      $.pipe(
        tap(() => this.patchState({ loading: true })),
        withLatestFrom(this.item$),
        switchMap(([_, priorAuthorizationProcedureCode]) => {
          return this.data.userDeletePriorAuthorizationProcedureCode({priorAuthorizationProcedureCodeId: priorAuthorizationProcedureCode.id})
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

  readonly importExcelEffect = this.effect<UserUpdatePriorAuthorizationProcedureCodeInput[]>(($data) =>
    $data.pipe(
      tap(() => this.patchState({loading: true })),
      switchMap((data) => this.priorAuthorizationProcedureCodeService.importPriorAuthorizationProcedureCodes(data).pipe(
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

            this.addPriorAuthorizationProcedureCodes(created);
            this.updatePriorAuthorizationProcedureCodes(updated);

            this.toast.success(`${created.length} created, ${updated.length} updated, ${failed.length} failed of total ${total}`, { duration: 3000 })
          }
        )
      ))
    )
  )

}
