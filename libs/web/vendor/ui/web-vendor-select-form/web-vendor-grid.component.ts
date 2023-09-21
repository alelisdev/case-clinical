

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVendorFeatureStore } from '@case-clinical/web/vendor/shared'
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
      <ui-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'vendor_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendor]="context.value"
      >
      </ui-vendor-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'vendor_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendor]="{}"
      >
      </ui-vendor-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-vendor-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [vendors]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-vendor-select-table-view>
    </ng-template>
  `,
})
export class WebVendorGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
