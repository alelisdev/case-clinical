

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBalanceRequestFeatureStore } from '@case-clinical/web/balance-request/shared'
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
      <ui-balance-request-form
        class="flex-grow flex flex-col"
        [formName]="'balanceRequest_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [balanceRequest]="context.value"
      >
      </ui-balance-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-balance-request-form
        class="flex-grow flex flex-col"
        [formName]="'balanceRequest_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [balanceRequest]="{}"
      >
      </ui-balance-request-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-balance-request-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [balanceRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-balance-request-select-table-view>
    </ng-template>
  `,
})
export class WebBalanceRequestGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
