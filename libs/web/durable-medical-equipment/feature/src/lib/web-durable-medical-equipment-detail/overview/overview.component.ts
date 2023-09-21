

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebDurableMedicalEquipmentFeatureStore } from '@case-clinical/web/durable-medical-equipment/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ng-container *ngIf="vm.item">
        <ui-formly-json-form
          formName="durableMedicalEquipment_overview"
          [showSubmitButton]="false"
          [componentStore]="store"
          [model]="vm.item"
        ></ui-formly-json-form>
      </ng-container>
    </ng-container>
  `,
  providers: [WebDurableMedicalEquipmentFeatureStore],
})
export class WebDurableMedicalEquipmentOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebDurableMedicalEquipmentFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadDurableMedicalEquipmentEffect(this.route.params.pipe(pluck('durableMedicalEquipmentId')))
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
      this.store.deleteDurableMedicalEquipmentEffect()
    }
  }

  
  priorAuthDmeAdded($event){
    console.log('from the overview in Durable Medical Equipment, added: ',$event)
  }

}

