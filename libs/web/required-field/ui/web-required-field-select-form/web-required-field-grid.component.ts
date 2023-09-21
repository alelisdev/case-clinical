

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRequiredFieldFeatureStore } from '@case-clinical/web/required-field/shared'
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
      <ui-required-field-form
        class="flex-grow flex flex-col"
        [formName]="'requiredField_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [requiredField]="context.value"
      >
      </ui-required-field-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-required-field-form
        class="flex-grow flex flex-col"
        [formName]="'requiredField_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [requiredField]="{}"
      >
      </ui-required-field-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-required-field-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [requiredFields]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-required-field-select-table-view>
    </ng-template>
  `,
})
export class WebRequiredFieldGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
