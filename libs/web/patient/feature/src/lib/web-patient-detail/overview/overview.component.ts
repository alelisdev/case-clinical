

import { Component,OnDestroy, OnInit, AfterViewInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared'
import { pluck } from 'rxjs';

declare const TXDocumentViewer: any

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="patient_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebPatientFeatureStore],
})
export class WebPatientOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebPatientFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadPatientEffect(this.route.params.pipe(pluck('patientId')))
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
      this.store.deletePatientEffect()
    }
  }


  appointmentAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  claimAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  documentAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  legalCaseAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  patientStudyAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  prescriptionAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  priorAuthorizationRequestAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }


  userAdded($event){
    console.log('from the overview in Patient, added: ',$event)
  }

}

