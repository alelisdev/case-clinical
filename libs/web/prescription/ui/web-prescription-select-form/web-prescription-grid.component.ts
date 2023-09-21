

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
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
      <ui-prescription-form
        class="flex-grow flex flex-col"
        [formName]="'prescription_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [prescription]="context.value"
      >
      </ui-prescription-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prescription-form
        class="flex-grow flex flex-col"
        [formName]="'prescription_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [prescription]="{}"
      >
      </ui-prescription-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prescription-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [prescriptions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prescription-select-table-view>
    </ng-template>
  `,
})
export class WebPrescriptionGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
