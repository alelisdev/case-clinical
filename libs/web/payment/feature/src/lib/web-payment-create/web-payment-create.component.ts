
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebPaymentFeatureStore} from '@case-clinical/web/payment/shared'

@Component({templateUrl: './web-payment-create.component.html',
  providers: [WebPaymentFeatureStore],
})
export class WebPaymentCreateComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['..', item?.id], { relativeTo: this.route })
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
