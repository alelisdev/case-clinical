import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebLegalCaseFeatureStore } from '@case-clinical/web/legal-case/shared'
import { of, pluck, switchMap } from 'rxjs';
import { OverviewStore } from './overview.component.store';
import { WebPatientFeatureStore } from '@case-clinical/web/patient/shared';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
        <ui-formly-json-form
          class="flex-1"
          formName="legalCase_overview_test_2"
          [showSubmitButton]="false"
          [componentStore]="store"
          [formData]="formData"
          [model]="vm.item"
        ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebLegalCaseFeatureStore, OverviewStore, WebPatientFeatureStore],
})
export class WebLegalCaseOverviewComponent implements OnDestroy {
  
  constructor(
    private readonly store: OverviewStore,
  ) {

    
  }
  readonly vm$ = this.store.vm$
  private subscriber
  formData$ = this.store.item$.pipe(switchMap((item:any)=>{
    return of(item)
  })) 
  ngOnDestroy(): void {
    //this.subscriber.unsubscribe();
  }

  deleteItem(item) {
    if (confirm('Are you sure?')) {
      this.store.deleteLegalCase()
    }
  }


  appointmentAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  caseAccountAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  casePreAccidentAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  casePreInjuryAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  casePreProblemAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  casePreProcedureAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  caseProcedureAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  insuranceAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }


  priorMedsToDateAdded($event){
    console.log('from the overview in Legal Case, added: ',$event)
  }

}

