

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="recommendedOrder_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebRecommendedOrderFeatureStore],
})
export class WebRecommendedOrderOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebRecommendedOrderFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadRecommendedOrderEffect(this.route.params.pipe(pluck('recommendedOrderId')))
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
      this.store.deleteRecommendedOrderEffect()
    }
  }

  
  recommendedOrderAuthorizationAdded($event){
    console.log('from the overview in Recommended Order, added: ',$event)
  }


  recommendedOrderDiagnosisCodeAdded($event){
    console.log('from the overview in Recommended Order, added: ',$event)
  }

}

