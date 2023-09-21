

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebOrganizationFeatureStore } from '@case-clinical/web/organization/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
        <ui-formly-json-form
          formName="organization_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebOrganizationFeatureStore],
})
export class WebOrganizationOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebOrganizationFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadOrganizationEffect(this.route.params.pipe(pluck('organizationId')))
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
      this.store.deleteOrganizationEffect()
    }
  }


  contractAdded($event){
    console.log('from the overview in Organization, added: ',$event)
  }


  facilityFeeScheduleAdded($event){
    console.log('from the overview in Organization, added: ',$event)
  }


  feeScheduleAdded($event){
    console.log('from the overview in Organization, added: ',$event)
  }

}

