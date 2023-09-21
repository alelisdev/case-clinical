

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebMedicalConditionProviderFeatureStore } from '@case-clinical/web/medical-condition-provider/shared'
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
      <ui-medical-condition-provider-form
        class="flex-grow flex flex-col"
        [formName]="'medicalConditionProvider_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalConditionProvider]="context.value"
      >
      </ui-medical-condition-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-medical-condition-provider-form
        class="flex-grow flex flex-col"
        [formName]="'medicalConditionProvider_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [medicalConditionProvider]="{}"
      >
      </ui-medical-condition-provider-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-medical-condition-provider-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [medicalConditionProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-medical-condition-provider-select-table-view>
    </ng-template>
  `,
})
export class WebMedicalConditionProviderGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
