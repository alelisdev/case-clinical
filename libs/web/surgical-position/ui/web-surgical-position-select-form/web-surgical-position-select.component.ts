

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebSurgicalPositionFeatureStore } from '@case-clinical/web/surgical-position/shared'
import {SurgicalPosition} from '@case-clinical/web/core/data-access'


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
      <ui-surgical-position-form
        class="flex-grow flex flex-col"
        [formName]="'surgicalPosition_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [surgicalPosition]="surgicalPosition"
      >
      >
      </ui-surgical-position-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-surgical-position-form
        class="flex-grow flex flex-col"
        [formName]="'surgicalPosition_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [surgicalPosition]="{}"
      >
      </ui-surgical-position-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-surgical-position-select-table-view
        class="w-full h-full bg-white"
        [surgicalPositions]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-surgical-position-select-table-view>
    </ng-template>
  `,
})
export class WebSurgicalPositionSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  surgicalPosition: SurgicalPosition

  constructor(private store: WebSurgicalPositionFeatureStore) {
    super()
    this.store.loadSurgicalPositionsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.surgicalPositions$.pipe(
      switchMap((surgicalPositions) => {
        return of(surgicalPositions)
      }),
    )
  }
}

