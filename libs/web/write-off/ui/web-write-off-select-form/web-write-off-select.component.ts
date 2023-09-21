

import { switchMap, of } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { FieldType } from '@ngx-formly/core'
import { FormControl } from '@angular/forms'
import { WebWriteOffFeatureStore } from '@case-clinical/web/write-off/shared'
import {WriteOff} from '@case-clinical/web/core/data-access'


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
      <ui-write-off-form
        class="flex-grow flex flex-col"
        [formName]="'writeOff_edit'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [writeOff]="writeOff"
      >
      >
      </ui-write-off-form>
    </ng-template>

    <ng-template #createTemplate let-context="data">
      <ui-write-off-form
        class="flex-grow flex flex-col"
        [formName]="'writeOff_create'"
        [formControl]="formControl"
        class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [writeOff]="{}"
      >
      </ui-write-off-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-write-off-select-table-view
        class="w-full h-full bg-white"
        [writeOffs]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()"
      >
      </ui-write-off-select-table-view>
    </ng-template>
  `,
})
export class WebWriteOffSelectComponent extends FieldType implements OnInit {
  formControl!: FormControl
  writeOff: WriteOff

  constructor(private store: WebWriteOffFeatureStore) {
    super()
    this.store.loadWriteOffsEffect()
  }

  ngOnInit(): void {
    this.to.source = this.getItems.bind(this)
    this.to.labelProp = 'name'
    this.to.valueProp = 'id'
  }

  getItems(term) {
    return this.store.writeOffs$.pipe(
      switchMap((writeOffs) => {
        return of(writeOffs)
      }),
    )
  }
}

