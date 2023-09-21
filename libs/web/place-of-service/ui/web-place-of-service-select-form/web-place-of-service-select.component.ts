

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPlaceOfServiceFeatureStore } from '@case-clinical/web/place-of-service/shared'
import {PlaceOfService} from '@case-clinical/web/core/data-access'


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
      <ui-place-of-service-form
        class="flex-grow flex flex-col"
        [formName]="'placeOfService_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [placeOfService]="placeOfService"
      >
      >
      </ui-place-of-service-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-place-of-service-form
        class="flex-grow flex flex-col"
        [formName]="'placeOfService_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [placeOfService]="{}"
      >
      </ui-place-of-service-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-place-of-service-select-table-view
        class="w-full h-full bg-white"
        [placeOfServices]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-place-of-service-select-table-view>
    </ng-template>
  `,
})
export class WebPlaceOfServiceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  placeOfService: PlaceOfService

  constructor(private store: WebPlaceOfServiceFeatureStore) {
    super()
    this.store.loadPlaceOfServicesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.placeOfServices$.pipe(
      switchMap((placeOfServices) => {
        return of(placeOfServices)
      }),
    )
  }
}

