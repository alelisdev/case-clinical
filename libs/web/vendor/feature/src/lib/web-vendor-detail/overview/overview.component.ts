

import { Component,OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router';
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
import { pluck } from 'rxjs';

@Component({
  template: `
    <ng-container *ngIf="vm$ | async as vm">
      <ui-formly-json-form
        formName="vendor_overview"
        [showSubmitButton]="false"
        [componentStore]="store"
        [model]="vm.item"
      ></ui-formly-json-form>
    </ng-container>
  `,
  providers: [WebVendorFeatureStore],
})
export class WebVendorOverviewComponent implements OnInit, OnDestroy {
  readonly vm$ = this.store.vm$
  private subscriber

  constructor(
    private readonly store: WebVendorFeatureStore,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.store.loadVendorEffect(this.route.params.pipe(pluck('vendorId')))
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
      this.store.deleteVendorEffect()
    }
  }


  assignedDocumentAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }


  caseAccountAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }


  clinicalProviderAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }


  contractAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }


  durableMedicalEquipmentAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }


  procedureVendorAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }


  vendorLocationAdded($event){
    console.log('from the overview in Vendor, added: ',$event)
  }

}

