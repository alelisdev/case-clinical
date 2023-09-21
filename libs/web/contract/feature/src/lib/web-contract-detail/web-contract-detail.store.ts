
import { Injectable } from '@angular/core'
import { ActivatedRoute,Router } from '@angular/router'
import { ComponentStore,tapResponse } from '@ngrx/component-store'
import { WebCoreDataAccessService,Contract } from '@case-clinical/web/core/data-access'
import { pluck,switchMap, tap } from 'rxjs/operators'
import { DescriptionListItem } from '@case-clinical/web/ui/description-list'
import { WebUiToastService } from '@case-clinical/web/ui/toast'

export interface ContractDetailState {
  errors ?: any
  loading?: boolean
  item?: Contract
}

@Injectable()
export class WebContractDetailStore extends ComponentStore<ContractDetailState> {
  constructor(
    private readonly data: WebCoreDataAccessService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toast: WebUiToastService
) {
    super({ loading: false })
    this.loadContractEffect(route.params.pipe(pluck('contractId')))
  }

  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly item$ = this.select((s) => s.item)

readonly displayItems$ = this.select(
    this.item$,
    (item) =>
      [
{ label: 'Id', value: item?.id },
{ label: 'Name', value: item?.name },



{ label: 'Bill on Behalf', value: item?.billOnBehalf },
{ label: 'Bill Rate', value: item?.billRate },

{ label: 'Contract Date', value: item?.contractDate },
{ label: 'Maturity Date', value: item?.maturityDate },
{ label: 'Requires Tpa Medical Necessity', value: item?.requiresTpaMedicalNecessity },
{ label: 'Requires Tpa Medicare Allowable', value: item?.requiresTpaMedicareAllowable },


{ label: 'Signed', value: item?.signed },

{ label: 'Documents', value: item?.documents },
{ label: 'Contracted Rates', value: item?.contractedRates },
{ label: 'Case Accounts', value: item?.caseAccounts },
{ label: 'Contract Terms', value: item?.contractTerms },
{ label: 'Procedure Vendors', value: item?.procedureVendors },
      ] as DescriptionListItem[],
  )

readonly tabs$ = this.select(this.item$, (item) => [
    {
      label: 'Details',
      path: 'details',
      data: item,
    },
  ])
  readonly vm$ = this.select(this.errors$, this.loading$, this.item$, this.tabs$, (errors, loading, item, tabs) => ({
    errors,
    loading,
    item: { ...item },
    tabs
  }),
{debounce: true})

  readonly loadContractEffect = this.effect<string>((contractId$) =>
    contractId$.pipe(
      tap(() => this.setState({ loading: true })),
      switchMap((contractId) =>
        this.data.userContract({ contractId }).pipe(
          tapResponse(
            (res) => this.patchState({ item: res.data.item, errors: res.errors, loading: false }),
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

  readonly deleteContractEffect = this.effect<Contract>(
    (contract$) =>
      contract$.pipe(
        switchMap((contract) =>
          this.data
            .userDeleteContract({
              contractId: contract.id,
            })
            .pipe(
              tapResponse(
                (res) =>
                {  
                    this.toast.success("Deleted successfully!", {duration: 3000})
                    return this.router.navigate(['/queues/contracts'])
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
}

