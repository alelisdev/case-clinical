

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
import {ClinicalProviderLocation} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-clinical-provider-location-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderLocation_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderLocation]="clinicalProviderLocation"
      >
      >
      </ui-clinical-provider-location-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-location-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderLocation_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderLocation]="{}"
      >
      </ui-clinical-provider-location-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-location-select-table-view
        class="w-full h-full bg-white"
        [clinicalProviderLocations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-clinical-provider-location-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderLocationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  clinicalProviderLocation: ClinicalProviderLocation

  constructor(private store: WebClinicalProviderLocationFeatureStore) {
    super()
    this.store.loadClinicalProviderLocationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.clinicalProviderLocations$.pipe(
      switchMap((clinicalProviderLocations) => {
        return of(clinicalProviderLocations)
      }),
    )
  }
}

