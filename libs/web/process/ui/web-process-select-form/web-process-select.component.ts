

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebProcessFeatureStore } from '@case-clinical/web/process/shared'
import {Process} from '@case-clinical/web/core/data-access'


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
      <ui-process-form
        class="flex-grow flex flex-col"
        [formName]="'process_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [process]="process"
      >
      >
      </ui-process-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-process-form
        class="flex-grow flex flex-col"
        [formName]="'process_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [process]="{}"
      >
      </ui-process-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-process-select-table-view
        class="w-full h-full bg-white"
        [processes]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-process-select-table-view>
    </ng-template>
  `,
})
export class WebProcessSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  process: Process

  constructor(private store: WebProcessFeatureStore) {
    super()
    this.store.loadProcessesEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.processes$.pipe(
      switchMap((processes) => {
        return of(processes)
      }),
    )
  }
}

