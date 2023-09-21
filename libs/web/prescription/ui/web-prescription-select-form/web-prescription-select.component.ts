

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPrescriptionFeatureStore } from '@case-clinical/web/prescription/shared'
import {Prescription} from '@case-clinical/web/core/data-access'


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
      <ui-prescription-form
        class="flex-grow flex flex-col"
        [formName]="'prescription_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [prescription]="prescription"
      >
      >
      </ui-prescription-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prescription-form
        class="flex-grow flex flex-col"
        [formName]="'prescription_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [prescription]="{}"
      >
      </ui-prescription-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prescription-select-table-view
        class="w-full h-full bg-white"
        [prescriptions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prescription-select-table-view>
    </ng-template>
  `,
})
export class WebPrescriptionSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  prescription: Prescription

  constructor(private store: WebPrescriptionFeatureStore) {
    super()
    this.store.loadPrescriptionsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.prescriptions$.pipe(
      switchMap((prescriptions) => {
        return of(prescriptions)
      }),
    )
  }
}

