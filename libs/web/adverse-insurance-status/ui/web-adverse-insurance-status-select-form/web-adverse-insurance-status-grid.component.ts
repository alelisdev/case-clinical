

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAdverseInsuranceStatusFeatureStore } from '@case-clinical/web/adverse-insurance-status/shared'
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
      <ui-adverse-insurance-status-form
        class="flex-grow flex flex-col"
        [formName]="'adverseInsuranceStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [adverseInsuranceStatus]="context.value"
      >
      </ui-adverse-insurance-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-adverse-insurance-status-form
        class="flex-grow flex flex-col"
        [formName]="'adverseInsuranceStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [adverseInsuranceStatus]="{}"
      >
      </ui-adverse-insurance-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-adverse-insurance-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [adverseInsuranceStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-adverse-insurance-status-select-table-view>
    </ng-template>
  `,
})
export class WebAdverseInsuranceStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
