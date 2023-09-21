

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
        <ui-formly-json-form
          formName="caseProcedure_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebCaseProcedureFeatureStore],
})
export class WebCaseProcedureOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebCaseProcedureFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadCaseProcedureEffect(this.route.params.pipe(pluck('caseProcedureId')))
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
      this.store.deleteCaseProcedureEffect()
    }
  }


  priorAuthorizationRequestAdded($event){
    console.log('from the overview in Case Procedure, added: ',$event)
  }


  procedureVendorAdded($event){
    console.log('from the overview in Case Procedure, added: ',$event)
  }

}

