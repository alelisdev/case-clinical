
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebInvoiceDetailFeatureStore } from '@case-clinical/web/invoice-detail/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-invoice-detail-edit.component.html',
  providers: [WebInvoiceDetailFeatureStore],
})
export class WebInvoiceDetailEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    invoices: this.store.filterInvoices('')
  }

  constructor(
    private readonly store: WebInvoiceDetailFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadInvoiceDetailEffect(this.route.params.pipe(map((route) => route?.invoiceDetailId)))
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
