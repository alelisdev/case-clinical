

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthorizationRequestFeatureStore } from '@case-clinical/web/prior-authorization-request/shared'
import {PriorAuthorizationRequest} from '@case-clinical/web/core/data-access'


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
      <ui-prior-authorization-request-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationRequest_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationRequest]="priorAuthorizationRequest"
      >
      >
      </ui-prior-authorization-request-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-authorization-request-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthorizationRequest_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthorizationRequest]="{}"
      >
      </ui-prior-authorization-request-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-authorization-request-select-table-view
        class="w-full h-full bg-white"
        [priorAuthorizationRequests]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-authorization-request-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthorizationRequestSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorAuthorizationRequest: PriorAuthorizationRequest

  constructor(private store: WebPriorAuthorizationRequestFeatureStore) {
    super()
    this.store.loadPriorAuthorizationRequestsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorAuthorizationRequests$.pipe(
      switchMap((priorAuthorizationRequests) => {
        return of(priorAuthorizationRequests)
      }),
    )
  }
}

