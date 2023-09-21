

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'
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
      <ui-procedure-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendor_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendor]="context.value"
      >
      </ui-procedure-vendor-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendor_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendor]="{}"
      >
      </ui-procedure-vendor-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-procedure-vendor-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [procedureVendors]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-procedure-vendor-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureVendorGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
