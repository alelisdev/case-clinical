

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebImplantFeatureStore } from '@case-clinical/web/implant/shared'
import {Implant} from '@case-clinical/web/core/data-access'


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
      <ui-implant-form
        class="flex-grow flex flex-col"
        [formName]="'implant_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implant]="implant"
      >
      >
      </ui-implant-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-implant-form
        class="flex-grow flex flex-col"
        [formName]="'implant_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [implant]="{}"
      >
      </ui-implant-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-implant-select-table-view
        class="w-full h-full bg-white"
        [implants]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-implant-select-table-view>
    </ng-template>
  `,
})
export class WebImplantSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  implant: Implant

  constructor(private store: WebImplantFeatureStore) {
    super()
    this.store.loadImplantsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.implants$.pipe(
      switchMap((implants) => {
        return of(implants)
      }),
    )
  }
}

