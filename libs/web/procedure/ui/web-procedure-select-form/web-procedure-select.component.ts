

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcedureFeatureStore } from '@case-clinical/web/procedure/shared'
import {Procedure} from '@case-clinical/web/core/data-access'


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
      <ui-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'procedure_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedure]="procedure"
      >
      >
      </ui-procedure-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'procedure_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [procedure]="{}"
      >
      </ui-procedure-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-procedure-select-table-view
        class="w-full h-full bg-white"
        [procedures]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-procedure-select-table-view>
    </ng-template>
  `,
})
export class WebProcedureSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  procedure: Procedure

  constructor(private store: WebProcedureFeatureStore) {
    super()
    this.store.loadProceduresEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.procedures$.pipe(
      switchMap((procedures) => {
        return of(procedures)
      }),
    )
  }
}

