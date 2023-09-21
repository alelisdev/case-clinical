

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureOrTreatmentRequestAuthorizationFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-authorization/shared'
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
      <ui-procedure-or-treatment-request-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequestAuthorization_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequestAuthorization]="context.value"
      >
      </ui-procedure-or-treatment-request-authorization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-or-treatment-request-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequestAuthorization_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequestAuthorization]="{}"
      >
      </ui-procedure-or-treatment-request-authorization-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-procedure-or-treatment-request-authorization-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [procedureOrTreatmentRequestAuthorizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-procedure-or-treatment-request-authorization-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureOrTreatmentRequestAuthorizationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
