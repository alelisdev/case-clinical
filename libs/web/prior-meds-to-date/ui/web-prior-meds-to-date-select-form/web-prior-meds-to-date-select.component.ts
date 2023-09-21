

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorMedsToDateFeatureStore } from '@case-clinical/web/prior-meds-to-date/shared'
import {PriorMedsToDate} from '@case-clinical/web/core/data-access'


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
      <ui-prior-meds-to-date-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDate_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDate]="priorMedsToDate"
      >
      >
      </ui-prior-meds-to-date-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-meds-to-date-form
        class="flex-grow flex flex-col"
        [formName]="'priorMedsToDate_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorMedsToDate]="{}"
      >
      </ui-prior-meds-to-date-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-meds-to-date-select-table-view
        class="w-full h-full bg-white"
        [priorMedsToDates]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-meds-to-date-select-table-view>
    </ng-template>
  `,
})
export class WebPriorMedsToDateSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorMedsToDate: PriorMedsToDate

  constructor(private store: WebPriorMedsToDateFeatureStore) {
    super()
    this.store.loadPriorMedsToDatesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorMedsToDates$.pipe(
      switchMap((priorMedsToDates) => {
        return of(priorMedsToDates)
      }),
    )
  }
}

