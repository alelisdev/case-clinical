

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
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
      <ui-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'specialty_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [specialty]="context.value"
      >
      </ui-specialty-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'specialty_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [specialty]="{}"
      >
      </ui-specialty-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-specialty-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [specialties]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-specialty-select-table-view>
    </ng-template>
  `,
})
export class WebSpecialtyGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
