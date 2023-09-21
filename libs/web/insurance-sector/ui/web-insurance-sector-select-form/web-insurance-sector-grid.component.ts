

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInsuranceSectorFeatureStore } from '@case-clinical/web/insurance-sector/shared'
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
      <ui-insurance-sector-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceSector_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceSector]="context.value"
      >
      </ui-insurance-sector-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-insurance-sector-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceSector_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceSector]="{}"
      >
      </ui-insurance-sector-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-insurance-sector-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [insuranceSectors]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-insurance-sector-select-table-view>
    </ng-template>
  `,
})
export class WebInsuranceSectorGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
