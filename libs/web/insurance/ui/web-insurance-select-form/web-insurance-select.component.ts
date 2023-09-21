

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInsuranceFeatureStore } from '@case-clinical/web/insurance/shared'
import {Insurance} from '@case-clinical/web/core/data-access'


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
      <ui-insurance-form
        class="flex-grow flex flex-col"
        [formName]="'insurance_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insurance]="insurance"
      >
      >
      </ui-insurance-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-insurance-form
        class="flex-grow flex flex-col"
        [formName]="'insurance_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insurance]="{}"
      >
      </ui-insurance-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-insurance-select-table-view
        class="w-full h-full bg-white"
        [insurances]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-insurance-select-table-view>
    </ng-template>
  `,
})
export class WebInsuranceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  insurance: Insurance

  constructor(private store: WebInsuranceFeatureStore) {
    super()
    this.store.loadInsurancesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.insurances$.pipe(
      switchMap((insurances) => {
        return of(insurances)
      }),
    )
  }
}

