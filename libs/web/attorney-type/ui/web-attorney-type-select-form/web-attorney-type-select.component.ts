

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAttorneyTypeFeatureStore } from '@case-clinical/web/attorney-type/shared'
import {AttorneyType} from '@case-clinical/web/core/data-access'


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
      <ui-attorney-type-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyType]="attorneyType"
      >
      >
      </ui-attorney-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-attorney-type-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyType]="{}"
      >
      </ui-attorney-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-attorney-type-select-table-view
        class="w-full h-full bg-white"
        [attorneyTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-attorney-type-select-table-view>
    </ng-template>
  `,
})
export class WebAttorneyTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  attorneyType: AttorneyType

  constructor(private store: WebAttorneyTypeFeatureStore) {
    super()
    this.store.loadAttorneyTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.attorneyTypes$.pipe(
      switchMap((attorneyTypes) => {
        return of(attorneyTypes)
      }),
    )
  }
}

