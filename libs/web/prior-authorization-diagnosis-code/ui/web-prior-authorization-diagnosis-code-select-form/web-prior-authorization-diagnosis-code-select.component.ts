

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationDiagnosisCodeFeatureStore } from '@case-clinical/web/prior-authorization-diagnosis-code/shared'
import {PriorAuthorizationDiagnosisCode} from '@case-clinical/web/core/data-access'


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
      <ui-prior-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationDiagnosisCode_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationDiagnosisCode]="priorAuthorizationDiagnosisCode"
      >
      >
      </ui-prior-authorization-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationDiagnosisCode_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationDiagnosisCode]="{}"
      >
      </ui-prior-authorization-diagnosis-code-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-diagnosis-code-select-table-view
        class="w-full h-full bg-white"
        [priorAuthorizationDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-authorization-diagnosis-code-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationDiagnosisCodeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorAuthorizationDiagnosisCode: PriorAuthorizationDiagnosisCode

  constructor(private store: WebPriorAuthorizationDiagnosisCodeFeatureStore) {
    super()
    this.store.loadPriorAuthorizationDiagnosisCodesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorAuthorizationDiagnosisCodes$.pipe(
      switchMap((priorAuthorizationDiagnosisCodes) => {
        return of(priorAuthorizationDiagnosisCodes)
      }),
    )
  }
}

