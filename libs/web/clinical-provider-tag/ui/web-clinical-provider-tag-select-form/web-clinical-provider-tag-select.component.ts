

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebClinicalProviderTagFeatureStore } from '@case-clinical/web/clinical-provider-tag/shared'
import {ClinicalProviderTag} from '@case-clinical/web/core/data-access'


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
      <ui-clinical-provider-tag-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderTag_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderTag]="clinicalProviderTag"
      >
      >
      </ui-clinical-provider-tag-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-clinical-provider-tag-form
        class="flex-grow flex flex-col"
        [formName]="'clinicalProviderTag_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [clinicalProviderTag]="{}"
      >
      </ui-clinical-provider-tag-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-clinical-provider-tag-select-table-view
        class="w-full h-full bg-white"
        [clinicalProviderTags]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-clinical-provider-tag-select-table-view>
    </ng-template>
  `,
})
export class WebClinicalProviderTagSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  clinicalProviderTag: ClinicalProviderTag

  constructor(private store: WebClinicalProviderTagFeatureStore) {
    super()
    this.store.loadClinicalProviderTagsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.clinicalProviderTags$.pipe(
      switchMap((clinicalProviderTags) => {
        return of(clinicalProviderTags)
      }),
    )
  }
}

