

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebTreatmentFeatureStore } from '@case-clinical/web/treatment/shared'
import {Treatment} from '@case-clinical/web/core/data-access'


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
      <ui-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'treatment_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [treatment]="treatment"
      >
      >
      </ui-treatment-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-treatment-form
        class="flex-grow flex flex-col"
        [formName]="'treatment_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [treatment]="{}"
      >
      </ui-treatment-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-treatment-select-table-view
        class="w-full h-full bg-white"
        [treatments]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-treatment-select-table-view>
    </ng-template>
  `,
})
export class WebTreatmentSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  treatment: Treatment

  constructor(private store: WebTreatmentFeatureStore) {
    super()
    this.store.loadTreatmentsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.treatments$.pipe(
      switchMap((treatments) => {
        return of(treatments)
      }),
    )
  }
}

