

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPchProviderFeatureStore } from '@case-clinical/web/pch-provider/shared'
import {PchProvider} from '@case-clinical/web/core/data-access'


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
      <ui-pch-provider-form
        class="flex-grow flex flex-col"
        [formName]="'pchProvider_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [pchProvider]="pchProvider"
      >
      >
      </ui-pch-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-pch-provider-form
        class="flex-grow flex flex-col"
        [formName]="'pchProvider_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [pchProvider]="{}"
      >
      </ui-pch-provider-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-pch-provider-select-table-view
        class="w-full h-full bg-white"
        [pchProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-pch-provider-select-table-view>
    </ng-template>
  `,
})
export class WebPchProviderSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  pchProvider: PchProvider

  constructor(private store: WebPchProviderFeatureStore) {
    super()
    this.store.loadPchProvidersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.pchProviders$.pipe(
      switchMap((pchProviders) => {
        return of(pchProviders)
      }),
    )
  }
}

