

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAccidentTypeFeatureStore } from '@case-clinical/web/accident-type/shared'
import {AccidentType} from '@case-clinical/web/core/data-access'


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
      <ui-accident-type-form
        class="flex-grow flex flex-col"
        [formName]="'accidentType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accidentType]="accidentType"
      >
      >
      </ui-accident-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-accident-type-form
        class="flex-grow flex flex-col"
        [formName]="'accidentType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [accidentType]="{}"
      >
      </ui-accident-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-accident-type-select-table-view
        class="w-full h-full bg-white"
        [accidentTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-accident-type-select-table-view>
    </ng-template>
  `,
})
export class WebAccidentTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  accidentType: AccidentType

  constructor(private store: WebAccidentTypeFeatureStore) {
    super()
    this.store.loadAccidentTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.accidentTypes$.pipe(
      switchMap((accidentTypes) => {
        return of(accidentTypes)
      }),
    )
  }
}

