

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRecommendedOrderFeatureStore } from '@case-clinical/web/recommended-order/shared'
import {RecommendedOrder} from '@case-clinical/web/core/data-access'


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
      <ui-recommended-order-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrder_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrder]="recommendedOrder"
      >
      >
      </ui-recommended-order-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-recommended-order-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrder_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrder]="{}"
      >
      </ui-recommended-order-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-recommended-order-select-table-view
        class="w-full h-full bg-white"
        [recommendedOrders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-recommended-order-select-table-view>
    </ng-template>
  `,
    providers: [WebRecommendedOrderFeatureStore]
})
export class WebRecommendedOrderSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  recommendedOrder: RecommendedOrder

  constructor(private store: WebRecommendedOrderFeatureStore) {
    super()
    this.store.loadRecommendedOrdersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.recommendedOrders$.pipe(
      switchMap((recommendedOrders) => {
        return of(recommendedOrders)
      }),
    )
  }
}

