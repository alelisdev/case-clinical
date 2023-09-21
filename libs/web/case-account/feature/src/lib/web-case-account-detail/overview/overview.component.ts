

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="caseAccount_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebCaseAccountFeatureStore],
})
export class WebCaseAccountOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebCaseAccountFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadCaseAccountEffect(this.route.params.pipe(pluck('caseAccountId')))
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
      this.store.deleteCaseAccountEffect()
    }
  }


  caseAccountPaymentAdded($event){
    console.log('from the overview in Case Account, added: ',$event)
  }


  journalEntryAdded($event){
    console.log('from the overview in Case Account, added: ',$event)
  }


  writeOffAdded($event){
    console.log('from the overview in Case Account, added: ',$event)
  }

}

