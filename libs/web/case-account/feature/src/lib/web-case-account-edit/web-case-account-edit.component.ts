
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-case-account-edit.component.html',
  providers: [WebCaseAccountFeatureStore],
})
export class WebCaseAccountEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    legalCases: this.store.filterLegalCases(''),
locations: this.store.filterLocations(''),
vendors: this.store.filterVendors(''),
accountStatuses: this.store.filterAccountStatuses(''),
procedureTypes: this.store.filterProcedureTypes(''),
agreementTypes: this.store.filterAgreementTypes(''),
claimProcedures: this.store.filterClaimProcedures(''),
invoiceDetails: this.store.filterInvoiceDetails(''),
contracts: this.store.filterContracts(''),
portfolios: this.store.filterPortfolios(''),
procedureVendors: this.store.filterProcedureVendors('')
  }

  constructor(
    private readonly store: WebCaseAccountFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadCaseAccountEffect(this.route.params.pipe(map((route) => route?.caseAccountId)))
    }

   ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..'], { relativeTo: this.route })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  handleDiscardClick(evt) {
    evt?.preventDefault()
    this.router.navigate(['..'], { relativeTo: this.route })
  }
}
