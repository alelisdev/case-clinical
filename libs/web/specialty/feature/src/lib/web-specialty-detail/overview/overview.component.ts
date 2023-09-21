

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="specialty_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebSpecialtyFeatureStore],
})
export class WebSpecialtyOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebSpecialtyFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadSpecialtyEffect(this.route.params.pipe(pluck('specialtyId')))
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
      this.store.deleteSpecialtyEffect()
    }
  }

  
  clinicalProviderSpecialtyAdded($event){
    console.log('from the overview in Specialty, added: ',$event)
  }


  facilityFeeScheduleAdded($event){
    console.log('from the overview in Specialty, added: ',$event)
  }


  feeScheduleAdded($event){
    console.log('from the overview in Specialty, added: ',$event)
  }

}

