

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebAwardFeatureStore } from '@case-clinical/web/award/shared'
import {Award} from '@case-clinical/web/core/data-access'


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
      <ui-award-form
        class="flex-grow flex flex-col"
        [formName]="'award_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [award]="award"
      >
      >
      </ui-award-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-award-form
        class="flex-grow flex flex-col"
        [formName]="'award_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [award]="{}"
      >
      </ui-award-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-award-select-table-view
        class="w-full h-full bg-white"
        [awards]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-award-select-table-view>
    </ng-template>
  `,
})
export class WebAwardSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  award: Award

  constructor(private store: WebAwardFeatureStore) {
    super()
    this.store.loadAwardsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.awards$.pipe(
      switchMap((awards) => {
        return of(awards)
      }),
    )
  }
}

