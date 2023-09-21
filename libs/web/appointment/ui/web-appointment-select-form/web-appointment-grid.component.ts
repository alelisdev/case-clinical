

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAppointmentFeatureStore } from '@case-clinical/web/appointment/shared'
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
      <ui-appointment-form
        class="flex-grow flex flex-col"
        [formName]="'appointment_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointment]="context.value"
      >
      </ui-appointment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-appointment-form
        class="flex-grow flex flex-col"
        [formName]="'appointment_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointment]="{}"
      >
      </ui-appointment-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-appointment-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [appointments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-appointment-select-table-view>
    </ng-template>
  `,
})
export class WebAppointmentGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
