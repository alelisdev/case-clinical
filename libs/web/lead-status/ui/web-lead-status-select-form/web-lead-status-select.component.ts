

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadStatusFeatureStore } from '@case-clinical/web/lead-status/shared'
import {LeadStatus} from '@case-clinical/web/core/data-access'


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
      <ui-lead-status-form
        class="flex-grow flex flex-col"
        [formName]="'leadStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadStatus]="leadStatus"
      >
      >
      </ui-lead-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-status-form
        class="flex-grow flex flex-col"
        [formName]="'leadStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadStatus]="{}"
      >
      </ui-lead-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-lead-status-select-table-view
        class="w-full h-full bg-white"
        [leadStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-lead-status-select-table-view>
    </ng-template>
  `,
})
export class WebLeadStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  leadStatus: LeadStatus

  constructor(private store: WebLeadStatusFeatureStore) {
    super()
    this.store.loadLeadStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.leadStatuses$.pipe(
      switchMap((leadStatuses) => {
        return of(leadStatuses)
      }),
    )
  }
}

