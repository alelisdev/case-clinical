

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebLeadInjuryFeatureStore } from '@case-clinical/web/lead-injury/shared'
import {LeadInjury} from '@case-clinical/web/core/data-access'


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
      <ui-lead-injury-form
        class="flex-grow flex flex-col"
        [formName]="'leadInjury_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadInjury]="leadInjury"
      >
      >
      </ui-lead-injury-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-lead-injury-form
        class="flex-grow flex flex-col"
        [formName]="'leadInjury_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [leadInjury]="{}"
      >
      </ui-lead-injury-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-lead-injury-select-table-view
        class="w-full h-full bg-white"
        [leadInjuries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-lead-injury-select-table-view>
    </ng-template>
  `,
})
export class WebLeadInjurySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  leadInjury: LeadInjury

  constructor(private store: WebLeadInjuryFeatureStore) {
    super()
    this.store.loadLeadInjuriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.leadInjuries$.pipe(
      switchMap((leadInjuries) => {
        return of(leadInjuries)
      }),
    )
  }
}

