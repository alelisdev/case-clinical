
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ProcedureVendor, UserCreateProcedureVendorInput, CaseProcedure,Contract,Vendor } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ProcedureVendorFormState {
  errors?: any
  loading?: boolean
  item?: ProcedureVendor,
 caseProcedures?: CaseProcedure[],
 contracts?: Contract[],
 vendors?: Vendor[]
  searchTerm?: string
}

@Injectable()
export class WebProcedureVendorFormStore extends ComponentStore<ProcedureVendorFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly caseProcedures$ = this.select((s) => s.caseProcedures || [])
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly vendors$ = this.select((s) => s.vendors || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.caseProcedures$,this.contracts$,this.vendors$,
    (errors, loading, item, caseProcedures,contracts,vendors ) => ({
    errors,
    loading,
    item,
caseProcedures,contracts,vendors
  }),
{debounce: true})



  readonly filterCaseProcedures = (term) => 
        this.data.userSelectCaseProcedures({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let caseProcedures = res.data.items;
              this.patchState({caseProcedures})
              return caseProcedures
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


  readonly filterContracts = (term) => 
        this.data.userSelectContracts({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contracts = res.data.items;
              this.patchState({contracts})
              return contracts
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



  readonly createProcedureVendorEffect = this.effect<UserCreateProcedureVendorInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateProcedureVendor({ input }).pipe(
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


  readonly addCaseProcedure = this.updater((state, caseProcedure: CaseProcedure) => ({
    ...state, caseProcedures: state.caseProcedures.concat(caseProcedure)
  }))


  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addVendor = this.updater((state, vendor: Vendor) => ({
    ...state, vendors: state.vendors.concat(vendor)
  }))

}
