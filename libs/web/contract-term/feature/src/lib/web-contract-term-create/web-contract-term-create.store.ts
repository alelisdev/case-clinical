
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserCreateContractTermInput, WebCoreDataAccessService, ContractTerm, Contract } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractTermService } from '@case-clinical/web/contract-term/shared'

export interface ContractTermCreateState {
  errors?: any
  loading?: boolean
  item?: ContractTerm,
 contracts?: Contract[]
  searchTerm?: string
}

@Injectable()
export class WebContractTermCreateStore extends ComponentStore<ContractTermCreateState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractTermService: ContractTermService
) {
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



  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))

    

  readonly createContractTermEffect = this.effect<UserCreateContractTermInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((input) =>
         this.contractTermService.createContractTerm({...input}).pipe(
          tapResponse(
            (contractTerm: ContractTerm) => {
              this.patchState({ item: contractTerm, loading: false })
              return this.router.navigate(['..', contractTerm?.id], {relativeTo: this.route})
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
