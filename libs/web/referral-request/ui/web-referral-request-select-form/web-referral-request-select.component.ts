

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebReferralRequestFeatureStore } from '@case-clinical/web/referral-request/shared'
import {ReferralRequest} from '@case-clinical/web/core/data-access'


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
      <ui-referral-request-form
        class="flex-grow flex flex-col"
        [formName]="'referralRequest_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [referralRequest]="referralRequest"
      >
      >
      </ui-referral-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-referral-request-form
        class="flex-grow flex flex-col"
        [formName]="'referralRequest_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [referralRequest]="{}"
      >
      </ui-referral-request-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-referral-request-select-table-view
        class="w-full h-full bg-white"
        [referralRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-referral-request-select-table-view>
    </ng-template>
  `,
    providers: [WebReferralRequestFeatureStore]
})
export class WebReferralRequestSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  referralRequest: ReferralRequest

  constructor(private store: WebReferralRequestFeatureStore) {
    super()
    this.store.loadReferralRequestsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.referralRequests$.pipe(
      switchMap((referralRequests) => {
        return of(referralRequests)
      }),
    )
  }
}

