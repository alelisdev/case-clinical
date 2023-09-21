

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebBodyPartLeadFeatureStore } from '@case-clinical/web/body-part-lead/shared'
import {BodyPartLead} from '@case-clinical/web/core/data-access'


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
      <ui-body-part-lead-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPartLead_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPartLead]="bodyPartLead"
      >
      >
      </ui-body-part-lead-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-body-part-lead-form
        class="flex-grow flex flex-col"
        [formName]="'bodyPartLead_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [bodyPartLead]="{}"
      >
      </ui-body-part-lead-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-body-part-lead-select-table-view
        class="w-full h-full bg-white"
        [bodyPartLeads]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-body-part-lead-select-table-view>
    </ng-template>
  `,
})
export class WebBodyPartLeadSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  bodyPartLead: BodyPartLead

  constructor(private store: WebBodyPartLeadFeatureStore) {
    super()
    this.store.loadBodyPartLeadsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.bodyPartLeads$.pipe(
      switchMap((bodyPartLeads) => {
        return of(bodyPartLeads)
      }),
    )
  }
}

