

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="diagnosisCode_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebDiagnosisCodeFeatureStore],
})
export class WebDiagnosisCodeOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebDiagnosisCodeFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadDiagnosisCodeEffect(this.route.params.pipe(pluck('diagnosisCodeId')))
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
      this.store.deleteDiagnosisCodeEffect()
    }
  }

  
  authorizationDiagnosisCodeAdded($event){
    console.log('from the overview in Diagnosis Code, added: ',$event)
  }


  priorAuthorizationDiagnosisCodeAdded($event){
    console.log('from the overview in Diagnosis Code, added: ',$event)
  }


  procedureOrTreatmentRequestDiagnosisCodeAdded($event){
    console.log('from the overview in Diagnosis Code, added: ',$event)
  }


  recommendedOrderDiagnosisCodeAdded($event){
    console.log('from the overview in Diagnosis Code, added: ',$event)
  }

}

