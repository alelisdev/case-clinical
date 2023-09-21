

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureVendorStatusFeatureStore } from '@case-clinical/web/procedure-vendor-status/shared'
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
      <ui-procedure-vendor-status-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendorStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendorStatus]="context.value"
      >
      </ui-procedure-vendor-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-vendor-status-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendorStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendorStatus]="{}"
      >
      </ui-procedure-vendor-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-procedure-vendor-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [procedureVendorStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-procedure-vendor-status-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureVendorStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
