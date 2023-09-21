

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseAccountFeatureStore } from '@case-clinical/web/case-account/shared'
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
      <ui-case-account-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccount_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccount]="context.value"
      >
      </ui-case-account-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-account-form
        class="flex-grow flex flex-col"
        [formName]="'caseAccount_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseAccount]="{}"
      >
      </ui-case-account-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-case-account-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [caseAccounts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-case-account-select-table-view>
    </ng-template>
  `,
})
export class WebCaseAccountGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
