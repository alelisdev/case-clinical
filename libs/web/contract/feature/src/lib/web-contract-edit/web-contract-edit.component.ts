
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-contract-edit.component.html',
  providers: [WebContractFeatureStore],
})
export class WebContractEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    organizations: this.store.filterOrganizations(''),
templates: this.store.filterTemplates(''),
vendors: this.store.filterVendors(''),
reconciliationPeriodTypes: this.store.filterReconciliationPeriodTypes(''),
calculationBasisTypes: this.store.filterCalculationBasisTypes(''),
processes: this.store.filterProcesses('')
  }

  constructor(
    private readonly store: WebContractFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadContractEffect(this.route.params.pipe(map((route) => route?.contractId)))
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
