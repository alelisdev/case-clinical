

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationCategoryFeatureStore } from '@case-clinical/web/authorization-category/shared'
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
      <ui-authorization-category-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationCategory_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationCategory]="context.value"
      >
      </ui-authorization-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-category-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationCategory_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationCategory]="{}"
      >
      </ui-authorization-category-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-authorization-category-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [authorizationCategories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-authorization-category-select-table-view>
    </ng-template>
  `,
})
export class WebAuthorizationCategoryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
