

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDocumentFeatureStore } from '@case-clinical/web/document/shared'
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
      <ui-document-form
        class="flex-grow flex flex-col"
        [formName]="'document_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [document]="context.value"
      >
      </ui-document-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-document-form
        class="flex-grow flex flex-col"
        [formName]="'document_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [document]="{}"
      >
      </ui-document-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-document-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [documents]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-document-select-table-view>
    </ng-template>
  `,
})
export class WebDocumentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
