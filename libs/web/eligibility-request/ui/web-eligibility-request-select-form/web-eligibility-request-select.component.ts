

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebEligibilityRequestFeatureStore } from '@case-clinical/web/eligibility-request/shared'
import {EligibilityRequest} from '@case-clinical/web/core/data-access'


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
      <ui-eligibility-request-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityRequest_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityRequest]="eligibilityRequest"
      >
      >
      </ui-eligibility-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-eligibility-request-form
        class="flex-grow flex flex-col"
        [formName]="'eligibilityRequest_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [eligibilityRequest]="{}"
      >
      </ui-eligibility-request-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-eligibility-request-select-table-view
        class="w-full h-full bg-white"
        [eligibilityRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-eligibility-request-select-table-view>
    </ng-template>
  `,
    providers: [WebEligibilityRequestFeatureStore]
})
export class WebEligibilityRequestSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  eligibilityRequest: EligibilityRequest

  constructor(private store: WebEligibilityRequestFeatureStore) {
    super()
    this.store.loadEligibilityRequestsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.eligibilityRequests$.pipe(
      switchMap((eligibilityRequests) => {
        return of(eligibilityRequests)
      }),
    )
  }
}

