

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEducationFeatureStore } from '@case-clinical/web/education/shared'
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
      <ui-education-form
        class="flex-grow flex flex-col"
        [formName]="'education_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [education]="context.value"
      >
      </ui-education-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-education-form
        class="flex-grow flex flex-col"
        [formName]="'education_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [education]="{}"
      >
      </ui-education-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-education-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [educations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-education-select-table-view>
    </ng-template>
  `,
})
export class WebEducationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
