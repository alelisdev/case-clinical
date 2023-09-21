

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRecommendedOrderDiagnosisCodeFeatureStore } from '@case-clinical/web/recommended-order-diagnosis-code/shared'
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
      <ui-recommended-order-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderDiagnosisCode_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderDiagnosisCode]="context.value"
      >
      </ui-recommended-order-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-recommended-order-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderDiagnosisCode_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderDiagnosisCode]="{}"
      >
      </ui-recommended-order-diagnosis-code-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-recommended-order-diagnosis-code-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [recommendedOrderDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-recommended-order-diagnosis-code-select-table-view>
    </ng-template>
  `,
})
export class WebRecommendedOrderDiagnosisCodeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
