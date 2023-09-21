

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebGuidelineFeatureStore } from '@case-clinical/web/guideline/shared'
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
      <ui-guideline-form
        class="flex-grow flex flex-col"
        [formName]="'guideline_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guideline]="context.value"
      >
      </ui-guideline-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-guideline-form
        class="flex-grow flex flex-col"
        [formName]="'guideline_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guideline]="{}"
      >
      </ui-guideline-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-guideline-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [guidelines]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-guideline-select-table-view>
    </ng-template>
  `,
})
export class WebGuidelineGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
