

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEthnicityFeatureStore } from '@case-clinical/web/ethnicity/shared'
import {Ethnicity} from '@case-clinical/web/core/data-access'


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
      <ui-ethnicity-form
        class="flex-grow flex flex-col"
        [formName]="'ethnicity_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [ethnicity]="ethnicity"
      >
      >
      </ui-ethnicity-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-ethnicity-form
        class="flex-grow flex flex-col"
        [formName]="'ethnicity_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [ethnicity]="{}"
      >
      </ui-ethnicity-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-ethnicity-select-table-view
        class="w-full h-full bg-white"
        [ethnicities]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-ethnicity-select-table-view>
    </ng-template>
  `,
})
export class WebEthnicitySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  ethnicity: Ethnicity

  constructor(private store: WebEthnicityFeatureStore) {
    super()
    this.store.loadEthnicitiesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.ethnicities$.pipe(
      switchMap((ethnicities) => {
        return of(ethnicities)
      }),
    )
  }
}

