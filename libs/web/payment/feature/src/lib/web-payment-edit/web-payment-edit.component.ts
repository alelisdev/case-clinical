
import { ActivatedRoute,Router } from '@angular/router'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormService } from '@case-clinical/web/ui/form'
import { WebPaymentFeatureStore } from '@case-clinical/web/payment/shared'
import { map } from 'rxjs'

@Component({templateUrl: './web-payment-edit.component.html',
  providers: [WebPaymentFeatureStore],
})
export class WebPaymentEditComponent  implements OnInit, OnDestroy  {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    batchControls: this.store.filterBatchControls(''),
banks: this.store.filterBanks(''),
payorTypes: this.store.filterPayorTypes(''),
paymentTypes: this.store.filterPaymentTypes(''),
paymentApplicationMethods: this.store.filterPaymentApplicationMethods('')
  }

  constructor(
    private readonly store: WebPaymentFeatureStore,
    private router: Router,
    private route: ActivatedRoute,
    public formService: FormService,
  ) {
    
  }
 
    formIsReady() {
        this.store.loadPaymentEffect(this.route.params.pipe(map((route) => route?.paymentId)))
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
