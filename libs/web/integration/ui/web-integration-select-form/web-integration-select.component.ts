

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebIntegrationFeatureStore } from '@case-clinical/web/integration/shared'
import {Integration} from '@case-clinical/web/core/data-access'


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
      <ui-integration-form
        class="flex-grow flex flex-col"
        [formName]="'integration_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [integration]="integration"
      >
      >
      </ui-integration-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-integration-form
        class="flex-grow flex flex-col"
        [formName]="'integration_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [integration]="{}"
      >
      </ui-integration-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-integration-select-table-view
        class="w-full h-full bg-white"
        [integrations]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-integration-select-table-view>
    </ng-template>
  `,
})
export class WebIntegrationSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  integration: Integration

  constructor(private store: WebIntegrationFeatureStore) {
    super()
    this.store.loadIntegrationsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.integrations$.pipe(
      switchMap((integrations) => {
        return of(integrations)
      }),
    )
  }
}

