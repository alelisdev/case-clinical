
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebInvoiceFeatureStore } from '@case-clinical/web/invoice/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-invoice-edit.component.html',
  providers: [WebInvoiceFeatureStore],
})
export class WebInvoiceEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    organizations: this.store.filterOrganizations(''),
legalCases: this.store.filterLegalCases(''),
documents: this.store.filterDocuments('')
  }

  constructor(
    private readonly store: WebInvoiceFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadInvoiceEffect(this.route.params.pipe(map((route) => route?.invoiceId)))
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
