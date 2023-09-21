

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebPaymentFeatureStore } from '@case-clinical/web/payment/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="payment_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebPaymentFeatureStore],
})
export class WebPaymentOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebPaymentFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadPaymentEffect(this.route.params.pipe(pluck('paymentId')))
    this.subscriber = this.store.actionResult$.subscribe(({ done, item }) => {
      if(done) {
        this.router.navigate(['../../../'], {relativeTo: this.route});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deletePaymentEffect()
    }
  }


  caseAccountPaymentAdded($event){
    console.log('from the overview in Payment, added: ',$event)
  }

}

