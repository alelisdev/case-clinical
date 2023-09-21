

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebClaimStatusFeatureStore } from '@case-clinical/web/claim-status/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="claimStatus_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebClaimStatusFeatureStore],
})
export class WebClaimStatusOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebClaimStatusFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadClaimStatusEffect(this.route.params.pipe(pluck('claimStatusId')))
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
      this.store.deleteClaimStatusEffect()
    }
  }


  claimProcedureAdded($event){
    console.log('from the overview in Claim Status, added: ',$event)
  }

}

