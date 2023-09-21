

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCalculationBasisTypeFeatureStore } from '@case-clinical/web/calculation-basis-type/shared'
import {CalculationBasisType} from '@case-clinical/web/core/data-access'


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
      <ui-calculation-basis-type-form
        class="flex-grow flex flex-col"
        [formName]="'calculationBasisType_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [calculationBasisType]="calculationBasisType"
      >
      >
      </ui-calculation-basis-type-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-calculation-basis-type-form
        class="flex-grow flex flex-col"
        [formName]="'calculationBasisType_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [calculationBasisType]="{}"
      >
      </ui-calculation-basis-type-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-calculation-basis-type-select-table-view
        class="w-full h-full bg-white"
        [calculationBasisTypes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-calculation-basis-type-select-table-view>
    </ng-template>
  `,
})
export class WebCalculationBasisTypeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  calculationBasisType: CalculationBasisType

  constructor(private store: WebCalculationBasisTypeFeatureStore) {
    super()
    this.store.loadCalculationBasisTypesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.calculationBasisTypes$.pipe(
      switchMap((calculationBasisTypes) => {
        return of(calculationBasisTypes)
      }),
    )
  }
}

