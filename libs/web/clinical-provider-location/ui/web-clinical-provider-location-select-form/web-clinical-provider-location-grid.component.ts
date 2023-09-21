

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderLocationFeatureStore } from '@case-clinical/web/clinical-provider-location/shared'
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
      <ui-clinical-provider-location-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderLocation_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderLocation]="context.value"
      >
      </ui-clinical-provider-location-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-location-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderLocation_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderLocation]="{}"
      >
      </ui-clinical-provider-location-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-location-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [clinicalProviderLocations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-clinical-provider-location-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderLocationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
