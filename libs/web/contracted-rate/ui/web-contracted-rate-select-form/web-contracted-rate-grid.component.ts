

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebContractedRateFeatureStore } from '@case-clinical/web/contracted-rate/shared'
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
      <ui-contracted-rate-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRate_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRate]="context.value"
      >
      </ui-contracted-rate-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-contracted-rate-form
        class="flex-grow flex flex-col"
        [formName]="'contractedRate_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [contractedRate]="{}"
      >
      </ui-contracted-rate-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-contracted-rate-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [contractedRates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-contracted-rate-select-table-view>
    </ng-template>
  `,
})
export class WebContractedRateGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
