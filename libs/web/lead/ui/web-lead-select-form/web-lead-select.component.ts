

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadFeatureStore } from '@case-clinical/web/lead/shared'
import {Lead} from '@case-clinical/web/core/data-access'


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
      <ui-lead-form
        class="flex-grow flex flex-col"
        [formName]="'lead_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [lead]="lead"
      >
      >
      </ui-lead-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-form
        class="flex-grow flex flex-col"
        [formName]="'lead_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [lead]="{}"
      >
      </ui-lead-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-lead-select-table-view
        class="w-full h-full bg-white"
        [leads]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-lead-select-table-view>
    </ng-template>
  `,
    providers: [WebLeadFeatureStore]
})
export class WebLeadSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  lead: Lead

  constructor(private store: WebLeadFeatureStore) {
    super()
    this.store.loadLeadsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.leads$.pipe(
      switchMap((leads) => {
        return of(leads)
      }),
    )
  }
}

