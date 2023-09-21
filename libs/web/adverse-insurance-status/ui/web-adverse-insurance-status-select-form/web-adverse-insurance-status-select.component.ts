

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAdverseInsuranceStatusFeatureStore } from '@case-clinical/web/adverse-insurance-status/shared'
import {AdverseInsuranceStatus} from '@case-clinical/web/core/data-access'


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
      <ui-adverse-insurance-status-form
        class="flex-grow flex flex-col"
        [formName]="'adverseInsuranceStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [adverseInsuranceStatus]="adverseInsuranceStatus"
      >
      >
      </ui-adverse-insurance-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-adverse-insurance-status-form
        class="flex-grow flex flex-col"
        [formName]="'adverseInsuranceStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [adverseInsuranceStatus]="{}"
      >
      </ui-adverse-insurance-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-adverse-insurance-status-select-table-view
        class="w-full h-full bg-white"
        [adverseInsuranceStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-adverse-insurance-status-select-table-view>
    </ng-template>
  `,
})
export class WebAdverseInsuranceStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  adverseInsuranceStatus: AdverseInsuranceStatus

  constructor(private store: WebAdverseInsuranceStatusFeatureStore) {
    super()
    this.store.loadAdverseInsuranceStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.adverseInsuranceStatuses$.pipe(
      switchMap((adverseInsuranceStatuses) => {
        return of(adverseInsuranceStatuses)
      }),
    )
  }
}

