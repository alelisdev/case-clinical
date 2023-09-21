

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebPriorAuthDmeFeatureStore } from '@case-clinical/web/prior-auth-dme/shared'
import {PriorAuthDme} from '@case-clinical/web/core/data-access'


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
      <ui-prior-auth-dme-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthDme_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthDme]="priorAuthDme"
      >
      >
      </ui-prior-auth-dme-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-prior-auth-dme-form
        class="flex-grow flex flex-col"
        [formName]="'priorAuthDme_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [priorAuthDme]="{}"
      >
      </ui-prior-auth-dme-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-prior-auth-dme-select-table-view
        class="w-full h-full bg-white"
        [priorAuthDmes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-prior-auth-dme-select-table-view>
    </ng-template>
  `,
})
export class WebPriorAuthDmeSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  priorAuthDme: PriorAuthDme

  constructor(private store: WebPriorAuthDmeFeatureStore) {
    super()
    this.store.loadPriorAuthDmesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.priorAuthDmes$.pipe(
      switchMap((priorAuthDmes) => {
        return of(priorAuthDmes)
      }),
    )
  }
}

