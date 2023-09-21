

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebCaseProgressStatusFeatureStore } from '@case-clinical/web/case-progress-status/shared'
import {CaseProgressStatus} from '@case-clinical/web/core/data-access'


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
      <ui-case-progress-status-form
        class="flex-grow flex flex-col"
        [formName]="'caseProgressStatus_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProgressStatus]="caseProgressStatus"
      >
      >
      </ui-case-progress-status-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-case-progress-status-form
        class="flex-grow flex flex-col"
        [formName]="'caseProgressStatus_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [caseProgressStatus]="{}"
      >
      </ui-case-progress-status-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-case-progress-status-select-table-view
        class="w-full h-full bg-white"
        [caseProgressStatuses]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-case-progress-status-select-table-view>
    </ng-template>
  `,
})
export class WebCaseProgressStatusSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  caseProgressStatus: CaseProgressStatus

  constructor(private store: WebCaseProgressStatusFeatureStore) {
    super()
    this.store.loadCaseProgressStatusesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.caseProgressStatuses$.pipe(
      switchMap((caseProgressStatuses) => {
        return of(caseProgressStatuses)
      }),
    )
  }
}

