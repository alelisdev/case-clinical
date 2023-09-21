

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderLocationAvailabilityFeatureStore } from '@case-clinical/web/clinical-provider-location-availability/shared'
import {ClinicalProviderLocationAvailability} from '@case-clinical/web/core/data-access'


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
      <ui-clinical-provider-location-availability-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderLocationAvailability_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderLocationAvailability]="clinicalProviderLocationAvailability"
      >
      >
      </ui-clinical-provider-location-availability-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-location-availability-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderLocationAvailability_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderLocationAvailability]="{}"
      >
      </ui-clinical-provider-location-availability-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-location-availability-select-table-view
        class="w-full h-full bg-white"
        [clinicalProviderLocationAvailabilities]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-clinical-provider-location-availability-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderLocationAvailabilitySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  clinicalProviderLocationAvailability: ClinicalProviderLocationAvailability

  constructor(private store: WebClinicalProviderLocationAvailabilityFeatureStore) {
    super()
    this.store.loadClinicalProviderLocationAvailabilitiesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.clinicalProviderLocationAvailabilities$.pipe(
      switchMap((clinicalProviderLocationAvailabilities) => {
        return of(clinicalProviderLocationAvailabilities)
      }),
    )
  }
}

