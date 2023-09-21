

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebProcedureTypeFeatureStore } from '@case-clinical/web/procedure-type/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="procedureType_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebProcedureTypeFeatureStore],
})
export class WebProcedureTypeOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebProcedureTypeFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadProcedureTypeEffect(this.route.params.pipe(pluck('procedureTypeId')))
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
      this.store.deleteProcedureTypeEffect()
    }
  }

  
  caseAccountAdded($event){
    console.log('from the overview in Procedure Type, added: ',$event)
  }

}

