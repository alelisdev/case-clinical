

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseProcedureFeatureStore } from '@case-clinical/web/case-procedure/shared'
import {CaseProcedure} from '@case-clinical/web/core/data-access'


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
      <ui-case-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'caseProcedure_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProcedure]="caseProcedure"
      >
      >
      </ui-case-procedure-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-procedure-form
        class="flex-grow flex flex-col"
        [formName]="'caseProcedure_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProcedure]="{}"
      >
      </ui-case-procedure-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-procedure-select-table-view
        class="w-full h-full bg-white"
        [caseProcedures]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-procedure-select-table-view>
    </ng-template>
  `,
})
export class WebCaseProcedureSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  caseProcedure: CaseProcedure

  constructor(private store: WebCaseProcedureFeatureStore) {
    super()
    this.store.loadCaseProceduresEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.caseProcedures$.pipe(
      switchMap((caseProcedures) => {
        return of(caseProcedures)
      }),
    )
  }
}

