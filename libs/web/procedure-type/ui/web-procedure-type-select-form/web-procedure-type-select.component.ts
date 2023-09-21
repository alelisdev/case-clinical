

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureTypeFeatureStore } from '@case-clinical/web/procedure-type/shared'
import {ProcedureType} from '@case-clinical/web/core/data-access'


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
      <ui-procedure-type-form
        class="flex-grow flex flex-col"
        [formName]="'procedureType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureType]="procedureType"
      >
      >
      </ui-procedure-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-type-form
        class="flex-grow flex flex-col"
        [formName]="'procedureType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedureType]="{}"
      >
      </ui-procedure-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-type-select-table-view
        class="w-full h-full bg-white"
        [procedureTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-type-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedureType: ProcedureType

  constructor(private store: WebProcedureTypeFeatureStore) {
    super()
    this.store.loadProcedureTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedureTypes$.pipe(
      switchMap((procedureTypes) => {
        return of(procedureTypes)
      }),
    )
  }
}

