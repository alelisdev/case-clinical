

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'
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
      <ui-prior-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationDiagnosisCode_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationDiagnosisCode]="context.value"
      >
      </ui-prior-authorization-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationDiagnosisCode_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationDiagnosisCode]="{}"
      >
      </ui-prior-authorization-diagnosis-code-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-diagnosis-code-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthorizationDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-authorization-diagnosis-code-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationDiagnosisCodeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
