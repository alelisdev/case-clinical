

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore } from '@case-clinical/web/procedure-or-treatment-request-diagnosis-code/shared'
import {ProcedureOrTreatmentRequestDiagnosisCode} from '@case-clinical/web/core/data-access'


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
      <ui-procedure-or-treatment-request-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequestDiagnosisCode_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequestDiagnosisCode]="procedureOrTreatmentRequestDiagnosisCode"
      >
      >
      </ui-procedure-or-treatment-request-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-or-treatment-request-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'procedureOrTreatmentRequestDiagnosisCode_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureOrTreatmentRequestDiagnosisCode]="{}"
      >
      </ui-procedure-or-treatment-request-diagnosis-code-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-or-treatment-request-diagnosis-code-select-table-view
        class="w-full h-full bg-white"
        [procedureOrTreatmentRequestDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-or-treatment-request-diagnosis-code-select-table-view>
    </ng-template>
  `,
    providers: [WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore]
})
export class WebProcedureOrTreatmentRequestDiagnosisCodeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureOrTreatmentRequestDiagnosisCode: ProcedureOrTreatmentRequestDiagnosisCode

  constructor(private store: WebProcedureOrTreatmentRequestDiagnosisCodeFeatureStore) {
    super()
    this.store.loadProcedureOrTreatmentRequestDiagnosisCodesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureOrTreatmentRequestDiagnosisCodes$.pipe(
      switchMap((procedureOrTreatmentRequestDiagnosisCodes) => {
        return of(procedureOrTreatmentRequestDiagnosisCodes)
      }),
    )
  }
}

