

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEligibilityStatusFeatureStore } from '@case-clinical/web/eligibility-status/shared'
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
      <ui-eligibility-status-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityStatus]="context.value"
      >
      </ui-eligibility-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-eligibility-status-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityStatus]="{}"
      >
      </ui-eligibility-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-eligibility-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [eligibilityStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-eligibility-status-select-table-view>
    </ng-template>
  `,
})
export class WebEligibilityStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
