
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ContractedRate, UserCreateContractedRateInput, Contract,ContractedRateKind,ContractKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractedRateFormState {
  errors?: any
  loading?: boolean
  item?: ContractedRate,
 contracts?: Contract[],
 contractedRateKinds?: ContractedRateKind[],
 contractKinds?: ContractKind[]
  searchTerm?: string
}

@Injectable()
export class WebContractedRateFormStore extends ComponentStore<ContractedRateFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly contractedRateKinds$ = this.select((s) => s.contractedRateKinds || [])
  readonly contractKinds$ = this.select((s) => s.contractKinds || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contracts$,this.contractedRateKinds$,this.contractKinds$,
    (errors, loading, item, contracts,contractedRateKinds,contractKinds ) => ({
    errors,
    loading,
    item,
contracts,contractedRateKinds,contractKinds
  }),
{debounce: true})



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


  readonly filterContractedRateKinds = (term) => 
        this.data.userSelectContractedRateKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contractedRateKinds = res.data.items;
              this.patchState({contractedRateKinds})
              return contractedRateKinds
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


  readonly filterContractKinds = (term) => 
        this.data.userSelectContractKinds({input: { name: term}}).pipe(
          tapResponse(
            (res: any) => {
              let contractKinds = res.data.items;
              this.patchState({contractKinds})
              return contractKinds
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



  readonly createContractedRateEffect = this.effect<UserCreateContractedRateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateContractedRate({ input }).pipe(
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


  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => ({
    ...state, contractedRateKinds: state.contractedRateKinds.concat(contractedRateKind)
  }))


  readonly addContractKind = this.updater((state, contractKind: ContractKind) => ({
    ...state, contractKinds: state.contractKinds.concat(contractKind)
  }))

}
