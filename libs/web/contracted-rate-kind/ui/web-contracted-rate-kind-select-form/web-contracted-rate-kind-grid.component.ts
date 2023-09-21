

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractedRateKindFeatureStore } from '@case-clinical/web/contracted-rate-kind/shared'
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
      <ui-contracted-rate-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRateKind_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRateKind]="context.value"
      >
      </ui-contracted-rate-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contracted-rate-kind-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRateKind_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRateKind]="{}"
      >
      </ui-contracted-rate-kind-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contracted-rate-kind-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contractedRateKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contracted-rate-kind-select-table-view>
    </ng-template>
  `,
})
export class WebContractedRateKindGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
