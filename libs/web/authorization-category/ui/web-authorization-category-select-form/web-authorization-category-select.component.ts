

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAuthorizationCategoryFeatureStore } from '@case-clinical/web/authorization-category/shared'
import {AuthorizationCategory} from '@case-clinical/web/core/data-access'


@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <ui-authorization-category-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationCategory_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationCategory]="authorizationCategory"
      >
      >
      </ui-authorization-category-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-authorization-category-form
        class="flex-grow flex flex-col"
        [formName]="'authorizationCategory_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [authorizationCategory]="{}"
      >
      </ui-authorization-category-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-authorization-category-select-table-view
        class="w-full h-full bg-white"
        [authorizationCategories]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-authorization-category-select-table-view>
    </ng-template>
  `,
    providers: [WebAuthorizationCategoryFeatureStore]
})
export class WebAuthorizationCategorySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  authorizationCategory: AuthorizationCategory

  constructor(private store: WebAuthorizationCategoryFeatureStore) {
    super()
    this.store.loadAuthorizationCategoriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.authorizationCategories$.pipe(
      switchMap((authorizationCategories) => {
        return of(authorizationCategories)
      }),
    )
  }
}

