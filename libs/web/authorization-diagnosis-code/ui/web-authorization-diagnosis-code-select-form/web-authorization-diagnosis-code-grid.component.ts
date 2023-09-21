

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/authorization-diagnosis-code/shared'
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
      <ui-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationDiagnosisCode_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationDiagnosisCode]="context.value"
      >
      </ui-authorization-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationDiagnosisCode_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationDiagnosisCode]="{}"
      >
      </ui-authorization-diagnosis-code-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-authorization-diagnosis-code-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [authorizationDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-authorization-diagnosis-code-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationDiagnosisCodeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
