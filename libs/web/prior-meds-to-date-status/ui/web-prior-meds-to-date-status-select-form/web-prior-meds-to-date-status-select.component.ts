

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorMedsToDateStatusFeatureStore } from '@case-clinical/web/prior-meds-to-date-status/shared'
import {PriorMedsToDateStatus} from '@case-clinical/web/core/data-access'


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
      <ui-prior-meds-to-date-status-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDateStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDateStatus]="priorMedsToDateStatus"
      >
      >
      </ui-prior-meds-to-date-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-meds-to-date-status-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDateStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDateStatus]="{}"
      >
      </ui-prior-meds-to-date-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-meds-to-date-status-select-table-view
        class="w-full h-full bg-white"
        [priorMedsToDateStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-meds-to-date-status-select-table-view>
    </ng-template>
  `,
})
export class WebPriorMedsToDateStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorMedsToDateStatus: PriorMedsToDateStatus

  constructor(private store: WebPriorMedsToDateStatusFeatureStore) {
    super()
    this.store.loadPriorMedsToDateStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorMedsToDateStatuses$.pipe(
      switchMap((priorMedsToDateStatuses) => {
        return of(priorMedsToDateStatuses)
      }),
    )
  }
}

