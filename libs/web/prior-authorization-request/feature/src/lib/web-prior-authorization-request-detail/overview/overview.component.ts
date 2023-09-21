

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
        <ui-formly-json-form
          formName="priorAuthorizationRequest_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebPriorAuthorizationRequestFeatureStore],
})
export class WebPriorAuthorizationRequestOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebPriorAuthorizationRequestFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadPriorAuthorizationRequestEffect(this.route.params.pipe(pluck('priorAuthorizationRequestId')))
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
      this.store.deletePriorAuthorizationRequestEffect()
    }
  }


  claimAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }


  priorAuthDmeAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }


  priorAuthGuidelineAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }


  priorAuthorizationDiagnosisCodeAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }


  priorAuthorizationEquipmentAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }


  priorAuthorizationImplantAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }


  priorAuthorizationProcedureCodeAdded($event){
    console.log('from the overview in Prior Authorization Request, added: ',$event)
  }

}

