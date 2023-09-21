

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthGuidelineFeatureStore } from '@case-clinical/web/prior-auth-guideline/shared'
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
      <ui-prior-auth-guideline-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthGuideline_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthGuideline]="context.value"
      >
      </ui-prior-auth-guideline-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-auth-guideline-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthGuideline_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthGuideline]="{}"
      >
      </ui-prior-auth-guideline-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-prior-auth-guideline-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [priorAuthGuidelines]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-prior-auth-guideline-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthGuidelineGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
