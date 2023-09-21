

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebVisitKindFeatureStore } from '@case-clinical/web/visit-kind/shared'
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
      <ui-visit-kind-form
        class="flex-grow flex flex-col"
        [formName]="'visitKind_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [visitKind]="context.value"
      >
      </ui-visit-kind-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-visit-kind-form
        class="flex-grow flex flex-col"
        [formName]="'visitKind_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [visitKind]="{}"
      >
      </ui-visit-kind-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-visit-kind-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [visitKinds]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-visit-kind-select-table-view>
    </ng-template>
  `,
})
export class WebVisitKindGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
