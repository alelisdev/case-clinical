
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContractedRateInput, WebCoreDataAccessService, ContractedRate, Contract,ContractedRateKind,ContractKind } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractedRateService } from '@case-clinical/web/contracted-rate/shared'

export interface ContractedRateEditState {
  errors?: any
  loading?: boolean
  item?: ContractedRate,
 contracts?: Contract[],
 contractedRateKinds?: ContractedRateKind[],
 contractKinds?: ContractKind[]
  searchTerm?: string
}

@Injectable()
export class WebContractedRateEditStore extends ComponentStore<ContractedRateEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractedRateService: ContractedRateService
) {
    super({ loading: false })
    
    this.loadContractedRateEffect(route.params.pipe(map((route) => route?.contractedRateId)))
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



  readonly addContract = this.updater((state, contract: Contract) => ({
    ...state, contracts: state.contracts.concat(contract)
  }))


  readonly addContractedRateKind = this.updater((state, contractedRateKind: ContractedRateKind) => ({
    ...state, contractedRateKinds: state.contractedRateKinds.concat(contractedRateKind)
  }))


  readonly addContractKind = this.updater((state, contractKind: ContractKind) => ({
    ...state, contractKinds: state.contractKinds.concat(contractKind)
  }))

  
  readonly loadContractedRateEffect = this.effect<string>((contractedRateId$) =>
     contractedRateId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contractedRateId) =>
        this.data.userContractedRate({contractedRateId}).pipe(
          tapResponse(
            (res) => {
              this.patchState({ item: res.data.item, errors: res.errors, loading: false })
            },
            (errors: any) =>
              this.patchState({loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  readonly updateContractedRateEffect = this.effect<UserUpdateContractedRateInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.contractedRateService.updateContractedRate(input, item?.id).pipe(
          tapResponse(
            (response: any) => {
              this.toast.success('Changed Successfully')
              this.router.navigate(['..'], { relativeTo: this.route })
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
