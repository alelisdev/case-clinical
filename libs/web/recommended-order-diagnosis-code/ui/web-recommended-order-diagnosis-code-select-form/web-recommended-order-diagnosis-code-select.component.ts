

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRecommendedOrderDiagnosisCodeFeatureStore } from '@case-clinical/web/recommended-order-diagnosis-code/shared'
import {RecommendedOrderDiagnosisCode} from '@case-clinical/web/core/data-access'


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
      <ui-recommended-order-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderDiagnosisCode_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderDiagnosisCode]="recommendedOrderDiagnosisCode"
      >
      >
      </ui-recommended-order-diagnosis-code-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-recommended-order-diagnosis-code-form
        class="flex-grow flex flex-col"
        [formName]="'recommendedOrderDiagnosisCode_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [recommendedOrderDiagnosisCode]="{}"
      >
      </ui-recommended-order-diagnosis-code-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-recommended-order-diagnosis-code-select-table-view
        class="w-full h-full bg-white"
        [recommendedOrderDiagnosisCodes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-recommended-order-diagnosis-code-select-table-view>
    </ng-template>
  `,
    providers: [WebRecommendedOrderDiagnosisCodeFeatureStore]
})
export class WebRecommendedOrderDiagnosisCodeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  recommendedOrderDiagnosisCode: RecommendedOrderDiagnosisCode

  constructor(private store: WebRecommendedOrderDiagnosisCodeFeatureStore) {
    super()
    this.store.loadRecommendedOrderDiagnosisCodesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.recommendedOrderDiagnosisCodes$.pipe(
      switchMap((recommendedOrderDiagnosisCodes) => {
        return of(recommendedOrderDiagnosisCodes)
      }),
    )
  }
}

