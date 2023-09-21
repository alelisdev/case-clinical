

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCostCategoryFeatureStore } from '@case-clinical/web/cost-category/shared'
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
      <ui-cost-category-form
        class="flex-grow flex flex-col"
        [formName]="'costCategory_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [costCategory]="context.value"
      >
      </ui-cost-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-cost-category-form
        class="flex-grow flex flex-col"
        [formName]="'costCategory_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [costCategory]="{}"
      >
      </ui-cost-category-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-cost-category-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [costCategories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-cost-category-select-table-view>
    </ng-template>
  `,
})
export class WebCostCategoryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
