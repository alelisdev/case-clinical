

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVendorLocationFeatureStore } from '@case-clinical/web/vendor-location/shared'
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
      <ui-vendor-location-form
        class="flex-grow flex flex-col"
        [formName]="'vendorLocation_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorLocation]="context.value"
      >
      </ui-vendor-location-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-vendor-location-form
        class="flex-grow flex flex-col"
        [formName]="'vendorLocation_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [vendorLocation]="{}"
      >
      </ui-vendor-location-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-vendor-location-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [vendorLocations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-vendor-location-select-table-view>
    </ng-template>
  `,
})
export class WebVendorLocationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
