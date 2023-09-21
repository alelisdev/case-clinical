

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAccountStatusFeatureStore } from '@case-clinical/web/account-status/shared'
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
      <ui-account-status-form
        class="flex-grow flex flex-col"
        [formName]="'accountStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accountStatus]="context.value"
      >
      </ui-account-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-account-status-form
        class="flex-grow flex flex-col"
        [formName]="'accountStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accountStatus]="{}"
      >
      </ui-account-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-account-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [accountStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-account-status-select-table-view>
    </ng-template>
  `,
})
export class WebAccountStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
