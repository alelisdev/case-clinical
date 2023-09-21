

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadSourceFeatureStore } from '@case-clinical/web/lead-source/shared'
import {LeadSource} from '@case-clinical/web/core/data-access'


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
      <ui-lead-source-form
        class="flex-grow flex flex-col"
        [formName]="'leadSource_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadSource]="leadSource"
      >
      >
      </ui-lead-source-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-source-form
        class="flex-grow flex flex-col"
        [formName]="'leadSource_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadSource]="{}"
      >
      </ui-lead-source-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-lead-source-select-table-view
        class="w-full h-full bg-white"
        [leadSources]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-lead-source-select-table-view>
    </ng-template>
  `,
})
export class WebLeadSourceSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  leadSource: LeadSource

  constructor(private store: WebLeadSourceFeatureStore) {
    super()
    this.store.loadLeadSourcesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.leadSources$.pipe(
      switchMap((leadSources) => {
        return of(leadSources)
      }),
    )
  }
}

