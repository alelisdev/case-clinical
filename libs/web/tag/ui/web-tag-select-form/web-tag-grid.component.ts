

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTagFeatureStore } from '@case-clinical/web/tag/shared'
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
      <ui-tag-form
        class="flex-grow flex flex-col"
        [formName]="'tag_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [tag]="context.value"
      >
      </ui-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-tag-form
        class="flex-grow flex flex-col"
        [formName]="'tag_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [tag]="{}"
      >
      </ui-tag-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-tag-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [tags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-tag-select-table-view>
    </ng-template>
  `,
})
export class WebTagGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
