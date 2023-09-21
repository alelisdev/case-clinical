

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="contract_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebContractFeatureStore],
})
export class WebContractOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebContractFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadContractEffect(this.route.params.pipe(pluck('contractId')))
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
      this.store.deleteContractEffect()
    }
  }

  
  caseAccountAdded($event){
    console.log('from the overview in Contract, added: ',$event)
  }


  contractedRateAdded($event){
    console.log('from the overview in Contract, added: ',$event)
  }


  contractTermAdded($event){
    console.log('from the overview in Contract, added: ',$event)
  }


  documentAdded($event){
    console.log('from the overview in Contract, added: ',$event)
  }


  procedureVendorAdded($event){
    console.log('from the overview in Contract, added: ',$event)
  }

}

