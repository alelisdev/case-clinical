import { FieldType } from '@ngx-formly/core';
import { Component } from '@angular/core'
import { FormControl } from '@angular/forms';

@Component({
  template: `
    <ui-select-form
      [to]="to"
      [control]="formControl"
      [listTemplate]="listTemplate"
      [editTemplate]="editTemplate"
      [createTemplate]="editTemplate"
    ></ui-select-form>

    <ng-template #editTemplate let-context="data">
      <academy-category-edit-form class="flex-grow flex flex-col"
        (send)="context.onSave($event); context.ref.close()"
        (close)="context.ref.close()"
        [customer]="context.value || {}">
      </academy-category-edit-form>
    </ng-template>

    <ng-template #listTemplate let-context="data">
      <ui-academy-category-table-view class="w-full h-full bg-white" [customers]="context.items"
        (itemDidSelect)="context.itemDidSelect($event); context.ref.close()">
      </ui-academy-category-table-view>
    </ng-template>
  `,
})
export class AcademyCategorySelectComponent extends FieldType {
  formControl!: FormControl
}
