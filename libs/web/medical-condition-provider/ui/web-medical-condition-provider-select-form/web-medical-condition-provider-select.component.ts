

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalConditionProviderFeatureStore } from '@case-clinical/web/medical-condition-provider/shared'
import {MedicalConditionProvider} from '@case-clinical/web/core/data-access'


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
      <ui-medical-condition-provider-form
        class="flex-grow flex flex-col"
        [formName]="'medicalConditionProvider_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalConditionProvider]="medicalConditionProvider"
      >
      >
      </ui-medical-condition-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-condition-provider-form
        class="flex-grow flex flex-col"
        [formName]="'medicalConditionProvider_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalConditionProvider]="{}"
      >
      </ui-medical-condition-provider-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-medical-condition-provider-select-table-view
        class="w-full h-full bg-white"
        [medicalConditionProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-medical-condition-provider-select-table-view>
    </ng-template>
  `,
})
export class WebMedicalConditionProviderSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  medicalConditionProvider: MedicalConditionProvider

  constructor(private store: WebMedicalConditionProviderFeatureStore) {
    super()
    this.store.loadMedicalConditionProvidersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.medicalConditionProviders$.pipe(
      switchMap((medicalConditionProviders) => {
        return of(medicalConditionProviders)
      }),
    )
  }
}

