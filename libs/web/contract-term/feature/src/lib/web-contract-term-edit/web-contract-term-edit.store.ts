
import { Injectable } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserUpdateContractTermInput, WebCoreDataAccessService, ContractTerm, Contract } from '@case-clinical/web/core/data-access'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { switchMap, tap, map, withLatestFrom } from 'rxjs/operators'
import { WebUiToastService } from '@case-clinical/web/ui/toast'
import { FormService } from '@case-clinical/web/ui/form'
import { ContractTermService } from '@case-clinical/web/contract-term/shared'

export interface ContractTermEditState {
  errors?: any
  loading?: boolean
  item?: ContractTerm,
 contracts?: Contract[]
  searchTerm?: string
}

@Injectable()
export class WebContractTermEditStore extends ComponentStore<ContractTermEditState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService,
    private readonly formService: FormService,
    private readonly contractTermService: ContractTermService
) {
    super({ loading: false })
    
    this.loadContractTermEffect(route.params.pipe(map((route) => route?.contractTermId)))
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

  
  readonly loadContractTermEffect = this.effect<string>((contractTermId$) =>
     contractTermId$.pipe(
      tap(() => this.setState({loading: true })),
      switchMap((contractTermId) =>
        this.data.userContractTerm({contractTermId}).pipe(
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

  readonly updateContractTermEffect = this.effect<UserUpdateContractTermInput>((input$) =>
    input$.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.item$),
      switchMap(([input, item]) =>
         this.contractTermService.updateContractTerm(input, item?.id).pipe(
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
