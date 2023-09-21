

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureStatusFeatureStore } from '@case-clinical/web/procedure-status/shared'
import {ProcedureStatus} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-procedure-status-form
        class="flex-grow flex flex-col"
        [formName]="'procedureStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureStatus]="procedureStatus"
      >
      >
      </ui-procedure-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-status-form
        class="flex-grow flex flex-col"
        [formName]="'procedureStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureStatus]="{}"
      >
      </ui-procedure-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-status-select-table-view
        class="w-full h-full bg-white"
        [procedureStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-status-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureStatus: ProcedureStatus

  constructor(private store: WebProcedureStatusFeatureStore) {
    super()
    this.store.loadProcedureStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureStatuses$.pipe(
      switchMap((procedureStatuses) => {
        return of(procedureStatuses)
      }),
    )
  }
}

