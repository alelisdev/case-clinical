

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebGuidelineUsedFeatureStore } from '@case-clinical/web/guideline-used/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="guidelineUsed_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebGuidelineUsedFeatureStore],
})
export class WebGuidelineUsedOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebGuidelineUsedFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadGuidelineUsedEffect(this.route.params.pipe(pluck('guidelineUsedId')))
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
      this.store.deleteGuidelineUsedEffect()
    }
  }

  
  priorAuthorizationRequestAdded($event){
    console.log('from the overview in Guideline Used, added: ',$event)
  }

}

