

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAttorneyStatusFeatureStore } from '@case-clinical/web/attorney-status/shared'
import {AttorneyStatus} from '@case-clinical/web/core/data-access'


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
      <ui-attorney-status-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyStatus]="attorneyStatus"
      >
      >
      </ui-attorney-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-attorney-status-form
        class="flex-grow flex flex-col"
        [formName]="'attorneyStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [attorneyStatus]="{}"
      >
      </ui-attorney-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-attorney-status-select-table-view
        class="w-full h-full bg-white"
        [attorneyStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-attorney-status-select-table-view>
    </ng-template>
  `,
})
export class WebAttorneyStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  attorneyStatus: AttorneyStatus

  constructor(private store: WebAttorneyStatusFeatureStore) {
    super()
    this.store.loadAttorneyStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.attorneyStatuses$.pipe(
      switchMap((attorneyStatuses) => {
        return of(attorneyStatuses)
      }),
    )
  }
}

