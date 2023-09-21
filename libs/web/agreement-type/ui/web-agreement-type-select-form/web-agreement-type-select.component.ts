

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAgreementTypeFeatureStore } from '@case-clinical/web/agreement-type/shared'
import {AgreementType} from '@case-clinical/web/core/data-access'


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
      <ui-agreement-type-form
        class="flex-grow flex flex-col"
        [formName]="'agreementType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [agreementType]="agreementType"
      >
      >
      </ui-agreement-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-agreement-type-form
        class="flex-grow flex flex-col"
        [formName]="'agreementType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [agreementType]="{}"
      >
      </ui-agreement-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-agreement-type-select-table-view
        class="w-full h-full bg-white"
        [agreementTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-agreement-type-select-table-view>
    </ng-template>
  `,
})
export class WebAgreementTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  agreementType: AgreementType

  constructor(private store: WebAgreementTypeFeatureStore) {
    super()
    this.store.loadAgreementTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.agreementTypes$.pipe(
      switchMap((agreementTypes) => {
        return of(agreementTypes)
      }),
    )
  }
}

