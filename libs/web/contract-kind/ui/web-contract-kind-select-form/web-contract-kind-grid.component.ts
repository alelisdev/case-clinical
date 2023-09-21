

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractKindFeatureStore } from '@case-clinical/web/contract-kind/shared'
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
      <ui-contract-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contractKind_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractKind]="context.value"
      >
      </ui-contract-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contract-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contractKind_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractKind]="{}"
      >
      </ui-contract-kind-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contract-kind-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contractKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contract-kind-select-table-view>
    </ng-template>
  `,
})
export class WebContractKindGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
