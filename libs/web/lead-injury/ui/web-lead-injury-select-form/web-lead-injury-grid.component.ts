

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadInjuryFeatureStore } from '@case-clinical/web/lead-injury/shared'
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
      <ui-lead-injury-form
        class="flex-grow flex flex-col"
        [formName]="'leadInjury_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadInjury]="context.value"
      >
      </ui-lead-injury-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-injury-form
        class="flex-grow flex flex-col"
        [formName]="'leadInjury_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadInjury]="{}"
      >
      </ui-lead-injury-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-lead-injury-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [leadInjuries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-lead-injury-select-table-view>
    </ng-template>
  `,
})
export class WebLeadInjuryGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
