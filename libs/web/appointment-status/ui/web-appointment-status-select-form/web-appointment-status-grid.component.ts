

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAppointmentStatusFeatureStore } from '@case-clinical/web/appointment-status/shared'
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
      <ui-appointment-status-form
        class="flex-grow flex flex-col"
        [formName]="'appointmentStatus_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointmentStatus]="context.value"
      >
      </ui-appointment-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-appointment-status-form
        class="flex-grow flex flex-col"
        [formName]="'appointmentStatus_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [appointmentStatus]="{}"
      >
      </ui-appointment-status-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-appointment-status-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [appointmentStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-appointment-status-select-table-view>
    </ng-template>
  `,
})
export class WebAppointmentStatusGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
