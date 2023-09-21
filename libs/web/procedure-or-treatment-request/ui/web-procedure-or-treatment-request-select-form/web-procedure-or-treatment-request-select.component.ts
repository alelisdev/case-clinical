

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureOrTreatmentRequestFeatureStore } from '@case-clinical/web/procedure-or-treatment-request/shared'
import {ProcedureOrTreatmentRequest} from '@case-clinical/web/core/data-access'


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
      <ui-procedure-or-treatment-request-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequest_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequest]="procedureOrTreatmentRequest"
      >
      >
      </ui-procedure-or-treatment-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-or-treatment-request-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequest_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequest]="{}"
      >
      </ui-procedure-or-treatment-request-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-or-treatment-request-select-table-view
        class="w-full h-full bg-white"
        [procedureOrTreatmentRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-or-treatment-request-select-table-view>
    </ng-template>
  `,
    providers: [WebProcedureOrTreatmentRequestFeatureStore]
})
export class WebProcedureOrTreatmentRequestSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureOrTreatmentRequest: ProcedureOrTreatmentRequest

  constructor(private store: WebProcedureOrTreatmentRequestFeatureStore) {
    super()
    this.store.loadProcedureOrTreatmentRequestsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureOrTreatmentRequests$.pipe(
      switchMap((procedureOrTreatmentRequests) => {
        return of(procedureOrTreatmentRequests)
      }),
    )
  }
}

