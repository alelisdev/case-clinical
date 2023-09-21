

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInsuranceTypeFeatureStore } from '@case-clinical/web/insurance-type/shared'
import {InsuranceType} from '@case-clinical/web/core/data-access'


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
      <ui-insurance-type-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceType]="insuranceType"
      >
      >
      </ui-insurance-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-insurance-type-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceType]="{}"
      >
      </ui-insurance-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-insurance-type-select-table-view
        class="w-full h-full bg-white"
        [insuranceTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-insurance-type-select-table-view>
    </ng-template>
  `,
})
export class WebInsuranceTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  insuranceType: InsuranceType

  constructor(private store: WebInsuranceTypeFeatureStore) {
    super()
    this.store.loadInsuranceTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.insuranceTypes$.pipe(
      switchMap((insuranceTypes) => {
        return of(insuranceTypes)
      }),
    )
  }
}

