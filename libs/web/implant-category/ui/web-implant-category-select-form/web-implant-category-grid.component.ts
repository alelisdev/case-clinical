

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebImplantCategoryFeatureStore } from '@case-clinical/web/implant-category/shared'
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
      <ui-implant-category-form
        class="flex-grow flex flex-col"
        [formName]="'implantCategory_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implantCategory]="context.value"
      >
      </ui-implant-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-implant-category-form
        class="flex-grow flex flex-col"
        [formName]="'implantCategory_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implantCategory]="{}"
      >
      </ui-implant-category-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-implant-category-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [implantCategories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-implant-category-select-table-view>
    </ng-template>
  `,
})
export class WebImplantCategoryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}