

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalConditionFeatureStore } from '@case-clinical/web/medical-condition/shared'
import {MedicalCondition} from '@case-clinical/web/core/data-access'


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
      <ui-medical-condition-form
        class="flex-grow flex flex-col"
        [formName]="'medicalCondition_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalCondition]="medicalCondition"
      >
      >
      </ui-medical-condition-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-condition-form
        class="flex-grow flex flex-col"
        [formName]="'medicalCondition_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalCondition]="{}"
      >
      </ui-medical-condition-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-medical-condition-select-table-view
        class="w-full h-full bg-white"
        [medicalConditions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-medical-condition-select-table-view>
    </ng-template>
  `,
})
export class WebMedicalConditionSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  medicalCondition: MedicalCondition

  constructor(private store: WebMedicalConditionFeatureStore) {
    super()
    this.store.loadMedicalConditionsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.medicalConditions$.pipe(
      switchMap((medicalConditions) => {
        return of(medicalConditions)
      }),
    )
  }
}

