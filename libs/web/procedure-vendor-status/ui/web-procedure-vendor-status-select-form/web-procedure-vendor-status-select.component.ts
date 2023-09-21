

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureVendorStatusFeatureStore } from '@case-clinical/web/procedure-vendor-status/shared'
import {ProcedureVendorStatus} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-procedure-vendor-status-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendorStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendorStatus]="procedureVendorStatus"
      >
      >
      </ui-procedure-vendor-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-vendor-status-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendorStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendorStatus]="{}"
      >
      </ui-procedure-vendor-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-vendor-status-select-table-view
        class="w-full h-full bg-white"
        [procedureVendorStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-vendor-status-select-table-view>
    </ng-template>
  `,
    providers: [WebProcedureVendorStatusFeatureStore]
})
export class WebProcedureVendorStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureVendorStatus: ProcedureVendorStatus

  constructor(private store: WebProcedureVendorStatusFeatureStore) {
    super()
    this.store.loadProcedureVendorStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureVendorStatuses$.pipe(
      switchMap((procedureVendorStatuses) => {
        return of(procedureVendorStatuses)
      }),
    )
  }
}

