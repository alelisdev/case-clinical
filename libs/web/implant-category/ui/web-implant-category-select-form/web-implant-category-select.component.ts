

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebImplantCategoryFeatureStore } from '@case-clinical/web/implant-category/shared'
import {ImplantCategory} from '@case-clinical/web/core/data-access'


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
      <ui-implant-category-form
        class="flex-grow flex flex-col"
        [formName]="'implantCategory_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implantCategory]="implantCategory"
      >
      >
      </ui-implant-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-implant-category-form
        class="flex-grow flex flex-col"
        [formName]="'implantCategory_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implantCategory]="{}"
      >
      </ui-implant-category-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-implant-category-select-table-view
        class="w-full h-full bg-white"
        [implantCategories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-implant-category-select-table-view>
    </ng-template>
  `,
})
export class WebImplantCategorySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  implantCategory: ImplantCategory

  constructor(private store: WebImplantCategoryFeatureStore) {
    super()
    this.store.loadImplantCategoriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.implantCategories$.pipe(
      switchMap((implantCategories) => {
        return of(implantCategories)
      }),
    )
  }
}

