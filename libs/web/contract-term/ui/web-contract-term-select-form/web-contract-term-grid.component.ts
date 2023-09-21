

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractTermFeatureStore } from '@case-clinical/web/contract-term/shared'
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
      <ui-contract-term-form
        class="flex-grow flex flex-col"
        [formName]="'contractTerm_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractTerm]="context.value"
      >
      </ui-contract-term-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contract-term-form
        class="flex-grow flex flex-col"
        [formName]="'contractTerm_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractTerm]="{}"
      >
      </ui-contract-term-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contract-term-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contractTerms]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contract-term-select-table-view>
    </ng-template>
  `,
})
export class WebContractTermGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
