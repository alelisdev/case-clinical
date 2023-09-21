

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRecommendedOrderAuthorizationFeatureStore } from '@case-clinical/web/recommended-order-authorization/shared'
import { UiFormGridBaseFieldType } from '@case-clinical/web/ui/grid'

@Component({
  template: `
    <web-ui-grid
      [data]="data"
      [title]="to.title"
      [onSave]="onSave"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="createTemplate"
    ></web-ui-grid>

    <ng-template #editTemplate let-context="data">
      <ui-recommended-order-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderAuthorization_edit'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderAuthorization]="context.value"
      >
      </ui-recommended-order-authorization-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-recommended-order-authorization-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderAuthorization_create'"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderAuthorization]="{}"
      >
      </ui-recommended-order-authorization-form>
    </ng-template>


    <ng-template #listTemplate let-context="data">
      <ui-recommended-order-authorization-select-table-view
        [autoHeight]="true"
        class="w-full h-full bg-white"
        [recommendedOrderAuthorizations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref?.close()"
      >
      </ui-recommended-order-authorization-select-table-view>
    </ng-template>
  `,
})
export class WebRecommendedOrderAuthorizationGridComponent extends UiFormGridBaseFieldType {
  formControl!: FormControl

  constructor() {
    super()
  }
}
