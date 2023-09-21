

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTreatmentFeatureStore } from '@case-clinical/web/treatment/shared'
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
      <ui-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'treatment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [treatment]="context.value"
      >
      </ui-treatment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'treatment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [treatment]="{}"
      >
      </ui-treatment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-treatment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [treatments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-treatment-select-table-view>
    </ng-template>
  `,
})
export class WebTreatmentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
