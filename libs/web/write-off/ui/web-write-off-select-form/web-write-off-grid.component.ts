

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebWriteOffFeatureStore } from '@case-clinical/web/write-off/shared'
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
      <ui-write-off-form
        class="flex-grow flex flex-col"
        [formName]="'writeOff_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [writeOff]="context.value"
      >
      </ui-write-off-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-write-off-form
        class="flex-grow flex flex-col"
        [formName]="'writeOff_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [writeOff]="{}"
      >
      </ui-write-off-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-write-off-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [writeOffs]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-write-off-select-table-view>
    </ng-template>
  `,
})
export class WebWriteOffGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
