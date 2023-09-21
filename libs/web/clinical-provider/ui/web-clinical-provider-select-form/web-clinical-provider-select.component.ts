

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderFeatureStore } from '@case-clinical/web/clinical-provider/shared'
import {ClinicalProvider} from '@case-clinical/web/core/data-access'


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
      <ui-clinical-provider-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProvider_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProvider]="clinicalProvider"
      >
      >
      </ui-clinical-provider-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProvider_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProvider]="{}"
      >
      </ui-clinical-provider-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-select-table-view
        class="w-full h-full bg-white"
        [clinicalProviders]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-clinical-provider-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  clinicalProvider: ClinicalProvider

  constructor(private store: WebClinicalProviderFeatureStore) {
    super()
    this.store.loadClinicalProvidersEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.clinicalProviders$.pipe(
      switchMap((clinicalProviders) => {
        return of(clinicalProviders)
      }),
    )
  }
}

