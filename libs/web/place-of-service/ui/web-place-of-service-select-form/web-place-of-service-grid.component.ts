

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'
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
      <ui-place-of-service-form
        class="flex-grow flex flex-col"
        [formName]="'placeOfService_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [placeOfService]="context.value"
      >
      </ui-place-of-service-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-place-of-service-form
        class="flex-grow flex flex-col"
        [formName]="'placeOfService_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [placeOfService]="{}"
      >
      </ui-place-of-service-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-place-of-service-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [placeOfServices]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-place-of-service-select-table-view>
    </ng-template>
  `,
})
export class WebPlaceOfServiceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
