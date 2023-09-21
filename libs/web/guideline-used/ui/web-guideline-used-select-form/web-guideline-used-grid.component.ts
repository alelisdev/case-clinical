

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebGuidelineUsedFeatureStore } from '@case-clinical/web/guideline-used/shared'
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
      <ui-guideline-used-form
        class="flex-grow flex flex-col"
        [formName]="'guidelineUsed_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guidelineUsed]="context.value"
      >
      </ui-guideline-used-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-guideline-used-form
        class="flex-grow flex flex-col"
        [formName]="'guidelineUsed_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [guidelineUsed]="{}"
      >
      </ui-guideline-used-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-guideline-used-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [guidelineUseds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-guideline-used-select-table-view>
    </ng-template>
  `,
})
export class WebGuidelineUsedGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
