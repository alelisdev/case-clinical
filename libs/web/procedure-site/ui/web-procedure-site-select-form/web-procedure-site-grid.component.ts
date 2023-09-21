

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureSiteFeatureStore } from '@case-clinical/web/procedure-site/shared'
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
      <ui-procedure-site-form
        class="flex-grow flex flex-col"
        [formName]="'procedureSite_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureSite]="context.value"
      >
      </ui-procedure-site-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-site-form
        class="flex-grow flex flex-col"
        [formName]="'procedureSite_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureSite]="{}"
      >
      </ui-procedure-site-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-procedure-site-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [procedureSites]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-procedure-site-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureSiteGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
