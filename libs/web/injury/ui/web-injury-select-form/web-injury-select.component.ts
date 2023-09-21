

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebInjuryFeatureStore } from '@case-clinical/web/injury/shared'
import {Injury} from '@case-clinical/web/core/data-access'


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
      <ui-injury-form
        class="flex-grow flex flex-col"
        [formName]="'injury_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [injury]="injury"
      >
      >
      </ui-injury-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-injury-form
        class="flex-grow flex flex-col"
        [formName]="'injury_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [injury]="{}"
      >
      </ui-injury-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-injury-select-table-view
        class="w-full h-full bg-white"
        [injuries]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-injury-select-table-view>
    </ng-template>
  `,
})
export class WebInjurySelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  injury: Injury

  constructor(private store: WebInjuryFeatureStore) {
    super()
    this.store.loadInjuriesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.injuries$.pipe(
      switchMap((injuries) => {
        return of(injuries)
      }),
    )
  }
}

