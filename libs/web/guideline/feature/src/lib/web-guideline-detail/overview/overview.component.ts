

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebGuidelineFeatureStore } from '@case-clinical/web/guideline/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="guideline_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebGuidelineFeatureStore],
})
export class WebGuidelineOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebGuidelineFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadGuidelineEffect(this.route.params.pipe(pluck('guidelineId')))
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
      this.store.deleteGuidelineEffect()
    }
  }

  
  priorAuthGuidelineAdded($event){
    console.log('from the overview in Guideline, added: ',$event)
  }

}

