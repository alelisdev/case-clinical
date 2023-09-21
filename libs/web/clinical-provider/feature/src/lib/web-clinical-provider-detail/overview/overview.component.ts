

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="clinicalProvider_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebClinicalProviderFeatureStore],
})
export class WebClinicalProviderOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebClinicalProviderFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadClinicalProviderEffect(this.route.params.pipe(pluck('clinicalProviderId')))
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
      this.store.deleteClinicalProviderEffect()
    }
  }


  appointmentAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  clinicalProviderLocationAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  clinicalProviderSpecialtyAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  clinicalProviderTagAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  favoriteProviderAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  medicalConditionProviderAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  medicalRecordAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  pchProviderAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }


  userAdded($event){
    console.log('from the overview in Clinical Provider, added: ',$event)
  }

}

