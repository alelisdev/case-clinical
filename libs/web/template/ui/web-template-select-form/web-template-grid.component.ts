

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
// /import { WebTemplateFeatureStore } from '@case-clinical/web/template/shared'
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
      <ui-template-form
        class="flex-grow flex flex-col"
        [formName]="'teamUser_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamUser]="context.value"
      >
      </ui-template-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-template-form
        class="flex-grow flex flex-col"
        [formName]="'teamUser_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [teamUser]="{}"
      >
      </ui-template-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-template-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [teamUsers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-template-select-table-view>
    </ng-template>
  `,
})
export class WebTemplateGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
