
import {ActivatedRoute,Router} from '@angular/router'
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormService} from '@case-clinical/web/ui/form'
import {WebCaseAccountPaymentFeatureStore} from '@case-clinical/web/case-account-payment/shared'

@Component({templateUrl: './web-case-account-payment-create.component.html',
  providers: [WebCaseAccountPaymentFeatureStore],
})
export class WebCaseAccountPaymentCreateComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  formData = {
    payments: this.store.filterPayments(''),
caseAccounts: this.store.filterCaseAccounts('')
  }

  constructor(
    private readonly store: WebCaseAccountPaymentFeatureStore,
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
