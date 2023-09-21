

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractFeatureStore } from '@case-clinical/web/contract/shared'
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
      <ui-contract-form
        class="flex-grow flex flex-col"
        [formName]="'contract_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contract]="context.value"
      >
      </ui-contract-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contract-form
        class="flex-grow flex flex-col"
        [formName]="'contract_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contract]="{}"
      >
      </ui-contract-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contract-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contracts]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contract-select-table-view>
    </ng-template>
  `,
})
export class WebContractGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
