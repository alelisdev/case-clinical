

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCategoryFeatureStore } from '@case-clinical/web/category/shared'
import {Category} from '@case-clinical/web/core/data-access'


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
      <ui-category-form
        class="flex-grow flex flex-col"
        [formName]="'category_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [category]="category"
      >
      >
      </ui-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-category-form
        class="flex-grow flex flex-col"
        [formName]="'category_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [category]="{}"
      >
      </ui-category-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-category-select-table-view
        class="w-full h-full bg-white"
        [categories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-category-select-table-view>
    </ng-template>
  `,
})
export class WebCategorySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  category: Category

  constructor(private store: WebCategoryFeatureStore) {
    super()
    this.store.loadCategoriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.categories$.pipe(
      switchMap((categories) => {
        return of(categories)
      }),
    )
  }
}

