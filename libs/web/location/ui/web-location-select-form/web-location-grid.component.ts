

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLocationFeatureStore } from '@case-clinical/web/location/shared'
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
      <ui-location-form
        class="flex-grow flex flex-col"
        [formName]="'location_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [location]="context.value"
      >
      </ui-location-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-location-form
        class="flex-grow flex flex-col"
        [formName]="'location_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [location]="{}"
      >
      </ui-location-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-location-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [locations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-location-select-table-view>
    </ng-template>
  `,
})
export class WebLocationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
