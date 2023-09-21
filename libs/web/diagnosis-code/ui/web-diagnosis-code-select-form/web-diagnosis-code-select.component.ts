

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebDiagnosisCodeFeatureStore } from '@case-clinical/web/diagnosis-code/shared'
import {DiagnosisCode} from '@case-clinical/web/core/data-access'


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
      <ui-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'diagnosisCode_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [diagnosisCode]="diagnosisCode"
      >
      >
      </ui-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'diagnosisCode_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [diagnosisCode]="{}"
      >
      </ui-diagnosis-code-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-diagnosis-code-select-table-view
        class="w-full h-full bg-white"
        [diagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-diagnosis-code-select-table-view>
    </ng-template>
  `,
    providers: [WebDiagnosisCodeFeatureStore]
})
export class WebDiagnosisCodeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  diagnosisCode: DiagnosisCode

  constructor(private store: WebDiagnosisCodeFeatureStore) {
    super()
    this.store.loadDiagnosisCodesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.diagnosisCodes$.pipe(
      switchMap((diagnosisCodes) => {
        return of(diagnosisCodes)
      }),
    )
  }
}

