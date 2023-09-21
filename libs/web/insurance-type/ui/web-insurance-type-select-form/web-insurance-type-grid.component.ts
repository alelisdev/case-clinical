

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInsuranceTypeFeatureStore } from '@case-clinical/web/insurance-type/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
     [readOnly]="to.readOnly"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-insurance-type-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceType]="context.value"
      >
      </ui-insurance-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-insurance-type-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceType]="{}"
      >
      </ui-insurance-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-insurance-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [insuranceTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-insurance-type-select-table-view>
    </ng-template>
  `,
})
export class WebInsuranceTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
