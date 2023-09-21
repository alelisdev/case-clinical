

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCostCategoryFeatureStore } from '@case-clinical/web/cost-category/shared'
import {CostCategory} from '@case-clinical/web/core/data-access'


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
      <ui-cost-category-form
        class="flex-grow flex flex-col"
        [formName]="'costCategory_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [costCategory]="costCategory"
      >
      >
      </ui-cost-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-cost-category-form
        class="flex-grow flex flex-col"
        [formName]="'costCategory_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [costCategory]="{}"
      >
      </ui-cost-category-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-cost-category-select-table-view
        class="w-full h-full bg-white"
        [costCategories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-cost-category-select-table-view>
    </ng-template>
  `,
})
export class WebCostCategorySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  costCategory: CostCategory

  constructor(private store: WebCostCategoryFeatureStore) {
    super()
    this.store.loadCostCategoriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.costCategories$.pipe(
      switchMap((costCategories) => {
        return of(costCategories)
      }),
    )
  }
}

