
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, PriorAuthorizationProcedureCode, UserCreatePriorAuthorizationProcedureCodeInput, CostCategory,Procedure,PriorAuthorizationRequest } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface PriorAuthorizationProcedureCodeFormState {
  errors?: any
  loading?: boolean
  item?: PriorAuthorizationProcedureCode,
 costCategories?: CostCategory[],
 procedures?: Procedure[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
  searchTerm?: string
}

@Injectable()
export class WebPriorAuthorizationProcedureCodeFormStore extends ComponentStore<PriorAuthorizationProcedureCodeFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
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



  readonly createPriorAuthorizationProcedureCodeEffect = this.effect<UserCreatePriorAuthorizationProcedureCodeInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreatePriorAuthorizationProcedureCode({ input }).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.created, errors: res.errors, loading: false })
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


  readonly addCostCategory = this.updater((state, costCategory: CostCategory) => ({
    ...state, costCategories: state.costCategories.concat(costCategory)
  }))


  readonly addProcedure = this.updater((state, procedure: Procedure) => ({
    ...state, procedures: state.procedures.concat(procedure)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

}
