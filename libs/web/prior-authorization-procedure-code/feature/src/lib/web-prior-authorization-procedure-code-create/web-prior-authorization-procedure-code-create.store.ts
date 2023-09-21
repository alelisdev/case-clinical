
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreatePriorAuthorizationProcedureCodeInput, WebCoreDataAccessService, PriorAuthorizationProcedureCode, CostCategory,Procedure,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { PriorAuthorizationProcedureCodeService } from '@case-clinical/web/prior-authorization-procedure-code/shared'

export interface PriorAuthorizationProcedureCodeCreateState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationProcedureCode,
 costCategories?: CostCategory[],
 procedures?: Procedure[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationProcedureCodeCreateStore extends ComponentStore<PriorAuthorizationProcedureCodeCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly priorAuthorizationProcedureCodeService: PriorAuthorizationProcedureCodeService
) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly costCategories$ = this.select((s) => s.costCategories || [])
  readonly procedures$ = this.select((s) => s.procedures || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.costCategories$,this.procedures$,this.priorAuthorizationRequests$,
    (errors, loading, item, costCategories,procedures,priorAuthorizationRequests ) => ({
    errors,
    loading,
    item,
costCategories,procedures,priorAuthorizationRequests
  }),
{debounce: true})



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

    

  readonly createPriorAuthorizationProcedureCodeEffect = this.effect<UserCreatePriorAuthorizationProcedureCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.priorAuthorizationProcedureCodeService.createPriorAuthorizationProcedureCode({...input}).pipe(
          tapResponse(
            (priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode) => {
              this.patchState({ item: priorAuthorizationProcedureCode, loading: false })
              return this.router.navigate(['..', priorAuthorizationProcedureCode?.id], {relativeTo: this.route})
            },
            (errors: any) => {
              this.toast.error(errors.Message)
              this.formService.setErrors(errors.Data)
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              })
            }
          ),
        ),
      ),
    ),
  )
}
