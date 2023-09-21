

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDocumentTypeFeatureStore } from '@case-clinical/web/document-type/shared'
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
      <ui-document-type-form
        class="flex-grow flex flex-col"
        [formName]="'documentType_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [documentType]="context.value"
      >
      </ui-document-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-document-type-form
        class="flex-grow flex flex-col"
        [formName]="'documentType_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [documentType]="{}"
      >
      </ui-document-type-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-document-type-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [documentTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-document-type-select-table-view>
    </ng-template>
  `,
})
export class WebDocumentTypeGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
