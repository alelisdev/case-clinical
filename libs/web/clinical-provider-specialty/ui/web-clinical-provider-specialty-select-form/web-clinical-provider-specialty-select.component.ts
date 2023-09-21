

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderSpecialtyFeatureStore } from '@case-clinical/web/clinical-provider-specialty/shared'
import {ClinicalProviderSpecialty} from '@case-clinical/web/core/data-access'


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
      <ui-clinical-provider-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderSpecialty_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderSpecialty]="clinicalProviderSpecialty"
      >
      >
      </ui-clinical-provider-specialty-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderSpecialty_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderSpecialty]="{}"
      >
      </ui-clinical-provider-specialty-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-specialty-select-table-view
        class="w-full h-full bg-white"
        [clinicalProviderSpecialties]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-clinical-provider-specialty-select-table-view>
    </ng-template>
  `,
    providers: [WebClinicalProviderSpecialtyFeatureStore]
})
export class WebClinicalProviderSpecialtySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  clinicalProviderSpecialty: ClinicalProviderSpecialty

  constructor(private store: WebClinicalProviderSpecialtyFeatureStore) {
    super()
    this.store.loadClinicalProviderSpecialtiesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.clinicalProviderSpecialties$.pipe(
      switchMap((clinicalProviderSpecialties) => {
        return of(clinicalProviderSpecialties)
      }),
    )
  }
}

