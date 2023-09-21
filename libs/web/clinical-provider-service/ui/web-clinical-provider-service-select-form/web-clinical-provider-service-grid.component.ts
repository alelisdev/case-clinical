

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderServiceFeatureStore } from '@case-clinical/web/clinical-provider-service/shared'
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
      <ui-clinical-provider-service-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderService_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderService]="context.value"
      >
      </ui-clinical-provider-service-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-service-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderService_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderService]="{}"
      >
      </ui-clinical-provider-service-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-service-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [clinicalProviderServices]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-clinical-provider-service-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderServiceGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
