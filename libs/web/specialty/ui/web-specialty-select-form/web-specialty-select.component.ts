

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebSpecialtyFeatureStore } from '@case-clinical/web/specialty/shared'
import {Specialty} from '@case-clinical/web/core/data-access'


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
      <ui-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'specialty_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [specialty]="specialty"
      >
      >
      </ui-specialty-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-specialty-form
        class="flex-grow flex flex-col"
        [formName]="'specialty_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [specialty]="{}"
      >
      </ui-specialty-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-specialty-select-table-view
        class="w-full h-full bg-white"
        [specialties]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-specialty-select-table-view>
    </ng-template>
  `,
})
export class WebSpecialtySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  specialty: Specialty

  constructor(private store: WebSpecialtyFeatureStore) {
    super()
    this.store.loadSpecialtiesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.specialties$.pipe(
      switchMap((specialties) => {
        return of(specialties)
      }),
    )
  }
}

