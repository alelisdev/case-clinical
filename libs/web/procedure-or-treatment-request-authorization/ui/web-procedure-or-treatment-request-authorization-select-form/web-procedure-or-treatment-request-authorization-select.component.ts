

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureOrTreatmentRequestAuthorizationFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-authorization/shared'
import {ProcedureOrTreatmentRequestAuthorization} from '@case-clinical/web/core/data-access'


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
      <ui-procedure-or-treatment-request-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequestAuthorization_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequestAuthorization]="procedureOrTreatmentRequestAuthorization"
      >
      >
      </ui-procedure-or-treatment-request-authorization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-or-treatment-request-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequestAuthorization_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequestAuthorization]="{}"
      >
      </ui-procedure-or-treatment-request-authorization-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-or-treatment-request-authorization-select-table-view
        class="w-full h-full bg-white"
        [procedureOrTreatmentRequestAuthorizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-or-treatment-request-authorization-select-table-view>
    </ng-template>
  `,
    providers: [WebProcedureOrTreatmentRequestAuthorizationFeatureStore]
})
export class WebProcedureOrTreatmentRequestAuthorizationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureOrTreatmentRequestAuthorization: ProcedureOrTreatmentRequestAuthorization

  constructor(private store: WebProcedureOrTreatmentRequestAuthorizationFeatureStore) {
    super()
    this.store.loadProcedureOrTreatmentRequestAuthorizationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureOrTreatmentRequestAuthorizations$.pipe(
      switchMap((procedureOrTreatmentRequestAuthorizations) => {
        return of(procedureOrTreatmentRequestAuthorizations)
      }),
    )
  }
}

