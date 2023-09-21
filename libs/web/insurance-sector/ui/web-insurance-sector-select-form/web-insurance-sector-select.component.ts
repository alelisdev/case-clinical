

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInsuranceSectorFeatureStore } from '@case-clinical/web/insurance-sector/shared'
import {InsuranceSector} from '@case-clinical/web/core/data-access'


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
      <ui-insurance-sector-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceSector_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceSector]="insuranceSector"
      >
      >
      </ui-insurance-sector-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-insurance-sector-form
        class="flex-grow flex flex-col"
        [formName]="'insuranceSector_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [insuranceSector]="{}"
      >
      </ui-insurance-sector-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-insurance-sector-select-table-view
        class="w-full h-full bg-white"
        [insuranceSectors]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-insurance-sector-select-table-view>
    </ng-template>
  `,
})
export class WebInsuranceSectorSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  insuranceSector: InsuranceSector

  constructor(private store: WebInsuranceSectorFeatureStore) {
    super()
    this.store.loadInsuranceSectorsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.insuranceSectors$.pipe(
      switchMap((insuranceSectors) => {
        return of(insuranceSectors)
      }),
    )
  }
}

