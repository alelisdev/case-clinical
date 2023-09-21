
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, CaseProcedure, UserCreateCaseProcedureInput, LegalCase,Location,PriorAuthorizationRequest, ProcedureVendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface CaseProcedureFormState {
  errors?: any
  loading?: boolean
  item?: CaseProcedure,
 legalCases?: LegalCase[],
 locations?: Location[],
 priorAuthorizationRequests?: PriorAuthorizationRequest[]
 procedureVendors?: ProcedureVendor[]
  searchTerm?: string
}

@Injectable()
export class WebCaseProcedureFormStore extends ComponentStore<CaseProcedureFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly legalCases$ = this.select((s) => s.legalCases || [])
  readonly locations$ = this.select((s) => s.locations || [])
  readonly priorAuthorizationRequests$ = this.select((s) => s.priorAuthorizationRequests || [])
  readonly procedureVendors$ = this.select((s) => s.procedureVendors || [])

  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.legalCases$,this.locations$,this.priorAuthorizationRequests$,this.procedureVendors$,
    (errors, loading, item, legalCases,locations,priorAuthorizationRequests,procedureVendors ) => ({
    errors,
    loading,
    item,
legalCases,locations,priorAuthorizationRequests,procedureVendors
  }),
{debounce: true})



  readonly filterLegalCases = (term) => 
        this.data.userLegalCases({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let legalCases = res.data.items;
              this.patchState({legalCases})
              return legalCases
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


  readonly filterLocations = (term) => 
        this.data.userSelectLocations({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let locations = res.data.items;
              this.patchState({locations})
              return locations
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

  readonly filterProcedureVendors = (term) => 
        this.data.userSelectProcedureVendors({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let procedureVendors = res.data.items;
              this.patchState({procedureVendors})
              return procedureVendors
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



  readonly createCaseProcedureEffect = this.effect<UserCreateCaseProcedureInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateCaseProcedure({ input }).pipe(
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


  readonly addLegalCase = this.updater((state, legalCase: LegalCase) => ({
    ...state, legalCases: state.legalCases.concat(legalCase)
  }))


  readonly addLocation = this.updater((state, location: Location) => ({
    ...state, locations: state.locations.concat(location)
  }))


  readonly addPriorAuthorizationRequest = this.updater((state, priorAuthorizationRequest: PriorAuthorizationRequest) => ({
    ...state, priorAuthorizationRequests: state.priorAuthorizationRequests.concat(priorAuthorizationRequest)
  }))

}
