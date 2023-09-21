
import { Injectable } from '@angular/core'
import { WebCoreDataAccessService, ContractTerm, UserCreateContractTermInput, Contract } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'

export interface ContractTermFormState {
  errors?: any
  loading?: boolean
  item?: ContractTerm,
 contracts?: Contract[]
  searchTerm?: string
}

@Injectable()
export class WebContractTermFormStore extends ComponentStore<ContractTermFormState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({ loading: false })
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)
  readonly contracts$ = this.select((s) => s.contracts || [])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, 
this.contracts$,
    (errors, loading, item, contracts ) => ({
    errors,
    loading,
    item,
contracts
  }),
{debounce: true})



  readonly filterContracts = (term) => 
        this.data.userContracts({input: { name: term}}).pipe(
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



  readonly createContractTermEffect = this.effect<UserCreateContractTermInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
        this.data.userCreateContractTerm({ input }).pipe(
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

}
