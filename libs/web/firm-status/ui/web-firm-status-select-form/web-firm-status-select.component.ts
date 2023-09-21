

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebFirmStatusFeatureStore } from '@case-clinical/web/firm-status/shared'
import {FirmStatus} from '@case-clinical/web/core/data-access'


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
      <ui-firm-status-form
        class="flex-grow flex flex-col"
        [formName]="'firmStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [firmStatus]="firmStatus"
      >
      >
      </ui-firm-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-firm-status-form
        class="flex-grow flex flex-col"
        [formName]="'firmStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [firmStatus]="{}"
      >
      </ui-firm-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-firm-status-select-table-view
        class="w-full h-full bg-white"
        [firmStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-firm-status-select-table-view>
    </ng-template>
  `,
})
export class WebFirmStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  firmStatus: FirmStatus

  constructor(private store: WebFirmStatusFeatureStore) {
    super()
    this.store.loadFirmStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.firmStatuses$.pipe(
      switchMap((firmStatuses) => {
        return of(firmStatuses)
      }),
    )
  }
}

