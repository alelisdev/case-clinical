

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadTreatmentFeatureStore } from '@case-clinical/web/lead-treatment/shared'
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
      <ui-lead-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'leadTreatment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadTreatment]="context.value"
      >
      </ui-lead-treatment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'leadTreatment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadTreatment]="{}"
      >
      </ui-lead-treatment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-lead-treatment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [leadTreatments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-lead-treatment-select-table-view>
    </ng-template>
  `,
})
export class WebLeadTreatmentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
