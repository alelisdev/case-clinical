

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared'
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
      <ui-gender-form
        class="flex-grow flex flex-col"
        [formName]="'gender_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [gender]="context.value"
      >
      </ui-gender-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-gender-form
        class="flex-grow flex flex-col"
        [formName]="'gender_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [gender]="{}"
      >
      </ui-gender-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-gender-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [genders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-gender-select-table-view>
    </ng-template>
  `,
})
export class WebGenderGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
