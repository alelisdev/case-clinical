

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRecommendedOrderAuthorizationFeatureStore } from '@case-clinical/web/recommended-order-authorization/shared'
import {RecommendedOrderAuthorization} from '@case-clinical/web/core/data-access'


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
      <ui-recommended-order-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderAuthorization_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderAuthorization]="recommendedOrderAuthorization"
      >
      >
      </ui-recommended-order-authorization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-recommended-order-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderAuthorization_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderAuthorization]="{}"
      >
      </ui-recommended-order-authorization-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-recommended-order-authorization-select-table-view
        class="w-full h-full bg-white"
        [recommendedOrderAuthorizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-recommended-order-authorization-select-table-view>
    </ng-template>
  `,
    providers: [WebRecommendedOrderAuthorizationFeatureStore]
})
export class WebRecommendedOrderAuthorizationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  recommendedOrderAuthorization: RecommendedOrderAuthorization

  constructor(private store: WebRecommendedOrderAuthorizationFeatureStore) {
    super()
    this.store.loadRecommendedOrderAuthorizationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.recommendedOrderAuthorizations$.pipe(
      switchMap((recommendedOrderAuthorizations) => {
        return of(recommendedOrderAuthorizations)
      }),
    )
  }
}

