

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-diagnosis-code/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="procedureOrTreatmentRequestDiagnosisCode_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore],
})
export class WebProcedureOrTreatmentRequestDiagnosisCodeOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadProcedureOrTreatmentRequestDiagnosisCodeEffect(this.route.params.pipe(pluck('procedureOrTreatmentRequestDiagnosisCodeId')))
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
      this.store.deleteProcedureOrTreatmentRequestDiagnosisCodeEffect()
    }
  }

  
}

