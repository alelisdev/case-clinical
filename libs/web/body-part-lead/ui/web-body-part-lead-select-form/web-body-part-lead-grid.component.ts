

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBodyPartLeadFeatureStore } from '@case-clinical/web/body-part-lead/shared'
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
      <ui-body-part-lead-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPartLead_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPartLead]="context.value"
      >
      </ui-body-part-lead-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-body-part-lead-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPartLead_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPartLead]="{}"
      >
      </ui-body-part-lead-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-body-part-lead-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [bodyPartLeads]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-body-part-lead-select-table-view>
    </ng-template>
  `,
})
export class WebBodyPartLeadGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
