

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVendorTypeFeatureStore } from '@case-clinical/web/vendor-type/shared'
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
      <ui-vendor-type-form
        class="flex-grow flex flex-col"
        [formName]="'vendorType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorType]="context.value"
      >
      </ui-vendor-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-vendor-type-form
        class="flex-grow flex flex-col"
        [formName]="'vendorType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorType]="{}"
      >
      </ui-vendor-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-vendor-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [vendorTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-vendor-type-select-table-view>
    </ng-template>
  `,
})
export class WebVendorTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
