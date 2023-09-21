

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared'
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
      <ui-recommended-order-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrder_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrder]="context.value"
      >
      </ui-recommended-order-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-recommended-order-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrder_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrder]="{}"
      >
      </ui-recommended-order-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-recommended-order-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [recommendedOrders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-recommended-order-select-table-view>
    </ng-template>
  `,
})
export class WebRecommendedOrderGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
