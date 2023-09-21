

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="priorMedsToDateStatus_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebPriorMedsToDateStatusFeatureStore],
})
export class WebPriorMedsToDateStatusOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebPriorMedsToDateStatusFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadPriorMedsToDateStatusEffect(this.route.params.pipe(pluck('priorMedsToDateStatusId')))
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
      this.store.deletePriorMedsToDateStatusEffect()
    }
  }

  
  priorMedsToDateAdded($event){
    console.log('from the overview in Prior Meds to Date Status, added: ',$event)
  }

}

