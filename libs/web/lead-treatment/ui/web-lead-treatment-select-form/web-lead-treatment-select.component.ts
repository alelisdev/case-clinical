

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadTreatmentFeatureStore } from '@case-clinical/web/lead-treatment/shared'
import {LeadTreatment} from '@case-clinical/web/core/data-access'


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
      <ui-lead-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'leadTreatment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadTreatment]="leadTreatment"
      >
      >
      </ui-lead-treatment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'leadTreatment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadTreatment]="{}"
      >
      </ui-lead-treatment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-lead-treatment-select-table-view
        class="w-full h-full bg-white"
        [leadTreatments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-lead-treatment-select-table-view>
    </ng-template>
  `,
})
export class WebLeadTreatmentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  leadTreatment: LeadTreatment

  constructor(private store: WebLeadTreatmentFeatureStore) {
    super()
    this.store.loadLeadTreatmentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.leadTreatments$.pipe(
      switchMap((leadTreatments) => {
        return of(leadTreatments)
      }),
    )
  }
}

