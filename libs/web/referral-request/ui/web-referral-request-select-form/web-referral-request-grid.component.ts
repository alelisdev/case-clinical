

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'
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
      <ui-referral-request-form
        class="flex-grow flex flex-col"
        [formName]="'referralRequest_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [referralRequest]="context.value"
      >
      </ui-referral-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-referral-request-form
        class="flex-grow flex flex-col"
        [formName]="'referralRequest_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [referralRequest]="{}"
      >
      </ui-referral-request-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-referral-request-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [referralRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-referral-request-select-table-view>
    </ng-template>
  `,
})
export class WebReferralRequestGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
