

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderSpecialtyFeatureStore } from '@case-clinical/web/clinical-provider-specialty/shared'
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
      <ui-clinical-provider-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderSpecialty_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderSpecialty]="context.value"
      >
      </ui-clinical-provider-specialty-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderSpecialty_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderSpecialty]="{}"
      >
      </ui-clinical-provider-specialty-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-specialty-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [clinicalProviderSpecialties]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-clinical-provider-specialty-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderSpecialtyGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
