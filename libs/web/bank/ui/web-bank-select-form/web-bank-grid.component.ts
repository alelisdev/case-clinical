

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBankFeatureStore } from '@case-clinical/web/bank/shared'
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
      <ui-bank-form
        class="flex-grow flex flex-col"
        [formName]="'bank_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bank]="context.value"
      >
      </ui-bank-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-bank-form
        class="flex-grow flex flex-col"
        [formName]="'bank_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bank]="{}"
      >
      </ui-bank-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-bank-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [banks]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-bank-select-table-view>
    </ng-template>
  `,
})
export class WebBankGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
