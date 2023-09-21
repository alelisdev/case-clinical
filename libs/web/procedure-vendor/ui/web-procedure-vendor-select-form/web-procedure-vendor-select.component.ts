

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureVendorFeatureStore } from '@case-clinical/web/procedure-vendor/shared'
import {ProcedureVendor} from '@case-clinical/web/core/data-access'


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
      <ui-procedure-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendor_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendor]="procedureVendor"
      >
      >
      </ui-procedure-vendor-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-vendor-form
        class="flex-grow flex flex-col"
        [formName]="'procedureVendor_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureVendor]="{}"
      >
      </ui-procedure-vendor-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-vendor-select-table-view
        class="w-full h-full bg-white"
        [procedureVendors]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-vendor-select-table-view>
    </ng-template>
  `,
    providers: [WebProcedureVendorFeatureStore]
})
export class WebProcedureVendorSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureVendor: ProcedureVendor

  constructor(private store: WebProcedureVendorFeatureStore) {
    super()
    this.store.loadProcedureVendorsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureVendors$.pipe(
      switchMap((procedureVendors) => {
        return of(procedureVendors)
      }),
    )
  }
}

