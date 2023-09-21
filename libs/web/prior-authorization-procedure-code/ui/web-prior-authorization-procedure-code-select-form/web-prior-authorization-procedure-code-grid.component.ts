

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationProcedureCodeFeatureStore } from '@case-clinical/web/prior-authorization-procedure-code/shared'
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
      <ui-prior-authorization-procedure-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationProcedureCode_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationProcedureCode]="context.value"
      >
      </ui-prior-authorization-procedure-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-procedure-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationProcedureCode_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationProcedureCode]="{}"
      >
      </ui-prior-authorization-procedure-code-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-procedure-code-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthorizationProcedureCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-authorization-procedure-code-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationProcedureCodeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
