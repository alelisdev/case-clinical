

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadActionFeatureStore } from '@case-clinical/web/lead-action/shared'
import {LeadAction} from '@case-clinical/web/core/data-access'


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
      <ui-lead-action-form
        class="flex-grow flex flex-col"
        [formName]="'leadAction_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadAction]="leadAction"
      >
      >
      </ui-lead-action-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-action-form
        class="flex-grow flex flex-col"
        [formName]="'leadAction_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadAction]="{}"
      >
      </ui-lead-action-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-lead-action-select-table-view
        class="w-full h-full bg-white"
        [leadActions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-lead-action-select-table-view>
    </ng-template>
  `,
})
export class WebLeadActionSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  leadAction: LeadAction

  constructor(private store: WebLeadActionFeatureStore) {
    super()
    this.store.loadLeadActionsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.leadActions$.pipe(
      switchMap((leadActions) => {
        return of(leadActions)
      }),
    )
  }
}

