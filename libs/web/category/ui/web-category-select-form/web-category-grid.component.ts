

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCategoryFeatureStore } from '@case-clinical/web/category/shared'
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
      <ui-category-form
        class="flex-grow flex flex-col"
        [formName]="'category_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [category]="context.value"
      >
      </ui-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-category-form
        class="flex-grow flex flex-col"
        [formName]="'category_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [category]="{}"
      >
      </ui-category-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-category-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [categories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-category-select-table-view>
    </ng-template>
  `,
})
export class WebCategoryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
