

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import { map, pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="lead_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebLeadFeatureStore],
})
export class WebLeadOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebLeadFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadLeadEffect(this.route.params.pipe(map((v)=>v?.leadId)))
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
      this.store.deleteLeadEffect()
    }
  }

  
  bodyPartLeadAdded($event){
    console.log('from the overview in Lead, added: ',$event)
  }


  insuranceAdded($event){
    console.log('from the overview in Lead, added: ',$event)
  }


  leadActionAdded($event){
    console.log('from the overview in Lead, added: ',$event)
  }


  leadInjuryAdded($event){
    console.log('from the overview in Lead, added: ',$event)
  }


  leadTreatmentAdded($event){
    console.log('from the overview in Lead, added: ',$event)
  }

}

