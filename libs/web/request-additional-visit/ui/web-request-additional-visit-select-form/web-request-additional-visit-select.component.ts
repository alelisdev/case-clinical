

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebRequestAdditionalVisitFeatureStore } from '@case-clinical/web/request-additional-visit/shared'
import {RequestAdditionalVisit} from '@case-clinical/web/core/data-access'


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
      <ui-request-additional-visit-form
        class="flex-grow flex flex-col"
        [formName]="'requestAdditionalVisit_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [requestAdditionalVisit]="requestAdditionalVisit"
      >
      >
      </ui-request-additional-visit-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-request-additional-visit-form
        class="flex-grow flex flex-col"
        [formName]="'requestAdditionalVisit_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [requestAdditionalVisit]="{}"
      >
      </ui-request-additional-visit-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-request-additional-visit-select-table-view
        class="w-full h-full bg-white"
        [requestAdditionalVisits]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-request-additional-visit-select-table-view>
    </ng-template>
  `,
    providers: [WebRequestAdditionalVisitFeatureStore]
})
export class WebRequestAdditionalVisitSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  requestAdditionalVisit: RequestAdditionalVisit

  constructor(private store: WebRequestAdditionalVisitFeatureStore) {
    super()
    this.store.loadRequestAdditionalVisitsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.requestAdditionalVisits$.pipe(
      switchMap((requestAdditionalVisits) => {
        return of(requestAdditionalVisits)
      }),
    )
  }
}

