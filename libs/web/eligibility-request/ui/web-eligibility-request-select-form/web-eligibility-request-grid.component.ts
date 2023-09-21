

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEligibilityRequestFeatureStore } from '@case-clinical/web/eligibility-request/shared'
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
      <ui-eligibility-request-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityRequest_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityRequest]="context.value"
      >
      </ui-eligibility-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-eligibility-request-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityRequest_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityRequest]="{}"
      >
      </ui-eligibility-request-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-eligibility-request-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [eligibilityRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-eligibility-request-select-table-view>
    </ng-template>
  `,
})
export class WebEligibilityRequestGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
