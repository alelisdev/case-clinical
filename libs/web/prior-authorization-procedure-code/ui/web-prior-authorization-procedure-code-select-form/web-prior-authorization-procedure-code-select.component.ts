

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationProcedureCodeFeatureStore } from '@case-clinical/web/prior-authorization-procedure-code/shared'
import {PriorAuthorizationProcedureCode} from '@case-clinical/web/core/data-access'


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
      <ui-prior-authorization-procedure-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationProcedureCode_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationProcedureCode]="priorAuthorizationProcedureCode"
      >
      >
      </ui-prior-authorization-procedure-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-procedure-code-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationProcedureCode_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationProcedureCode]="{}"
      >
      </ui-prior-authorization-procedure-code-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-procedure-code-select-table-view
        class="w-full h-full bg-white"
        [priorAuthorizationProcedureCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-authorization-procedure-code-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationProcedureCodeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorAuthorizationProcedureCode: PriorAuthorizationProcedureCode

  constructor(private store: WebPriorAuthorizationProcedureCodeFeatureStore) {
    super()
    this.store.loadPriorAuthorizationProcedureCodesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorAuthorizationProcedureCodes$.pipe(
      switchMap((priorAuthorizationProcedureCodes) => {
        return of(priorAuthorizationProcedureCodes)
      }),
    )
  }
}

