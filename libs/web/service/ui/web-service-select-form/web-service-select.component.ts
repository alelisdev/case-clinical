

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebServiceFeatureStore } from '@case-clinical/web/service/shared'
import {Service} from '@case-clinical/web/core/data-access'


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
      <ui-service-form
        class="flex-grow flex flex-col"
        [formName]="'service_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [service]="service"
      >
      >
      </ui-service-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-service-form
        class="flex-grow flex flex-col"
        [formName]="'service_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [service]="{}"
      >
      </ui-service-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-service-select-table-view
        class="w-full h-full bg-white"
        [services]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-service-select-table-view>
    </ng-template>
  `,
})
export class WebServiceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  service: Service

  constructor(private store: WebServiceFeatureStore) {
    super()
    this.store.loadServicesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.services$.pipe(
      switchMap((services) => {
        return of(services)
      }),
    )
  }
}

