

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInsuranceFeatureStore } from '@case-clinical/web/insurance/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-insurance-form
        class="flex-grow flex flex-col"
        [formName]="'insurance_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insurance]="context.value"
      >
      </ui-insurance-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-insurance-form
        class="flex-grow flex flex-col"
        [formName]="'insurance_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insurance]="{}"
      >
      </ui-insurance-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-insurance-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [insurances]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-insurance-select-table-view>
    </ng-template>
  `,
})
export class WebInsuranceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
