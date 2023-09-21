

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
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
      <ui-clinical-provider-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProvider_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProvider]="context.value"
      >
      </ui-clinical-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProvider_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProvider]="{}"
      >
      </ui-clinical-provider-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [clinicalProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-clinical-provider-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
