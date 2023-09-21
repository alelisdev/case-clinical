import { Component } from '@angular/core'
import { FieldType } from '@ngx-formly/core';
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [upModel]="model"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="editTemplate"
      [key]="field.key"
      (selectionChanged)="formState[$event.key]=$event.value"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      
        <ui-table-view-config-form class="flex-grow flex flex-col"
          (send)="context.onSave($event); context.ref.close()"
          (close)="context.ref.close()"
          [config]="context.value || {}">
        </ui-table-view-config-form>
      
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-table-view-config-table-view class="w-full h-full bg-white" [tableViewConfigs]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()">
      </ui-table-view-config-table-view>
    </ng-template>
  `,
})
export class TableViewConfigSelectComponent extends FieldType {
  formControl!: FormControl
}
