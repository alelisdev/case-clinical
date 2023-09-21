

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEligibilityStatusFeatureStore } from '@case-clinical/web/eligibility-status/shared'
import {EligibilityStatus} from '@case-clinical/web/core/data-access'


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
      <ui-eligibility-status-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityStatus]="eligibilityStatus"
      >
      >
      </ui-eligibility-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-eligibility-status-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityStatus]="{}"
      >
      </ui-eligibility-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-eligibility-status-select-table-view
        class="w-full h-full bg-white"
        [eligibilityStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-eligibility-status-select-table-view>
    </ng-template>
  `,
    providers: [WebEligibilityStatusFeatureStore]
})
export class WebEligibilityStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  eligibilityStatus: EligibilityStatus

  constructor(private store: WebEligibilityStatusFeatureStore) {
    super()
    this.store.loadEligibilityStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.eligibilityStatuses$.pipe(
      switchMap((eligibilityStatuses) => {
        return of(eligibilityStatuses)
      }),
    )
  }
}

